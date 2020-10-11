import * as types from '../CONSTANTS';

const userLoginReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case types.USER_LOGIN_REQUEST:
			return {
				isLoading: true,
				user: null,
			};

		case types.USER_LOGIN_SUCCESS:
			return {
				isLoading: false,
				user: action.payload,
			};
		case types.USER_LOGIN_FAIL:
			return {
				isLoading: false,
				user: null,
				message: action.message,
			};
		case types.USER_LOGOUT:
			return {
				user: null,
			};

		default:
			return state;
	}
};

const userRegisterReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case types.USER_REGISTER_REQUEST:
			return {
				isLoading: true,
				user: null,
			};

		case types.USER_REGISTER_SUCCESS:
			return {
				isLoading: false,
				user: action.payload,
			};
		case types.USER_REGISTER_FAIL:
			return {
				isLoading: false,
				user: null,
				message: action.message,
			};
		default:
			return state;
	}
};

const userDetailsReducer = (state = { userProfile: null }, action) => {
	switch (action.type) {
		case types.USER_DETAILS_REQUEST:
			return {
				isLoading: true,
				userProfile: null,
			};

		case types.USER_DETAILS_SUCCESS:
			return {
				isLoading: false,
				userProfile: action.payload,
			};
		case types.USER_DETAILS_FAIL:
			return {
				isLoading: false,
				userProfile: null,
				message: action.message,
			};
		default:
			return state;
	}
};

const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case types.USER_UPDATE_REQUEST:
			return {
				isLoading: true,
			};

		case types.USER_UPDATE_SUCCESS:
			return {
				isLoading: false,
				userProfile: action.payload,
				success: true,
			};
		case types.USER_UPDATE_FAIL:
			return {
				isLoading: false,
				userProfile: null,
				message: action.message,
			};
		default:
			return state;
	}
};

export {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateReducer,
};
