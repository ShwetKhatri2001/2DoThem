const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require("dotenv");
const passport = require('passport')
const path = require('path')

const users = require('./routes/users');
const lists = require('./routes/lists');
const dashboard = require('./routes/dashboard');

dotenv.config({ path: "config/config.env" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const URI = process.env.MONGO_URI

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB is Connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)


app.use('/api/users', users);
app.use('/api/lists', lists);
app.use('/api/dashboard', dashboard);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
})