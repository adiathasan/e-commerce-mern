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

		const { data } = await instance.post('/orders', order, config);

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
export { createOrderAction };
