import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = { 
  email: '',
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
  emailInput: {
    width: '100%',
  }
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
    const { classes } = this.props;

    return (
      <div>
      <h2 className={classes.title}>Forgot Password</h2>
      <Card className={classes.card}>
      <CardContent>
      <p>Enter your email and press submit.</p>
      <form onSubmit={this.onSubmit}>
      <TextField
              className={classes.emailInput}
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
      </CardContent>
      </Card>
      </div>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(withStyles(styles)(PasswordForgetFormBase));

export { PasswordForgetForm, PasswordForgetLink };