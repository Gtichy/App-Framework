import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Forgot Password</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = { 
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const { email, error } = this.state;
    const isInvalid = email === '';

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
      <Button disabled={isInvalid} type="submit" variant="outlined" color="primary">
        Submit
      </Button>

      {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };