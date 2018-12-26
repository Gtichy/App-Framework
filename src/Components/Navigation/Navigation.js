import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BarChart, ExitToApp, Face, AccountCircle } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase/Context';
import * as ROUTES from '../../Constants/Routes';
import { AuthUserContext } from '../Session/Index';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class Navigation extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
    };
  
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleSignOut = () => {
    this.props.firebase.doSignOut();  
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
      <List component="nav">
      <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText inset primary="Username" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Link style={{ textDecoration: 'none'}} to={ROUTES.ACCOUNT}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText inset primary="Account" />
                </ListItem>
                </Link>
                <Link style={{ textDecoration: 'none'}} to={ROUTES.SIGN_IN} onClick={this.handleSignOut}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText inset primary="Sign Out" />
                </ListItem>
                </Link>
              </List>
            </Collapse>
        <Link style={{ textDecoration: 'none'}} to={ROUTES.HOME}>
        <ListItem button>
          <ListItemIcon>
              <BarChart />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        </Link>
      </List>    
      </div>
    
    )
  }
}
const Nav = withFirebase(withStyles(styles)(Navigation));
export default Nav;