import * as types from '../CONSTANTS';
import { instance } from '../axios';

const getProductsAction = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		dispatch({ type: types.PRODUCT_LIST_REQUEST });
		const { data } = await instance.get(
			`/products?keyword=${keyword}&pageNumber=${pageNumber}`
		);
		dispatch({
			type: types.PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_LIST_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getProductsCarouselAction = () => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_CAROUSEL_REQUEST });
		const { data } = await instance.get(`/products/carousel`);
		dispatch({
			type: types.PRODUCT_CAROUSEL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_CAROUSEL_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getSingleProduct = (productId) => async (dispatch) => {
	try {
		dispatch({ type: types.PRODUCT_SINGLE_REQUEST });
		const { data } = await instance.get('/product/' + productId);
		dispatch({
			type: types.PRODUCT_SINGLE_SUCCESS,
			product: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_SINGLE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const deleteProductAction = (productId) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: types.PRODUCT_DELETE_REQUEST });
		const { data } = await instance.delete('/product/' + productId, config);
		dispatch({
			type: types.PRODUCT_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_DELETE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const createProductAction = () => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: types.PRODUCT_CREATE_REQUEST });
		const { data } = await instance.post('/products', {}, config);
		dispatch({
			type: types.PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_CREATE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateProductAction = (product) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: types.PRODUCT_UPDATE_REQUEST });
		const { data } = await instance.put(
			'/product/' + product._id,
			product,
			config
		);
		dispatch({
			type: types.PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_UPDATE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const createReviewProductAction = (review, productId) => async (
	dispatch,
	getState
) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: types.PRODUCT_CREATE_REVIEW_REQUEST });
		const { data } = await instance.post(
			'/product/' + productId + '/review',
			review,
			config
		);
		dispatch({
			type: types.PRODUCT_CREATE_REVIEW_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.PRODUCT_CREATE_REVIEW_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	getProductsAction,
	getSingleProduct,
	deleteProductAction,
	createProductAction,
	updateProductAction,
	createReviewProductAction,
	getProductsCarouselAction,
};
