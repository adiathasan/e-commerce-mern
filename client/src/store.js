import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/productReducers';
import {
	cartTotalItemReducer,
	shippingProccessReducer,
} from './reducers/cartReducers';
import {
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
} from './reducers/userReducers';
import { orderReducers } from './reducers/orderReducers';

const rootReducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailsReducer,
	cartTotalItem: cartTotalItemReducer,
	userInfo: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	shippingProccess: shippingProccessReducer,
	orderCreate: orderReducers,
});

const cartFromLocalStorage = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: null;

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: null;

const initState = {
	cartTotalItem: {
		cartProducts: cartFromLocalStorage,
	},
	userInfo: {
		user: userInfoFromLocalStorage,
	},
	shippingProccess: {
		shippingAddress: shippingAddressFromLocalStorage,
		paymentMethod: paymentMethodFromLocalStorage,
	},
};

const store = createStore(
	rootReducer,
	initState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
