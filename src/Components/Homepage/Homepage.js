import React from 'react';

import { withAuthorization } from '../Session';

const Homepage = () => (
  <div>
    <h1>Dashboard</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Homepage);