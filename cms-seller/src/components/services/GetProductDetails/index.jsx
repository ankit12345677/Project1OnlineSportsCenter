import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";
const addSellerProductList = async (data) => {
  try {
    let result = await api.post(Apis.AddSellerProductList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateSellerProductList = async (data) => {
  try {
    let result = await api.put(Apis.UpdateSellerProductList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllProductList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllBrandList = async () => {
  try {
    let result = await api.get(Apis.GetAllBrandList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProductById = async (data) => {
  try {
    let result = await api.post(Apis.GetProductById, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllColorList = async () => {
  try {
    let result = await api.get(Apis.GetAllColorList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getSingeImageUpload = async (data, config) => {
  try {
    let result = await api.put(Apis.GetSingeImageUpload, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getMultipleImageUpload = async (data, config) => {
  try {
    let result = await api.post(Apis.GetMultipleImageUpload, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getThumbnailDelete = async (data) => {
  try {
    let result = await api.put(Apis.GetThumbnailDelete, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getMultipleImageDelete = async (data) => {
  try {
    let result = await api.post(Apis.GetMultipleImageDelete, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getDeleteProductVarient = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeleteProduct, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getMainProductDelete = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeleteMainProduct, {
      params: { id },
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
const getSellerProductList = async () => {
  try {
    let result = await api.get(Apis.GetSellerProductList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createCoupon = async (data) => {
  try {
    let result = await api.post(Apis.GetCreateCoupon, data);
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getCouponList = async () => {
  try {
    let result = await api.get(Apis.GetCouponList);
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getSellerChildCat = async () => {
  try {
    let result = await api.get(Apis.GetSellerChildCat);
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateProductbyCat = async (data) => {
  try {
    let result = await api.put(Apis.UpdateProductbyCat, data);
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getDeleteCoupon = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeleteCoupon, { params: { id } });
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getTagList = async (data) => {
  try {
    let result = await api.get(Apis.GetTagList, { params: data });
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const deleteTag = async (id) => {
  try {
    let result = await api.delete(Apis.GetDeletTag, { params: { id } });
    if (result.data.error) {
      apiError(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

export default {
  addSellerProductList,
  updateSellerProductList,
  getProductById,
  getMainProductDelete,
  getAllProductList,
  getSingeImageUpload,
  getThumbnailDelete,
  getMultipleImageUpload,
  getMultipleImageDelete,
  getDeleteProductVarient,
  getAllBrandList,
  getSellerProductList,
  createCoupon,
  getSellerChildCat,
  updateProductbyCat,
  getDeleteCoupon,
  getCouponList,
  getAllColorList,
  getTagList,
  deleteTag,
};
