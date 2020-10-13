import * as types from '../CONSTANTS';
import { instance } from '../axios';

const createOrderAction = (order) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.ORDER_CREATE_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.post('/orders/', order, config);

		dispatch({
			type: types.ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.ORDER_CREATE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getOrderDetailsAction = (orderId) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.ORDER_DETAILS_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.get('/orders/' + orderId, config);

		dispatch({
			type: types.ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.ORDER_DETAILS_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const payOrderAction = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.ORDER_PAY_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.put(
			'/orders/' + orderId + '/pay',
			paymentResult,
			config
		);

		dispatch({
			type: types.ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.ORDER_PAY_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getMyOrderListAction = () => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.MY_ORDER_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.get('/orders/myorders', config);
		console.log(data);
		dispatch({
			type: types.MY_ORDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.MY_ORDER_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getOrdersAdminAction = () => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.ORDERS_ADMIN_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.get('/orders', config);

		dispatch({
			type: types.ORDERS_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.ORDERS_ADMIN_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	createOrderAction,
	getOrderDetailsAction,
	payOrderAction,
	getMyOrderListAction,
	getOrdersAdminAction,
};
