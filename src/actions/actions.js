// action types
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_MAX_PRICE = 'SET_MAX_PRICE';
export const SET_MIN_PRICE = 'SET_MIN_PRICE';
export const SET_PRODUCT_TYPE = 'SET_PRODUCT_TYPE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const TOGGLE_PRODUCT_TYPE = 'TOGGLE_PRODUCT_TYPE';

export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// action creators

export const fetchProducts = (filters) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_START });

    try {
        const response = await fetch("http://localhost:8000/product");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Products:', data); // Log the fetched products
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.error('Fetch error:', error);
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const setProductName = (name) => ({
    type: SET_PRODUCT_NAME,
    payload: name,
});

export const setMaxPrice = (price) => ({
    type: SET_MAX_PRICE,
    payload: price,
});

export const setMinPrice = (price) => ({
    type: SET_MIN_PRICE,
    payload: price,
});

export const setProductType = (productType) => ({
    type: SET_PRODUCT_TYPE,
    payload: productType,
});

export const toggleProductType = (productType) => ({
    type: TOGGLE_PRODUCT_TYPE,
    payload: productType,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});