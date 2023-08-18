import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "./authActionTypes";
import api from "../../components/ApiConfig";
import { Apis } from "../../config";
import { getCookie } from "../../function";

const token = getCookie("token");
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUserDetail = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    await api
      .get(Apis.GetCustomerDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        const userdetail = response.data;
        dispatch(fetchUserSuccess(userdetail));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserFailure(errorMsg));
      });
  };
};
