import { FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "../actions/actions";
// Initial state
const initialState = {
    productDetails: null,
    products: [],
    isLoading: false,
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return { ...state, isLoading: true, error: null };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, products: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case 'FETCH_PRODUCT_DETAILS_REQUEST':
            return { ...state, isLoading: true };
        case 'FETCH_PRODUCT_DETAILS_SUCCESS':
            return { ...state, isLoading: false, productDetails: action.payload };
        case 'FETCH_PRODUCT_DETAILS_FAILURE':
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};

export default productsReducer;