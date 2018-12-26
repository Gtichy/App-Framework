import React from 'react';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

import './App.css';

import Layout from '../../Layouts/index';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';
import PasswordForgetPage from '../PasswordForgetPage/PasswordForgetPage';
import Homepage from '../Homepage/Homepage';
import AccountPage from '../AccountPage/AccountPage';
import AdminPage from '../AdminPage/AdminPage';

import * as ROUTES from '../../Constants/Routes';
import { withAuthentication } from '../Session/Index';
import { AuthUserContext } from '../Session/Index';

const Display = () => (
  <div>
  <AuthUserContext.Consumer>
    {authUser =>
        authUser ? <LoggedIn /> : <NotLoggedIn />
    }
  </AuthUserContext.Consumer>
  </div>
);

const LoggedIn = () => (
  <Router>
  <Layout>
  <div>
    <Route exact path={ROUTES.HOME} component={Homepage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    <Route path={ROUTES.ADMIN} component={AdminPage} />         
  </div>  
  </Layout>
</Router>
)

const NotLoggedIn = () => (
  <Router>
  <div>
    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
  </div>  
</Router>  
)

const App = () => (
    <Display />
  );

export default withAuthentication(App);