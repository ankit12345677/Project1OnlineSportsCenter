import api from "../../components/ApiConfig";
import { Apis } from "../../config";
import { NotificationManager } from "react-notifications";
import { setCookie, getCookie, eraseCookie } from "../../function";
import ApiError from "../../common/ApiError";

const getUserLogin = async (data) => {
  try {
    let result = await api.post(Apis.GetUserLogin, data, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};
const getUserRegister = async (data) => {
  try {
    let result = await api.post(Apis.GetUserRegister, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

const authenticateByEmail = (token) => {
  if (typeof window !== "undefined") {
    setCookie("token", token, 2);
    // if (token) {
    //   setTimeout(function () {
    //     window.location.reload();
    //   }, 100);
    // }
  }
};

const authenticate = async (token, removeQueryString) => {
  if (typeof window !== "undefined") {
    setCookie("token", token, 2);
    setTimeout(function () {
      if (removeQueryString) {
        window.location = window.location.pathname;
      } else {
        window.location.reload();
      }
    }, 400);
  }
};

const getAddNewAddress = async (data) => {
  try {
    let result = await api.post(Apis.GetAddNewAddress, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

const getDeleteProduct = async (data) => {
  try {
    let result = await api.post(Apis.GetDeleteProduct, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

const getCustomerDetail = async (token) => {
  try {
    let result = await api.get(Apis.GetCustomerDetails, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

const getCustomerUpdate = async (data) => {
  try {
    let result = await api.post(Apis.UpdateProfile, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

const authenticateByCart = async (token, email) => {
  if (typeof window !== "undefined") {
    setCookie("token", token, 2);
    setCookie("email", email, 2);
    setTimeout(function () {
      window.location.href = "/checkout";
    }, 1000);
  } else {
    NotificationManager.error("Please check your login", "Input Error");
  }
};

const logout = (next) => {
  if (typeof window !== "undefined") {
    eraseCookie("token");
    eraseCookie("email");
    // window.location.href = "/";
    // next();
  }
};

const isAuthenticate = () => {
  if (typeof window == "undefined") {
    return false;
  }
  return getCookie("token");
};
const getCustomerEmailVerify = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerEmailVerify, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};
const getForgetPassword = async (data) => {
  try {
    let result = await api.post(Apis.GetForgetPassword, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};
const getCustomerResetPassword = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerResetPassword, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};
const getCollection = async () => {
  try {
    let result = await api.get(Apis.GetCollection);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};
export default {
  getUserRegister,
  getUserLogin,
  authenticate,
  isAuthenticate,
  getForgetPassword,
  authenticateByEmail,
  getCustomerResetPassword,
  getCustomerEmailVerify,
  authenticateByCart,
  getAddNewAddress,
  getCustomerDetail,
  getDeleteProduct,
  getCustomerUpdate,
  getCollection,
  logout,
};
