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