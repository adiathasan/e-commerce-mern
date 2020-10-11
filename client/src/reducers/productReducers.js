import * as types from "../CONSTANTS";

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

export { productListReducer, productDetailsReducer };
