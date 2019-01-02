import { firebaseDb } from '../../Components/Firebase/Firebase.js'

export const fetchLeads = () => {
    return async (dispatch) => {
        const leads = [];
        firebaseDb.ref('/leads').once('value', snap => {
            snap.forEach(lead => {
                let item = lead.val();
                leads.push(item)
                subscribeToLeadUpdates(snap.key);
            })
        })
        dispatch({type: 'FETCH_LEADS', payload: leads})
    }
}

export const subscribeToLeadUpdates = (leadId) => {
    return async (dispatch) => {
      firebaseDb.ref(`/leads/${leadId}`).on('child_changed', snap => {

        dispatch({ type: 'LEAD_UPDATED', payload: {
            leadId: leadId,
            lead: snap.val()
        }})    
    })
}
}


export const selectLead = (lead) => {
    return {
        type: 'LEAD_SELECTED',
        payload: lead
    };
};

export const editLead = (leadId, updates) => {
    firebaseDb.ref(`/leads/${leadId}`).update({
        leadName: updates.leadName,
        leadEmail: updates.leadEmail,
        leadPhone: updates.leadPhone,
    })
    .catch(error => {
        this.errorMessage = 'Error - ' + error.message
    })

    return {
        type: 'EDIT_LEAD',
        payload: updates
    }
}

export const updateLeadStatus = (leadId, leadStatus) => {
        firebaseDb.ref(`/leads/${leadId}`).update({leadStatus: leadStatus})
            .catch(error => {
                this.errorMessage = 'Error - ' + error.message
            })

        return {
            type: 'UPDATE_LEAD_STATUS',
            payload: {
                leadId: leadId,
                leadStatus: leadStatus
            }
        }
}

export const createLead = (leadName, leadEmail) => {
    firebaseDb
        .ref(`/leads`)
        .push(
            {leadName: leadName, leadEmail: leadEmail, leadStatus: 'New'}
        ).catch(error => {
            this.errorMessage = 'Error - ' + error.message
        })
    return {
        type: 'CREATE_LEAD',
        payload: {
            leadName: leadName,
            leadEmail: leadEmail,
            leadStatus: 'New'
        }
    }
}

export const deleteLead = (leadId) => {

    firebaseDb.ref(`/leads/${leadId}`).remove()
    .catch(error => {
        this.errorMessage = 'Error - ' + error.message
    })
    return {
        type: 'DELETE_LEAD',
        payload: {
            leadId: leadId
        }
    }
}