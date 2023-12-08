const initialState = {
    isLoggedIn: !!sessionStorage.getItem('token'), // Kiểm tra xem có token trong storage không
    token: sessionStorage.getItem('token') || null, //Lấy token từ sessionStorage 
    userDetails: {} 
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            sessionStorage.setItem('token', action.payload.token); // Lưu token vào sessionStorage
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                userDetails: action.payload.userDetails
            };
        case 'USER_LOGOUT':
            sessionStorage.removeItem('token'); // Xóa token khỏi sessionStorage
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userDetails: {}
            };
        default:
            return state;
    }
};

export default userReducer;
