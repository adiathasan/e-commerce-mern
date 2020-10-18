import * as types from '../CONSTANTS';
import { instance } from '../axios';

const getSingleStore = (storeId) => async (dispatch) => {
	try {
		dispatch({ type: types.STORE_SINGLE_REQUEST });
		const { data } = await instance.get('/store/' + storeId);

		dispatch({
			type: types.STORE_SINGLE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.STORE_SINGLE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const createStoreAction = (store) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		};
		dispatch({ type: types.CREATE_STORE_REQUEST });

		const { data } = await instance.post('/stores', store, config);

		dispatch({
			type: types.CREATE_STORE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.CREATE_STORE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateStoreAction = (storeId, store) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		};
		dispatch({ type: types.UPDATE_STORE_REQUEST });

		const { data } = await instance.put('/store/' + storeId, store, config);

		dispatch({
			type: types.UPDATE_STORE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.UPDATE_STORE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getSingleStore, createStoreAction, updateStoreAction };
