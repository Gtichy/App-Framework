import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

import Header from '../../Layouts/Header';
import Navigation from '../Navigation/Navigation';
import LandingPage from '../LandingPage/LandingPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';
import PasswordForgetPage from '../PasswordForgetPage/PasswordForgetPage';
import Homepage from '../Homepage/Homepage';
import AccountPage from '../AccountPage/AccountPage';
import AdminPage from '../AdminPage/AdminPage';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){
    return (
      <Router>
      <div>
        <Header authUser={this.state.authUser} />
        <Navigation authUser={this.state.authUser} />    
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={Homepage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />         
      </div>
    </Router>
  
    )
  }
}

export default withFirebase(App);