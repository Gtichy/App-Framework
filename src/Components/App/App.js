import React from 'react';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import LandingPage from '../LandingPage/LandingPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';
import PasswordForgetPage from '../PasswordForgetPage/PasswordForgetPage';
import Homepage from '../Homepage/Homepage';
import AccountPage from '../AccountPage/AccountPage';
import AdminPage from '../AdminPage/AdminPage';

import * as ROUTES from '../../Constants/Routes';

const App = () => (
  <Router>
    <div>
      <Navigation />    
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
  
);

export default App;