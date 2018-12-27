import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../../Layouts/index';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';
import Homepage from '../Homepage/Homepage';
import AccountPage from '../AccountPage/AccountPage';
import AdminPage from '../AdminPage/AdminPage';
import UsersPage from '../UsersPage/UsersPage';
  
import * as ROUTES from '../../Constants/Routes';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authUser: null
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
      <AuthUserContext.Provider value={this.state.authUser}>
      <Router>
      <Layout>
      <div>
        <Route path={ROUTES.HOME} component={Homepage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} /> 
        <Route path={ROUTES.USERS} component={UsersPage} />  
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />  
      </div>  
      </Layout>
    </Router>
    </AuthUserContext.Provider>
    )
  }
}

export default withFirebase(App);