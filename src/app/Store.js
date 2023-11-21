import { createStore, combineReducers, applyMiddleware } from 'redux';
import filterReducer from '../reducers/filterReducer';
import productsReducer from '../reducers/productReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    filter: filterReducer,
    products: productsReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
