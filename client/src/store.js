import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/productReducers';
import { cartTotalItemReducer } from './reducers/cartReducers';
import {
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
} from './reducers/userReducers';

const rootReducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailsReducer,
	cartTotalItem: cartTotalItemReducer,
	userInfo: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
});

const cartFromLocalStorage = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initState = {
	cartTotalItem: {
		cartProducts: cartFromLocalStorage,
	},
	userInfo: {
		user: userInfoFromLocalStorage,
	},
};

const store = createStore(
	rootReducer,
	initState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
