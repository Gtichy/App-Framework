import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { withFirebase } from '../Firebase/Context';

const INITIAL_STATE = { 
  email: '',
  error: null,
  open: false,
};

const styles = {
  Input: {
    width: '100%',
  }
};

class PasswordForgetForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.setState({ open: false });

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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const { email, error } = this.state;
    const isInvalid = email === '';
    const { classes, fullScreen } = this.props;

    return (
      <div>
          <p><a href="#" onClick={this.handleClickOpen}>Forgot your password?</a></p>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Send Password Reset"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Enter your email and press submit.
            </DialogContentText>
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
              {error && <p>{error.message}</p>}
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={isInvalid} onClick={this.onSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withFirebase(withMobileDialog()(withStyles(styles)(PasswordForgetForm)));