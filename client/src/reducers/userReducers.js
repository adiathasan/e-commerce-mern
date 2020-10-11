import * as types from "../CONSTANTS";

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
        user: null
      };

    default:
      return state;
  }
};


export {userLoginReducer}