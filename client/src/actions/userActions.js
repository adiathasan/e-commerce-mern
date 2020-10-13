import * as types from '../CONSTANTS';
import { instance } from '../axios';

const userLoginAction = (email, password) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: types.USER_LOGIN_REQUEST,
			});

			const config = {
				'Content-Type': 'application/json',
			};

			const { data } = await instance.post(
				'/users/login',
				{ email, password },
				config
			);
			dispatch({
				type: types.USER_LOGIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: types.USER_LOGIN_FAIL,
				message:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

const userLogoutAction = () => (dispatch) => {
	dispatch({
		type: types.USER_LOGOUT,
	});
	localStorage.removeItem('userInfo');
};

const userRegisterAction = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: types.USER_REGISTER_REQUEST });
		const config = {
			'Content-Type': 'application/json',
		};
		const { data } = await instance.post(
			'/users',
			{ email, password, name },
			config
		);
		dispatch({
			type: types.USER_REGISTER_SUCCESS,
			payload: null,
		});

		dispatch({
			type: types.USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: types.USER_REGISTER_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getUserDetailsAction = (userId) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.USER_DETAILS_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'aplication/json',
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await instance.get('/users/' + userId, config);

		dispatch({
			type: types.USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.USER_DETAILS_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateUserDetailsAction = (user) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.USER_UPDATE_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.put('/users/profile', user, config);

		dispatch({
			type: types.USER_UPDATE_SUCCESS,
			payload: data,
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: types.USER_UPDATE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getUsersListAction = () => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.USERS_LIST_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.get('/users', config);

		dispatch({
			type: types.USERS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.USERS_LIST_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const deletetUserAction = (userId) => async (dispatch, getState) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.DELETE_USER_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.delete('/users/' + userId, config);

		dispatch({
			type: types.DELETE_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.DELETE_USER_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateUserDetailsFromAdminAction = (user, userId) => async (
	dispatch,
	getState
) => {
	const { token } = getState().userInfo.user;
	try {
		dispatch({
			type: types.USER_UPDATE_REQUEST,
		});
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await instance.put('/users/' + userId, user, config);

		dispatch({
			type: types.USER_UPDATE_SUCCESS,
			payload: data,
		});
		dispatch({
			type: types.USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.USER_UPDATE_FAIL,
			message:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	userLoginAction,
	userLogoutAction,
	userRegisterAction,
	getUserDetailsAction,
	updateUserDetailsAction,
	getUsersListAction,
	deletetUserAction,
	updateUserDetailsFromAdminAction,
};
