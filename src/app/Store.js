import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import filterReducer from '../reducers/filterReducer';
import productsReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import modalReducer from '../reducers/modalReducer';
import userReducer from '../reducers/userReducer';


// Hàm hỗ trợ để tính tổng giá ban đầu từ giỏ hàng
function calculateInitialTotal(cartItems) {
    // Kiểm tra nếu cartItems không tồn tại hoặc rỗng
    if (!cartItems || cartItems.length === 0) {
        return 0.00.toFixed(2);
    }
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

const preloadedState = {
    cart: {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        // Bạn có thể cần tính lại tổng giá ở đây nếu nó được lưu trữ
        total: calculateInitialTotal(JSON.parse(localStorage.getItem('cart'))),
    }
};

const rootReducer = combineReducers({
    filter: filterReducer,
    products: productsReducer,
    cart: cartReducer,
    modal: modalReducer,
    user: userReducer
});

const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
);

export default store;

