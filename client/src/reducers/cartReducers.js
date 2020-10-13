import * as types from '../CONSTANTS';

const cartTotalItemReducer = (
	state = {
		cartProducts: [],
	},
	action
) => {
	switch (action.type) {
		case types.ADDED_TO_CART:
			const itemsToCheck = state.cartProducts.find(
				(item) => item.cartProduct._id === action.payload.cartProduct._id
			);

			if (itemsToCheck) {
				const terminateExsitingOne = state.cartProducts.filter(
					(item) => item.cartProduct._id !== action.payload.cartProduct._id
				);
				return {
					cartProducts: [...terminateExsitingOne, action.payload],
				};
			}
			return {
				cartProducts: [...state.cartProducts, action.payload],
			};
		case types.REMOVED_FROM_CART:
			return {
				cartProducts: [
					...state.cartProducts.filter(
						(item) => item.cartProduct._id !== action.cartProduct._id
					),
				],
			};
		case types.CLEAR_CART:
			localStorage.removeItem('cart');
			return {
				cartProducts: [],
			};
		default:
			return state;
	}
};

const shippingProccessReducer = (
	state = { shippingAddress: null, paymentMethod: null },
	action
) => {
	switch (action.type) {
		case types.SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case types.PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};

const getTotalCartItem = (cartProducts) => {
	return cartProducts?.reduce((totalItem, item) => item.amount + totalItem, 0);
};

const getTotalCartPrice = (cartProducts) => {
	return cartProducts?.reduce(
		(totalPrice, item) => (item.cartProduct.price + totalPrice) * item.amount,
		0
	);
};

export {
	getTotalCartItem,
	cartTotalItemReducer,
	getTotalCartPrice,
	shippingProccessReducer,
};
