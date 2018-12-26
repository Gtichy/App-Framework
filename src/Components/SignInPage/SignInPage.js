import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { PasswordForgetLink } from '../PasswordForgetPage/PasswordForgetPage';
import { SignUpLink } from '../SignUpPage/SignUpPage';
import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const styles = {
  card: {
    maxWidth: 300,
    margin: '0 auto',
    padding: 15, 
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  Input: {
    width: '100%',
  }
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
    const { classes } = this.props;

    return (
      <div>
      <h1 className={classes.title}>Sign In</h1>
      <Card className={classes.card}>
      <CardContent>
      <form onSubmit={this.onSubmit}>
        <TextField
          className={classes.Input}
          name="email"
          value={email}
          onChange={this.onChange}
          label="Email Address"
          placeholder="Email Address"
          margin="normal"
          variant="outlined"
        /><br />
        <TextField  
          className={classes.Input}
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
      <SignUpLink />
      <PasswordForgetLink />

      </CardContent>
      </Card>
      </div>
      )
  }
}

const SignInLink = () => (
  <p>
    Already a customer? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignInForm = withRouter(withFirebase(withStyles(styles)(SignInFormBase)));

export default SignInPage;
export { SignInForm, SignInLink } 