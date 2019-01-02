import React from 'react';
import { connect } from 'react-redux';
import EditLead from '../EditLead';
import LeadStatus from '../LeadStatus';

const LeadDetail = ({selectedLead}) => {
    if(!selectedLead){
        return (
            <div>
                <p>Please select a lead</p>
            </div>
        )
    }else{
        return (
            <div>
                <EditLead />
                <h2>{selectedLead.leadName}</h2>
                <LeadStatus leadId={selectedLead.leadId} leadStatus={selectedLead.leadStatus} />
                <p><strong>Email: </strong>{selectedLead.leadEmail}</p>
                <p><strong>Phone: </strong>{selectedLead.leadPhone}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
   return { selectedLead: state.selectedLead }  
}

export default connect(mapStateToProps)(LeadDetail);