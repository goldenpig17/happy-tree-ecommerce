const initialState = {
    isLoggedIn: !!sessionStorage.getItem('token'), // Check if token exists in session storage
    token: sessionStorage.getItem('token') || null, // Get token from session storage or set to null
    userDetails: {} // additional user details
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            sessionStorage.setItem('token', action.payload.token); // Store token in session storage
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userDetails: action.payload.userDetails
            };
        case 'USER_LOGOUT':
            sessionStorage.removeItem('token'); // Remove token from session storage
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userDetails: {}
            };
        // Handle other actions as needed
        default:
            return state;
    }
};

export default userReducer;
