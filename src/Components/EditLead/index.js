import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editLead } from '../../Store/Leads/actions';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

class EditLead extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentLead: '',
            dialogOpen: false
        }
    }

    componentDidMount() {
        this.setState({currentLead: this.props.selectedLead});

    }

    handleOpenDialog = () => {
        this.setState({
            currentLead: this.props.selectedLead,
            dialogOpen: true
        });
        console.log(this.state);
    }
  
    handleSubmit = () => {
        const leadInfo = this.state.currentLead;
        console.log(leadInfo);
        this.props.editLead(this.props.selectedLead.leadId, leadInfo);
        this.setState({dialogOpen: false})

    }
  
    handleCloseDialog = () => {
        this.setState({dialogOpen: false})
    }

    handleChange = (field) => (e) => {
        const { currentLead } = this.state;
        const newLeads = currentLead;
        newLeads[field] = e.target.value;
    
    }

    render(){
        const { fullScreen } = this.props;
        const lead = this.props.selectedLead;
        return (
            <div>
            <IconButton onClick={this.handleOpenDialog} aria-label="Edit">
                <EditIcon fontSize="small" />
            </IconButton>
            <Dialog
            fullScreen={fullScreen}
            open={this.state.dialogOpen}
            onClose={this.handleCloseDialog}
            ria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">{"Edit Lead Info"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the fields and press save. 
                    </DialogContentText>
                    <TextField
                          id="lead-name"
                          placeholder="Lead Name"
                          defaultValue={lead.leadName}
                          onChange={this.handleChange('leadName')}
                          margin="normal"
                          /><br />
                    <TextField
                          id="lead-email"
                          placeholder="Lead Email"
                          defaultValue={lead.leadEmail}
                          onChange={this.handleChange('leadEmail')}
                          margin="normal"
                          /><br />
                    <TextField
                          id="lead-phone"
                          placeholder="Lead Phone"
                          defaultValue={lead.leadPhone}
                          onChange={this.handleChange('leadPhone')}
                          margin="normal"
                          /><br />
                    <TextField
                          id="lead-membership-level"
                          placeholder="Membership Level"
                          defaultValue={lead.leadMembershipLevel}
                          onChange={this.handleChange('leadMembershipLevel')}
                          margin="normal"
                          />
                </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" autoFocus>
                        Save
                    </Button>
            </DialogActions>
            </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { selectedLead: state.selectedLead }  
 }

export default connect(mapStateToProps, { editLead })(EditLead);