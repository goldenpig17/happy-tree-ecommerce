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

export const fetchProducts = () => async (dispatch) => {
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

export const fetchProductDetails = (_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_PRODUCT_DETAILS_REQUEST' });

            const response = await fetch(`http://localhost:8000/product/${_id}`);

            if (!response.ok) {
                throw new Error('Không tìm thấy product details');
            }

            const productDetails = await response.json();
            dispatch({ type: 'FETCH_PRODUCT_DETAILS_SUCCESS', payload: productDetails });
        } catch (error) {
            dispatch({ type: 'FETCH_PRODUCT_DETAILS_FAILURE', error: error.message });
        }
    };
};

export const addItem = item => {
    return {
        type: 'ADD_ITEM',
        payload: item
    };
};

export const removeItem = _id => {
    return {
        type: 'REMOVE_ITEM',
        payload: _id
    };
};

export const updateQuantity = (_id, increment) => {
    return (dispatch, getState) => {
        const { cart } = getState();
        let updatedCart = cart.items.map(item => {
            if (item._id === _id) {
                const updatedQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });

        updatedCart = updatedCart.filter(item => item.quantity > 0);
        dispatch({
            type: 'UPDATE_CART',
            payload: updatedCart
        });

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
};
