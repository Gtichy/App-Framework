import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { PasswordForgetLink } from '../PasswordForgetPage/PasswordForgetPage';
import { SignUpLink } from '../SignUpPage/SignUpPage';
import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    console.log('we are signing in!');
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="email"
          value={email}
          onChange={this.onChange}
          label="Email Address"
          placeholder="Email Address"
          margin="normal"
          variant="outlined"
        /><br />
        <TextField  
          name="password"
          value={password}
          onChange={this.onChange}
          label="Password"
          placeholder="Password"
          margin="normal"
          variant="outlined"
          type="password"
          /><br />
        <Button disabled={isInvalid} type="submit" variant="outlined" color="primary">
          Submit
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      )
  }
}

const SignInLink = () => (
  <p>
    Already a customer? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm, SignInLink } 