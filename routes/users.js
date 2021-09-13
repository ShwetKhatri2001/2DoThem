const express = require('express')
const router = express.Router()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')

router.post('/register', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then((user) => {
      if(user){
        
        return res.status(400).json({
          mesg: 'Email already exists!',
          type: 'danger'
        });
      } else {

        const newUser = new User({email, password});

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user=>{
                  return res.status(200).json({
                    user: user, 
                    mesg: 'Registration successful!',
                    type: 'success'
                  });
                })
                .catch(err => {
                  return res.status(400).json(err);
                });
          });
        });
      };
  })
  .catch(err => {
    return res.json({err})
  }); 
});


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password

  User.findOne({email})
  .then(user => {
    if(!user){
        return res.status(400).json({
          mesg: 'Email does not exists!',
          type: 'danger'
        })
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
        if(isMatch){
          const payload = { id: user.id, email: user.email }
          
          jwt.sign(payload, `${process.env.secretOrKey}`, {expiresIn: 3600}, (err, token) =>{
            return res.status(200).json({
              sucess: true,
              token: `Bearer ${token}`,
              type: 'success'
            })
          })
        } else {
          return res.status(400).json({
            mesg: 'Password is incorrect!',
            type: 'danger'
          })
        }
      })
    }
  })
  .catch(err => {
    return res.json({err})
  })
})

router.post('/getUser', (req, res)=>{
  const user = req.body.user
  axios.post(`http://localhost:${process.env.PORT}/`, {user})
    .then(res=>{
      return true
    })
    .catch(err=>{
      return true
    })
})


module.exports = router