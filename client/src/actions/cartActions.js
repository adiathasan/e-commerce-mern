import * as types from "../VARIABLES";

const addToCartAction = (product, amount) => (dispatch, getState) => {
  dispatch({
    type: types.ADDED_TO_CART,
    payload: {
      cartProduct: product,
      amount,
    },
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(getState().cartTotalItem.cartProducts)
  );
};

const removeFromCartAction = (product) => (dispatch, getState) => {
  dispatch({
    type: types.REMOVED_FROM_CART,
    cartProduct: product,
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(getState().cartTotalItem.cartProducts)
  );
};

export { addToCartAction, removeFromCartAction };
