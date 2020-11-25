import * as types from '../CONSTANTS';

export const alanCommandsReducer = (
	state = {
		openCart: false,
		openHome: false,
		openCheckOut: false,
		openProfile: false,
	},
	action
) => {
	switch (action.type) {
		case types.OPEN_HOME:
			return {
				...state,
				openHome: true,
			};
		case types.OPEN_PROFILE:
			return {
				...state,
				openProfile: true,
			};
		case types.PROCEED_TO_CHECK_OUT:
			return {
				...state,
				openCheckOut: true,
			};
		case types.OPEN_CART:
			return {
				...state,
				openCart: true,
			};

		case types.RESET_COMMANDS:
			return {
				openCart: false,
				openHome: false,
				openCheckOut: false,
				openProfile: false,
			};

		default:
			return state;
	}
};
