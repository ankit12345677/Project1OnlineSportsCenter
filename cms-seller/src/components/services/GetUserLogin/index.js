import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { setCookie, getCookie, eraseCookie } from "../../../function";
import { apiError } from "../../common";
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
    apiError(error);
  }
};

const getUserRegister = async (data) => {
  try {
    let result = await api.post(Apis.GetUserRegsiter, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllUserList = async () => {
  try {
    let result = await api.get(Apis.GetAllUserList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProfileforSeller = async () => {
  try {
    let result = await api.get(Apis.GetUserDetails);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUserUpdate = async (data) => {
  try {
    let result = await api.post(Apis.GetUserUpdate, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteUserList = async (id) => {
  try {
    let result = await api.post(Apis.GetDeleteUserList, {
      id: id,
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProfileUpdate = async (data) => {
  try {
    let result = await api.post(Apis.GetProfileUpdate, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const authenticate = (user, next) => {
  if (typeof window !== "undefined") {
    setCookie("token", user.token, 2);
    setCookie("role", user.role, 2);
    next();
  }
};
const logout = (next) => {
  if (typeof window !== "undefined") {
    eraseCookie("token");
    eraseCookie("role");
    eraseCookie("XSRF-token");
    window.location.reload();
    // window.location.href="/auth/login";
    // next();
  }
};

const isAuthenticate = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return getCookie("role");
};

export default {
  getUserLogin,
  getAllUserList,
  getUserUpdate,
  getDeleteUserList,
  authenticate,
  getProfileforSeller,
  getUserRegister,
  logout,
  getProfileUpdate,
  isAuthenticate,
};
