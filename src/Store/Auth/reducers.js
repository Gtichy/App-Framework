const initialUserState = {

}

export const userReducer = (state = initialUserState, action) => {
    if(action.type === "GET_LOGGED_IN_USER"){
        return  action.payload
    }
    return state;
}