import { toast } from "react-toastify";
import { history } from "../../helpers/history";
import {
  CART_ADD_ITEM,
  CART_BUY_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_QUANTITIES,
} from "./cartActionTypes";

export function cartAddItemSuccess(product, options = [], quantity = 1) {
  toast.success(`Product "${product.Name}" added to cart!`, {
    theme: "colored",
  });

  return {
    type: CART_ADD_ITEM,
    product,
    options,
    quantity,
  };
}

export function cartBuyItemSuccess(product, options = [], quantity = 1) {
  return {
    type: CART_BUY_ITEM,
    product,
    options,
    quantity,
  };
}

export function cartRemoveItemSuccess(itemId) {
  return {
    type: CART_REMOVE_ITEM,
    itemId,
  };
}

export function cartUpdateQuantitiesSuccess(quantities) {
  return {
    type: CART_UPDATE_QUANTITIES,
    quantities,
  };
}

export function cartAddItem(product, options = [], quantity = 1) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartAddItemSuccess(product, options, quantity));
        resolve();
      }, 500);
    });
}

export function cartBuyItem(product, options = [], quantity = 1) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartBuyItemSuccess(product, options, quantity));
        resolve(history.push("/shop/cart"));
      }, 500);
    });
}
export function cartRemoveItem(itemId) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartRemoveItemSuccess(itemId));
        resolve();
      }, 500);
    });
}

export function cartUpdateQuantities(quantities) {
  // sending request to server, timeout is used as a stub
  return (dispatch) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(cartUpdateQuantitiesSuccess(quantities));
        resolve();
      }, 500);
    });
}
