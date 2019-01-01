import { firebaseDb } from '../../Components/Firebase/Firebase.js'

export const fetchLeads = () => {
    return async (dispatch) => {
        const leads = [];

        firebaseDb.ref('/leads').once('value', snap => {
            snap.forEach(lead => {
                let item = lead.val();
                leads.push(item)
            })
        }).catch(error => {
            this.errorMessage = 'Error - ' + error.message
          })
        dispatch({type: 'FETCH_LEADS', payload: leads})
    }
}

export const selectLead = (lead) => {
    return {
        type: 'LEAD_SELECTED',
        payload: lead
    };
};

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

export const createLead = (leadId, leadName, leadEmail) => {
    var newPostKey = firebaseDb.ref().child('/leads').push().key;
    firebaseDb
        .ref(`/leads/${newPostKey}`)
        .set(
            {leadId: newPostKey, leadName: leadName, leadEmail: leadEmail, leadStatus: 'New'}
        ).catch(error => {
            this.errorMessage = 'Error - ' + error.message
        })
    return {
        type: 'CREATE_LEAD',
        payload: {
            leadId: newPostKey,
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