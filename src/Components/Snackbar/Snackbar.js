import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

let openSnackbarFn;

class Notifier extends Component {
    constructor(props){
        super(props);

        this.state = {
            snackbarOpen: false,           
        }
    }

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    // Snackbar Controls Open
    handleOpenSnackbar = (message) => {
        this.setState({snackbarOpen: true, snackbarMessage: message});
    }
        
    // Snackbar Controls Close
    handleCloseSnackbar = () => {
        this.setState({snackbarOpen: false});
    }

    render(){
        return (
            <Snackbar 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
              }}
              action={[
                <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackbar}>CLOSE</Button>
              ]}
                autoHideDuration={4000}
                open={this.state.snackbarOpen} 
                onClose={this.handleCloseSnackbar} 
                message={this.state.snackbarMessage}
              />   
                 
        )
    }
}

export function handleOpenSnackbar({ message }) {
    openSnackbarFn({ message });
  }

export default Notifier;


