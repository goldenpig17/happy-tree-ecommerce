import { FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "../actions/actions";
// Initial state
const initialState = {
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
        default:
            return state;
    }
};

export default productsReducer;