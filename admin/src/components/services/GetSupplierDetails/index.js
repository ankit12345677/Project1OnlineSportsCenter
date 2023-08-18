import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";
const createSupplierList = async (data) => {
  try {
    let result = await api.post(Apis.CreateSupplierList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const createSupplierProductList = async (data) => {
  try {
    let result = await api.post(Apis.CreateSupplierProduct, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllSellerList = async () => {
  try {
    let result = await api.get(Apis.GetAllSellerList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUpdateSellerList = async (data) => {
  try {
    let result = await api.post(Apis.GetUpdateSellerList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getVendorProductList = async () => {
  try {
    let result = await api.get(Apis.GetVendorProductList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProductByVendor = async (data) => {
  try {
    let result = await api.get(Apis.GetProductByVendor, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.msg);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteSellerList = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeleteSellerList, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const deleteProductByVendorList = async (id) => {
  try {
    let result = await api.post(Apis.DeleteProductByVendorList, id);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getNewVendorList = async () => {
  try {
    let result = await api.get(Apis.GetNewVendorList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllSellerProductList = async (data) => {
  try {
    let result = await api.get(Apis.GetAllSellerProductList, { params: data });
    if (result.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const productUpdate = async (data) => {
  try {
    let result = await api.put(Apis.productUpdate, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateBrandByPrice = async (data) => {
  try {
    let result = await api.put(Apis.UpdateBrandByPrice, data);
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
  createSupplierList,
  createSupplierProductList,
  getAllSellerList,
  getProductByVendor,
  getAllSellerProductList,
  productUpdate,
  updateBrandByPrice,
  getUpdateSellerList,
  getVendorProductList,
  deleteProductByVendorList,
  getDeleteSellerList,
  getNewVendorList,
};
