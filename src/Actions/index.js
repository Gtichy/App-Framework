import Firebase from '../Components/Firebase';

export const fetchLeads = () => {
    console.log(Firebase);
    return async (dispatch) => {
        const response = await Firebase.db.ref('leads').once('value');
        
        console.log(dispatch({ type: "FETCH_LEADS", payload: response}));
    }
}

export const selectLead = (lead) => {
    return {
        type: 'LEAD_SELECTED',
        payload: lead
    };
};

export const getLoggedInUser = (isAuth, userId, userName, userEmail) => {
    return {
        type: 'GET_LOGGED_IN_USER',
        payload: {
            isAuth: isAuth,
            userId: userId,
            userName: userName,
            userEmail: userEmail
        }
    }
}

export const createLead = (leadId, leadName, leadEmail) => {
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