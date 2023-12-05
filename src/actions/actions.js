// action types
//filter Product actions
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_MAX_PRICE = 'SET_MAX_PRICE';
export const SET_MIN_PRICE = 'SET_MIN_PRICE';
export const SET_PRODUCT_TYPE = 'SET_PRODUCT_TYPE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOGGLE_PRODUCT_TYPE = 'TOGGLE_PRODUCT_TYPE';
//fetch Product actions
export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
//show modal
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';


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

//ProductDetails API
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

//orderDetail & order Actions
export const confirmOrder = (orderInfo) => {
    return async dispatch => {
        try {
            // First, create orderDetail
            const orderDetailResponse = await fetch('http://localhost:8000/orderDetail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderInfo),
            });
            const orderDetailData = await orderDetailResponse.json();
            const orderDetailId = orderDetailData.result._id; // Assuming the response contains the ID

            // Then, create order
            const orderResponse = await fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderInfo._id,
                    orderDate: orderInfo.orderDate,
                    orderDetails: [orderDetailId],
                    cost: orderInfo.total
                }),
            });
            const orderData = await orderResponse.json();
            const orderId = orderData.orderId; // Assuming the response contains the ID of the created order
            // Return the order ID for further use
            return {
                orderId: orderId,  // Giả sử _id là ID của order
                orderDate: orderData.order.orderDate // Giả sử orderDate là ngày của order
            };
        } catch (error) {
            console.error('Error during order processing:', error);
            return null;
        }
    };
};

//modal Actions
export const showModal = () => ({
    type: SHOW_MODAL,
});

export const hideModal = () => ({
    type: HIDE_MODAL,
});

//LogIn Actions
export const loginUser = (userData) => {
    return {
        type: 'USER_LOGIN',
        payload: userData
    };
};

//createCustomer Action
export const createCustomer = (customerData, orderId) => async (dispatch) => {
    try {
        let data;
        // Nếu có orderId được truyền vào, gửi yêu cầu API riêng để cập nhật đơn hàng với customerId
        if (orderId) {
            const updateOrderResponse = await fetch(`http://localhost:8000/order/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId: data.customerId }),
            });
            const updateOrderData = await updateOrderResponse.json();

            if (!updateOrderResponse.ok) {
                throw new Error(updateOrderData.message || "Có lỗi khi cập nhật đơn hàng!");
            }

            console.log("Order updated with customerId:", updateOrderData);
        } else {
            // Nếu không có orderId, gửi yêu cầu API để tạo khách hàng mới
            const response = await fetch('http://localhost:8000/customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Có lỗi khi tạo khách hàng mới!");
            }
            console.log("Customer created/updated:", data);

            // Return the response data for further processing in the component
            return data;
        }
    } catch (error) {
        console.error("Lỗi khi tạo khách hàng:", error);
        throw error;
    }
};

//cart actions
export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    };
};
