import { createStore, combineReducers, applyMiddleware } from 'redux';
import filterReducer from '../reducers/filterReducer';
import productsReducer from '../reducers/productReducer';
import thunk from 'redux-thunk';
import cartReducer from '../reducers/cartReducer';

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
    cart: cartReducer
});

const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
);

export default store;

// Hàm hỗ trợ để tính tổng giá ban đầu từ giỏ hàng
function calculateInitialTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}