import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withFirebase } from '../Firebase/';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class UsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <h1>Users</h1>
        {loading && <div>Loading ...</div>}

        <Table className={classes.table}>
  <TableHead>
    <TableRow>
      <TableCell>Username</TableCell>
      <TableCell align="left">Email</TableCell>
      <TableCell align="left">User ID</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {users.map(user => {
    return (
      <TableRow key={user.uid}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.uid}</TableCell>
    </TableRow>

    )}
  )}
    </TableBody>
  </Table>

      </div>
    );
  }
}



export default withFirebase(withStyles(styles)(UsersPage));