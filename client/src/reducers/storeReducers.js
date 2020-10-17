import * as types from '../CONSTANTS';

const storeDetailsReducer = (state = { store: {}, products: [] }, action) => {
	switch (action.type) {
		case types.STORE_SINGLE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.STORE_SINGLE_SUCCESS:
			return {
				isLoading: false,
				store: action.payload.store,
				products: action.payload.products,
			};
		case types.STORE_SINGLE_FAIL:
			return {
				isLoading: false,
				store: {},
				products: [],
				message: action.message,
			};

		default:
			return state;
	}
};

const createStoreReducer = (state = {}, action) => {
	switch (action.type) {
		case types.CREATE_STORE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case types.CREATE_STORE_SUCCESS:
			return {
				isLoading: false,
				success: true,
			};
		case types.CREATE_STORE_FAIL:
			return {
				isLoading: false,
			};

		default:
			return state;
	}
};

export { storeDetailsReducer, createStoreReducer };
