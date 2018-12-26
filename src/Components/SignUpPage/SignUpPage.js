import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';
import { SignInLink } from '../SignInPage/SignInPage';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const styles = {
  card: {
    maxWidth: 320,
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
        //create a user in the Real time DB
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
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

    const { classes } = this.props;

      return (
          <div> 
          <h1 className={classes.title}>Sign Up</h1>
          <Card className={classes.card}>
          <CardContent>    
          <form onSubmit={this.onSubmit}>
            <TextField
              name="username"
              className={classes.Input}
              value={username}
              onChange={this.onChange}
              label="Username"
              placeholder="Username"
              margin="normal"
              variant="outlined"
            /><br />
            <TextField
              name="email"
              className={classes.Input}              
              value={email}
              onChange={this.onChange}
              label="Email Address"
              placeholder="Email Address"
              margin="normal"
              variant="outlined"
            /><br />
            <TextField
              name="passwordOne"
              className={classes.Input}              
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
              className={classes.Input}
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
          <SignInLink />
          </CardContent>
          </Card>
          </div>
      );
    }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(withStyles(styles)(SignUpFormBase)));

export default SignUpPage;
export { SignUpForm, SignUpLink }