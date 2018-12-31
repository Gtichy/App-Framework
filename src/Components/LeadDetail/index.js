import React from 'react';
import { connect } from 'react-redux';

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
                <h2>{selectedLead.leadName}</h2>
                <p><strong>Email: </strong>{selectedLead.leadEmail}</p>
                <p><strong>Phone: </strong>{selectedLead.leadPhone}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return { selectedLead: state.selectedLead }  
}

export default connect(mapStateToProps)(LeadDetail);