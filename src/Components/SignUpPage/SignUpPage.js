import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';
import { SignInLink } from '../SignInPage/SignInPage';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
    <SignInLink />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    console.log("submitted");
    const { username, email, passwordOne, passwordTwo } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
    
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

      return (
          <form onSubmit={this.onSubmit}>
            <TextField
              name="username"
              value={username}
              onChange={this.onChange}
              label="Username"
              placeholder="Username"
              margin="normal"
              variant="outlined"
            /><br />
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
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              label="Password"
              placeholder="Password"
              margin="normal"
              variant="outlined"
              type="password"
              /><br />
            <TextField
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              label="Confirm Password"
              placeholder="Confirm Password"
              margin="normal"
              variant="outlined"
              type="password"
            /><br />
            <Button disabled={isInvalid} type="submit" variant="outlined" color="primary">
              Submit
            </Button>

            {error && <p>{error.message}</p>}
          </form>
      );
    }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink }