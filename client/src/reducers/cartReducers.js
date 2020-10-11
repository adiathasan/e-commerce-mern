import * as types from "../CONSTANTS";

const cartTotalItemReducer = (
  state = {
    cartProducts: [],
  },
  action
) => {
  switch (action.type) {
    case types.ADDED_TO_CART:
      const itemsToCheck = state.cartProducts.find(
        (item) => item.cartProduct._id === action.payload.cartProduct._id
      );

      if (itemsToCheck) {
        const terminateExsitingOne = state.cartProducts.filter(
          (item) => item.cartProduct._id !== action.payload.cartProduct._id
        );
        return {
          cartProducts: [...terminateExsitingOne, action.payload],
        };
      }
      return {
        cartProducts: [...state.cartProducts, action.payload],
      };
    case types.REMOVED_FROM_CART:
      return {
        cartProducts: [
          ...state.cartProducts.filter(
            (item) => item.cartProduct._id !== action.cartProduct._id
          ),
        ],
      };

    default:
      return state;
  }
};

const getTotalCartItem = (cartProducts) => {
  return cartProducts?.reduce((totalItem, item) => item.amount + totalItem, 0);
};

const getTotalCartPrice = (cartProducts) => {
  return cartProducts?.reduce(
    (totalPrice, item) => (item.cartProduct.price + totalPrice) * item.amount,
    0
  );
};

export { getTotalCartItem, cartTotalItemReducer, getTotalCartPrice };
