import * as types from '../CONSTANTS';

const addToCartAction = (product, amount) => (dispatch, getState) => {
	dispatch({
		type: types.ADDED_TO_CART,
		payload: {
			cartProduct: product,
			amount,
		},
	});

	localStorage.setItem(
		'cart',
		JSON.stringify(getState().cartTotalItem.cartProducts)
	);
};

const removeFromCartAction = (product) => (dispatch, getState) => {
	dispatch({
		type: types.REMOVED_FROM_CART,
		cartProduct: product,
	});

	localStorage.setItem(
		'cart',
		JSON.stringify(getState().cartTotalItem.cartProducts)
	);
};

const saveShippingAddressAction = (data) => (dispatch) => {
	dispatch({
		type: types.SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

const savePaymentMethodAction = (method) => (dispatch) => {
	dispatch({
		type: types.PAYMENT_METHOD,
		payload: method,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(method));
};

export {
	addToCartAction,
	removeFromCartAction,
	saveShippingAddressAction,
	savePaymentMethodAction,
};
