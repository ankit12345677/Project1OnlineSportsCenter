import api from "../../components/ApiConfig";
import { Apis } from "../../config";
import { NotificationManager } from "react-notifications";
import ApiError from "../../common/ApiError";
import { getCookie } from "../../function";

const getCustomerOrderedProduct = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerOrderedProduct, data, {
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
const getCustomerProductDetail = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerProductDetail, data, {
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
const getCancelOrder = async (data) => {
  try {
    let result = await api.post(Apis.GetCancelOrderByProduct, data, {
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
    apiError(error);
  }
};
export default {
  getCustomerOrderedProduct,
  getCustomerProductDetail,
  getCancelOrder,
  getDeleteProduct,
};
