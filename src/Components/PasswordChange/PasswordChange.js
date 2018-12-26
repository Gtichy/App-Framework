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
  passwordOne: '',
  passwordTwo: '',
  error: null,
  open: false,
};

const styles = {
  Input: {
    width: '100%',
  }
};

class PasswordChangeForm extends Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    const { classes, fullScreen } = this.props;

    return (
      <div>
          <p><a href="#" onClick={this.handleClickOpen}>Change password</a></p>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Change Your Password"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Enter your new password twice and press submit.
            </DialogContentText>
            <TextField
              className={classes.Input}
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              label="New Password"
              placeholder="New Password"
              margin="normal"
              variant="outlined"
              type="password"
              /><br />
            <TextField
              className={classes.Input}
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              label="Re-Enter New Password"
              placeholder="Re-enter New Password"
              margin="normal"
              variant="outlined"
              type="password"
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

export default withFirebase(withMobileDialog()(withStyles(styles)(PasswordChangeForm)));