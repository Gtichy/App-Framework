import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

import * as ROUTES from '../../Constants/Routes';

import { withFirebase } from '../Firebase/Context';

const SignOutButton = ({ firebase }) => (
  <Link style={{ textDecoration: 'none'}} to={ROUTES.LANDING} onClick={firebase.doSignOut}>
  Sign Out
  </Link>
);

export default withFirebase(SignOutButton);