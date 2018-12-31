import { combineReducers } from 'redux';

import { 
    userReducer
} from '../Store/Auth/reducers';

import {
    leadsReducer,
    selectedLeadReducer
} from '../Store/Leads/reducers';


export default combineReducers({
    loggedInUser: userReducer,
    leadData: leadsReducer,
	selectedLead: selectedLeadReducer,
})