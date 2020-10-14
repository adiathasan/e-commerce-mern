import * as types from '../CONSTANTS';

const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case types.PRODUCT_LIST_REQUEST:
			return {
				isLoading: true,
				products: [],
			};

		case types.PRODUCT_LIST_SUCCESS:
			return {
				isLoading: false,
				products: [...action.products],
			};
		case types.PRODUCT_LIST_FAIL:
			return {
				isLoading: false,
				products: [],
				message: action.message,
			};

		default:
			return state;
	}
};

const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case types.PRODUCT_SINGLE_REQUEST:
			return {
				isLoading: true,
				product: {},
			};

		case types.PRODUCT_SINGLE_SUCCESS:
			return {
				isLoading: false,
				product: action.product,
			};
		case types.PRODUCT_SINGLE_FAIL:
			return {
				isLoading: false,
				product: {},
				message: action.message,
			};

		default:
			return state;
	}
};

const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case types.PRODUCT_DELETE_REQUEST:
			return {
				isLoading: true,
			};

		case types.PRODUCT_DELETE_SUCCESS:
			return {
				isLoading: false,
				success: true,
			};
		case types.PRODUCT_DELETE_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};

		default:
			return state;
	}
};

const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case types.PRODUCT_CREATE_REQUEST:
			return {
				isLoading: true,
			};

		case types.PRODUCT_CREATE_SUCCESS:
			return {
				isLoading: false,
				success: true,
				product: action.payload,
			};
		case types.PRODUCT_CREATE_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.PRODUCT_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case types.PRODUCT_UPDATE_REQUEST:
			return {
				isLoading: true,
			};

		case types.PRODUCT_UPDATE_SUCCESS:
			return {
				isLoading: false,
				success: true,
				product: action.payload,
			};
		case types.PRODUCT_UPDATE_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.PRODUCT_UPDATE_RESET:
			return { product: {} };

		default:
			return state;
	}
};

const createProductReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case types.PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				isLoading: true,
			};

		case types.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				isLoading: false,
				success: true,
				message: action.payload,
			};
		case types.PRODUCT_CREATE_REVIEW_FAIL:
			return {
				isLoading: false,
				message: action.message,
			};
		case types.PRODUCT_CREATE_REVIEW_RESET:
			return {};

		default:
			return state;
	}
};

export {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	createProductReviewReducer,
};
