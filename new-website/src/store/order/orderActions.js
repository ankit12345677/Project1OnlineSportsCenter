import { toast } from "react-toastify";
import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
} from "./orderActionTypes";
import api from "../../components/ApiConfig";
import { Apis } from "../../config";
import { getCookie } from "../../function";
import { NotificationManager } from "react-notifications";

const token = getCookie("token");
export const fetchOrderRequest = (newCart) => {
  if (newCart.addressId === null) {
    NotificationManager.error("Please! select address from the list");
    return {
      type: FETCH_ORDER_REQUEST,
      payload: false,
    };
  } else {
    return {
      type: FETCH_ORDER_REQUEST,
      payload: true,
    };
  }
};

const fetchOrderSuccess = (order) => {
  if (order.code === 200) {
    order.message
      ? toast.success(`"${order.message}"`, { theme: "colored" })
      : null;
    return {
      type: FETCH_ORDER_SUCCESS,
      payload: order,
    };
  }
};

const fetchOrderFailure = (error) => {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error,
  };
};

export const CreateOrderDetail = (newCart) => {
  return async (dispatch) => {
    let checkItem = dispatch(fetchOrderRequest(newCart));
    if (checkItem.payload) {
      await api
        .post(Apis.CreateOrderList, newCart, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          const userdetail = response.data;
          setTimeout(() => {
            dispatch(fetchOrderSuccess(userdetail));
            window.location.href = "/shop/checkout/success";
          }, 200);
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchOrderFailure(errorMsg));
        });
    }
  };
};
export const GetOrderHistory = () => {
  return async (dispatch) => {
    await api
      .get(Apis.GetOrderList, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        const userdetail = response.data;
        dispatch(fetchOrderSuccess(userdetail));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchOrderFailure(errorMsg));
      });
  };
};
