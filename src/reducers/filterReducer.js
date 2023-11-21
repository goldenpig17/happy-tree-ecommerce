import { SET_PRODUCT_NAME, SET_MAX_PRICE, SET_MIN_PRICE, SET_PRODUCT_TYPE, SET_CURRENT_PAGE, TOGGLE_PRODUCT_TYPE } from "../actions/actions";

const initialState = {
    productName: '',
    maxPrice: '',
    minPrice: '',
    productType: [],
    currentPage: 1,
};

function filterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_NAME:
            return { ...state, productName: action.payload };
        case SET_MAX_PRICE:
            return { ...state, maxPrice: action.payload };
        case SET_MIN_PRICE:
            return { ...state, minPrice: action.payload };
        case SET_PRODUCT_TYPE:
            return { ...state, productType: action.payload };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case TOGGLE_PRODUCT_TYPE:
            const { payload } = action;
            const newTypes = state.productType.includes(payload)
                ? state.productType.filter(type => type !== payload)
                : [...state.productType, payload];
            return { ...state, productType: newTypes };
        default:
            return state;
    }
}

export default filterReducer;
