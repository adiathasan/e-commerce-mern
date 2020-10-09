import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartTotalItemReducer } from "./reducers/cartReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cartTotalItem: cartTotalItemReducer,
});

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initState = {
  cartTotalItem: {
    cartProducts: cartFromLocalStorage,
  },
};

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
