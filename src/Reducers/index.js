import { combineReducers } from 'redux';

const initialUserState = {

}

const initialLeadState = {
	list: [{
		leadId: '1',
		leadName: 'sean',
		leadEmail: 'sean@smpl.io'
	}], // an array of lead objects
};

const types = {
	CREATE_LEAD: 'CREATE_LEAD',
	DELETE_LEAD: 'DELETE_LEAD',
	GET_LOGGED_IN_USER: 'GET_LOGGED_IN_USER',
	FETCH_LEADS: 'FETCH_LEADS'
};

const userReducer = (state = initialUserState, action) => {
    if(action.type === "GET_LOGGED_IN_USER"){
        return  action.payload
    }
    return state;
}

const leadsReducer = (state = initialLeadState, action) => {
	switch (action.type) {
		case types.CREATE_LEAD: {
			return {
				...state,
				list: [...state.list, action.payload],
			};
		}	
		case types.DELETE_LEAD: {
			return {
				...state,
				list: state.list.filter(lead => {
					return lead.leadId !== action.payload.leadId;
				}),
			};
		}
		
		case types.FETCH_LEADS: {
			return { 
				...state,
				list: [...state.list, action.payload],
			}
		}

		default:
			return state;
	}
}

const selectedLeadReducer = (selectedLead = null, action) => {
    if(action.type === "LEAD_SELECTED"){
        return action.payload;
    }
    return selectedLead;
}

export default combineReducers({
    leadData: leadsReducer,
	selectedLead: selectedLeadReducer,
	loggedInUser: userReducer
})