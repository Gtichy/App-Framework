import { firebaseDb } from '../../Components/Firebase/Firebase.js'

export const fetchLeads = () => {
    return async (dispatch) => {
        const leads = [];

        firebaseDb.ref('/leads').once('value', snap => {
            snap.forEach(lead => {
                let item = lead.val();
                leads.push(item)
            })
        });

        dispatch({type: 'FETCH_LEADS', payload: leads})
    }
}

export const selectLead = (lead) => {
    return {
        type: 'LEAD_SELECTED',
        payload: lead
    };
};

export const createLead = (leadId, leadName, leadEmail) => {

    var newPostKey = firebaseDb.ref().child('/leads').push().key;
    firebaseDb.ref(`/leads/${newPostKey}`).set({leadId: leadId, leadName: leadName, leadEmail: leadEmail});
  
    return {
        type: 'CREATE_LEAD',
        payload: {
            leadId: leadId,
            leadName: leadName,
            leadEmail: leadEmail
        }
    }
}

export const deleteLead = (leadId) => {
    return {
        type: 'DELETE_LEAD',
        payload: {
            leadId: leadId
        }
    }
}