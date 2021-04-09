import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import data from "./data";
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})
const composeEchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, initialState,
    composeEchancer(applyMiddleware(ReduxThunk))
    );

export default store;