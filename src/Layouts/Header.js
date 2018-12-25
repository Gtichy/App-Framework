import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'react-router-dom';
import SignOutButton from '../Components/SignOut/SignOut';
import * as ROUTES from '../Constants/Routes';
import { AuthUserContext } from '../Components/Session';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
  
  const ProfileMenu = () => (
    <div>
    <AuthUserContext.Consumer>
          {authUser => authUser ? <MenuAuth /> : <MenuNonAuth />}
    </AuthUserContext.Consumer>
    </div>
  );
    
  const MenuAuth = () => (
    <div>
      <IconButton
        aria-owns={open ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={this.handleClose}
      >
        <Link style={{ textDecoration: 'none'}} to={ROUTES.ACCOUNT}>
          <MenuItem onClick={this.handleClose}>Account</MenuItem>
        </Link>
        <MenuItem onClick={this.handleClose}>
          <SignOutButton />
        </MenuItem>
      </Menu>
  </div>
  );

  const MenuNonAuth = () => (
    <p>hello</p>
  );

    return (
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Garrett's Project
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);