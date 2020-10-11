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

export { userLoginAction, userLogoutAction };
