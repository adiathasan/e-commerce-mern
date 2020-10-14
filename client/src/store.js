import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productUpdateReducer,
	productCreateReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	createProductReviewReducer,
} from './reducers/productReducers';
import {
	cartTotalItemReducer,
	shippingProccessReducer,
} from './reducers/cartReducers';
import {
	deleteUserReducer,
	getUsersListReducer,
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
	userUpdateFromAdminReducer,
} from './reducers/userReducers';
import {
	orderReducers,
	orderDetailsReducer,
	orderPayReducer,
	getMyOrderListReducer,
	getOrdersAdminReducer,
	orderDeliverReducer,
} from './reducers/orderReducers';

const rootReducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	createProductReview: createProductReviewReducer,
	cartTotalItem: cartTotalItemReducer,
	userInfo: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	userUpdateFromAdmin: userUpdateFromAdminReducer,
	deleteUser: deleteUserReducer,
	getUsersList: getUsersListReducer,
	shippingProccess: shippingProccessReducer,
	orderCreate: orderReducers,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	getMyOrders: getMyOrderListReducer,
	getOrdersAdmin: getOrdersAdminReducer,
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
