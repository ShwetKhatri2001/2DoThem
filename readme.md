# 2DoThem

> Todo Apps are very common programming exercises. I am building this app and want to make it something different. It is a list of todo-list. It allows you to create multiple todo-list with the same functionality. This app is a MERN Stack App. 

[Live link](https://todothem.herokuapp.com/). 

Deployed at [Heroku](https://heroku.com).

### Features 🚀
*  Handles Multiple Todos based on event or topic with an interactive ui-ux.
*  Long Time saving of Todos in `Google Cloud` using `MongoDB` as database.
*  Handles different backend and frontend dynamic routes in `React` and `NodeJS`.
*  `Redux` for user's state management inside the application.
*  User validations and User session token with `jwt-tokens` and `passport-js`.


> Libraries and resources:
  * [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
  * [Mongo DB](https://www.mongodb.com/)
  * [React-Redux](https://redux.js.org/basics/usage-with-react)
  * [JWT Web Tokens](https://jwt.io/).

## Installation

First these commands and follow mentioned steps to get your app ready with installation.

```bash
$ git clone https://github.com/ShwetKhatri2001/2DoThem.git
```

```bash
$ npm install 
```

```bash
cd client
$ npm install 
```

After installations, make a file `config.env` in `config` directory and add some env variables there . 
* First add `PORT` you want other then 3000 to handle api requests. 
* Second add `MONGO_URI` which is the mongodb database link.
Visit [Mongo DB](https://www.mongodb.com/) and sign up for the free API Key. Then go back to your [Mongo DB](https://www.mongodb.com/) account and must create a database cluster as your server for this application. Here is a [guide](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/) on how to create
* Third `secretOrKey` which could be any unique long string as jwt sectret key.
* Fourth one is `NODE_ENV` which could be 'development' or 'production' based on your app status.

To run you app use this command.

```bash
$ npm run dev
```

## Contributing

If you find bugs with this project, pull requests are always welcome. You can [create an issue here](https://github.com/ShwetKhatri2001/2DoThem/issues/new).
Your :star: is also greatly appreciated.

[Checkout my GitHub profile and view other projects](https://github.com/ShwetKhatri2001)






