import * as types from '../CONSTANTS';

const orderReducers = (
	state = {
		isLoading: true,
		order: {
			shippingAddress: {
				address: '',
				city: '',
				country: '',
				postalCode: '',
			},
			shippingPrice: '',
			totalPrice: '',
			_id: '',
			orderedItems: [],
			user: '',
			vat: '',
			paymentMethod: '',
		},
		message: '',
	},
	action
) => {
	switch (action.type) {
		case types.ORDER_CREATE_REQUEST:
			return {
				...state,
			};
		case types.ORDER_CREATE_SUCCESS:
			return {
				isLoading: false,
				order: action.payload,
				success: true,
			};
		case types.ORDER_CREATE_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		default:
			return state;
	}
};

const orderDetailsReducer = (
	state = { order: { shippingAddress: null }, isLoading: true },
	action
) => {
	switch (action.type) {
		case types.ORDER_DETAILS_REQUEST:
			return {
				isLoading: true,
			};
		case types.ORDER_DETAILS_SUCCESS:
			return {
				isLoading: false,
				order: action.payload,
			};
		case types.ORDER_DETAILS_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.ORDER_DETAILS_RESET:
			return { order: { shippingAddress: null }, isLoading: true };
		default:
			return state;
	}
};

const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case types.ORDER_PAY_REQUEST:
			return {
				isLoading: true,
			};
		case types.ORDER_PAY_SUCCESS:
			return {
				isLoading: false,
				success: true,
			};
		case types.ORDER_PAY_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

const getMyOrderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case types.MY_ORDER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case types.MY_ORDER_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case types.MY_ORDER_FAIL:
			return {
				loading: false,
				errMessage: action.message,
			};
		case types.MY_ORDER_RESET:
			return { orders: [] };
		default:
			return state;
	}
};

const getOrdersAdminReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case types.ORDERS_ADMIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.ORDERS_ADMIN_SUCCESS:
			return {
				isLoading: false,
				orders: action.payload,
			};
		case types.ORDERS_ADMIN_FAIL:
			return {
				isLoading: false,
				errMessage: action.message,
			};
		case types.ORDERS_ADMIN_RESET:
			return {
				orders: [],
			};
		default:
			return state;
	}
};

const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case types.ORDER_DELIVER_REQUEST:
			return {
				isLoading: true,
			};
		case types.ORDER_DELIVER_SUCCESS:
			return {
				isLoading: false,
				success: true,
			};
		case types.ORDER_DELIVER_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};

export {
	orderReducers,
	orderDetailsReducer,
	orderPayReducer,
	getMyOrderListReducer,
	getOrdersAdminReducer,
	orderDeliverReducer,
};
