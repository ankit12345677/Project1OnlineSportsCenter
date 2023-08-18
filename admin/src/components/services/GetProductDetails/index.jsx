import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";
const addProductList = async (data, config) => {
  try {
    let result = await api.post(Apis.AddProductList, data, config);
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
const searchAllProductList = async () => {
  try {
    let result = await api.get(Apis.SearchAllProductList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getFlashSaleProduct = async () => {
  try {
    let result = await api.get(Apis.GetFlashSaleProduct);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllProductPhoto = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductPhoto, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUpdateProduct = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUpdateProduct, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUploadProductImage = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUploadProductImage, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUploadVarientPhoto = async (data, config) => {
  try {
    let result = await api.post(Apis.GetUploadVarientPhoto, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteProduct = async (id) => {
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
const getProductVarient = async (id) => {
  try {
    let result = await api.delete(Apis.GetProductVarient, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getProductById = async (id) => {
  try {
    let result = await api.get(Apis.GetProductById, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getProductPhotoDeleteById = async (data) => {
  try {
    let result = await api.post(Apis.GetProductPhotoDeleteById, {
      id: data.id,
      imgUrl: data.imgUrl,
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

const getAllProductPhotoList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllProductPhotoList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getStatusUpdated = async (data) => {
  try {
    let result = await api.post(Apis.GetStatusUpdated, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getStockUpdated = async (data) => {
  try {
    let result = await api.post(Apis.GetStockUpdated, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getBannerUploadList = async (data, config) => {
  try {
    let result = await api.post(Apis.GetBannerUploadList, data, config);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllBannerList = async () => {
  try {
    let result = await api.get(Apis.GetAllBannerList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteBannerList = async (data) => {
  try {
    let result = await api.post(Apis.GetDeleteBannerList, {
      id: data.id,
      banner: data.banner,
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

const createSeoForProduct = async (data) => {
  try {
    let result = await api.post(Apis.CreateSeoForProduct, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getBannerStatus = async (data) => {
  try {
    let result = await api.post(Apis.GetBannerStatus, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const createbrandList = async (data) => {
  try {
    let result = await api.post(Apis.CreatebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const updatebrandList = async (data) => {
  try {
    let result = await api.post(Apis.UpdatebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllBrandList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllBrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllColorList = async (data) => {
  try {
    let result = await api.post(Apis.GetAllColorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createColorList = async (data) => {
  try {
    let result = await api.post(Apis.CreateColorList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deleteColorList = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteColorList, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deletebrandList = async (data) => {
  try {
    let result = await api.post(Apis.DeletebrandList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getAllSellerProduct = async (data) => {
  try {
    let result = await api.get(Apis.GetAllSellerItem, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getImageDetailList = async (data) => {
  try {
    let result = await api.get(Apis.GetImageDetailList, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateCommonName = async (data) => {
  try {
    let result = await api.put(Apis.UpdateCommonName, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createFlashSale = async (data) => {
  try {
    let result = await api.post(Apis.CreateFlashSale, data);
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
  addProductList,
  getAllProductList,
  getUpdateProduct,
  getDeleteProduct,
  getStockUpdated,
  getProductVarient,
  getUploadProductImage,
  getAllProductPhoto,
  getProductById,
  getImageDetailList,
  updateCommonName,
  getStatusUpdated,
  getBannerUploadList,
  getAllBannerList,
  getAllProductPhotoList,
  searchAllProductList,
  getProductPhotoDeleteById,
  createSeoForProduct,
  getUploadVarientPhoto,
  getBannerStatus,
  getDeleteBannerList,
  createbrandList,
  createFlashSale,
  getAllSellerProduct,
  getAllBrandList,
  deletebrandList,
  updatebrandList,
  getFlashSaleProduct,
  getAllColorList,
  createColorList,
  deleteColorList,
};
