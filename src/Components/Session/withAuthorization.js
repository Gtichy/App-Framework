import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './Context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/Routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          console.log('Let us check');
          if (!condition(authUser)) {
            console.log('Nope');
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(withRouter(WithAuthorization));
};

export default withAuthorization;