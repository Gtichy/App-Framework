import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLeadStatus } from '../../Store/Leads/actions';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class LeadStatus extends Component {
    
    handleStatusChange = (id) => (e) => {
        this.props.updateLeadStatus(id, e.target.value); 
    }

    render(){    
        return (
            <FormControl>
                <Select
                    value={this.props.leadStatus}
                    onChange={this.handleStatusChange(this.props.leadId)}
                    name="leadStatus"
                >
                <MenuItem value='New'><em>New</em></MenuItem>
                <MenuItem value='Interested'>Interested</MenuItem>
                <MenuItem value='Toured'>Toured</MenuItem>
                <MenuItem value='Lost'>Lost</MenuItem>
                </Select>
            </FormControl>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        leads: state.leadData.list
    }
}

export default connect(mapStateToProps, { updateLeadStatus })(LeadStatus);