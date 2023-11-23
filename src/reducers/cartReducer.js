const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            const updatedItems = action.payload;
            const updatedTotal = updatedItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ).toFixed(2);
            return {
                ...state,
                items: updatedItems,
                total: updatedTotal
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
};

export default cartReducer;

