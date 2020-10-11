import * as types from "../CONSTANTS";
import { instance } from "../axios";

const getProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_LIST_REQUEST });
    const { data } = await instance.get("/products");
    dispatch({
      type: types.PRODUCT_LIST_SUCCESS,
      products: data,
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

const getSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_SINGLE_REQUEST });
    const { data } = await instance.get("/product/" + productId);
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

export { getProductsAction, getSingleProduct };
