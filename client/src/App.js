import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {logoutUser, setCurrentUser, fetchDashboard} from './store/actions/index'
import store from './store'
import Backdrop from './components/Backdrop/Backdrop'
import Fragment from  './utils/Fragment'
import Navbar from './containers/Navbar/Navbar'
import Dashboard from './containers/Dashboard/Dashboard'
import Login from './components/Auth/Login/Login'
import Signup from './components/Auth/Signin/Signin'
import Landing from './components/Landing/Landing'
import './App.css';
import * as action from './store/actions/index'

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))
  store.dispatch(fetchDashboard())

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}


class App extends Component {

  componentDidMount(){
    this.props.user()
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path='/signin' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
    <BrowserRouter>
      <div className="App">
        <Backdrop />
        <Fragment className="Content">
        <Navbar />
          <div className="container">
            {routes}
          </div>
        </Fragment>
      </div>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    user: () => { dispatch(action.getUser()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
