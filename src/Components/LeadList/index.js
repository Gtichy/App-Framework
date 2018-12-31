import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { selectLead, fetchLeads } from '../../Store/Leads/actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { Pageview } from '@material-ui/icons';

import CreateNewLead from '../CreateNewLead';
import DeleteLead from '../DeleteLead';

class LeadList extends Component { 
    sortList = (property) => {
        var sortOrder = 1;

        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a,b) {
            if(sortOrder === -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }       
        }
    }

    componentDidMount() {
        this.props.fetchLeads();
    }

    render() {
        const sortedList = this.props.leads.sort(this.sortList('leadName'));
        if(sortedList.length < 1){
            return (
                <div>
                    <p>please create a lead</p>
                    <CreateNewLead />
                </div>
            )
        }else{
            return (
                <div>
                <CreateNewLead />
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Membership Level</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortedList.map(lead => {
                        return (
                            <TableRow key={lead.leadId}>
                                <TableCell>{lead.leadName}</TableCell>
                                <TableCell>{lead.leadEmail}</TableCell>
                                <TableCell>{lead.leadPhone}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                <Route render={({ history }) => (
                                    <IconButton 
                                    onClick={()=>{
                                        this.props.selectLead(lead);
                                        history.push('/lead');
    
                                        }} 
                                    color="primary"
                                    >
                                        <Pageview />
                                    </IconButton>
                                )} />
                                <DeleteLead leadId={lead.leadId} />
                                </TableCell>
                            </TableRow>   
                        )
                        })
                        }     
                </TableBody>
            </Table>
           </div>
            )
    
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        leads: state.leadData.list
    }
}

export default connect(mapStateToProps, { selectLead, fetchLeads })(LeadList);