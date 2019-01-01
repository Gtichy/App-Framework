const initialState = {
	list: [] // an array of lead objects
};

const types = {
	CREATE_LEAD: 'CREATE_LEAD',
	DELETE_LEAD: 'DELETE_LEAD',
	FETCH_LEADS: 'FETCH_LEADS',
	UPDATE_LEAD_STATUS: 'UPDATE_LEAD_STATUS'
};

export const leadsReducer = (state = initialState, action) => {
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
				list: action.payload,
			}
		}
		case types.UPDATE_LEAD_STATUS: {
			return {
				...state,
				list: state.list.map(list => 
					list.leadId === action.payload.leadId ? { ...list, leadStatus: action.payload.leadStatus } : list
				) 
			};		
		}

		default:
			return state;
	}
}

export const selectedLeadReducer = (selectedLead = null, action) => {
    if(action.type === "LEAD_SELECTED"){
        return action.payload;
    }
    return selectedLead;
}