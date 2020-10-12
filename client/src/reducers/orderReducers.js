import * as types from '../CONSTANTS';

const orderReducers = (state = { isLoading: false, order: null }, action) => {
	switch (action.type) {
		case types.ORDER_CREATE_REQUEST:
			return {
				isLoading: true,
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

export { orderReducers };
