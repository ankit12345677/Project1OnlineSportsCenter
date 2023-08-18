import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";

const createCategoryList = async (data) => {
  try {
    let result = await api.post(Apis.CreateCategoryList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getCategoryList = async () => {
  try {
    let result = await api.get(Apis.GetAllCategoryList);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getCategoryDeleteById = async (id) => {
  try {
    let result = await api.delete(Apis.GetMainDeleteById, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUpdateCategoryList = async (data) => {
  try {
    let result = await api.post(Apis.GetUpdateCategoryList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

// sub categorylist
const createSubCategoryList = async (data) => {
  try {
    let result = await api.post(Apis.CreateSubCategoryList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getSubCategoryList = async (data) => {
  try {
    let result = await api.get(Apis.GEtAllSubCategoryList, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUpdateSubList = async (data) => {
  try {
    let result = await api.post(Apis.GetUpdateSubCategoryList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getSubDeleteById = async (id) => {
  try {
    let result = await api.delete(Apis.GetSubDeleteById, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

// child category list
const getSelectSubCategory = async (id) => {
  try {
    let result = await api.get(Apis.GetAllSubCategory + `${id}`);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createChildCategory = async (data) => {
  try {
    let result = await api.post(Apis.CreateChildCategory, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getChildCategoryList = async (data) => {
  try {
    let result = await api.get(Apis.GetAllChildCategoryList, { params: data });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getChildDeleteById = async (id) => {
  try {
    let result = await api.delete(Apis.GetChildDeleteById, { params: { id } });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getAllSubChildCategory = async (id) => {
  try {
    let result = await api.get(Apis.GetAllSubChildCategory + `${id}`);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createSuperCategory = async (data) => {
  try {
    let result = await api.post(Apis.CreateSuperCategory, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getSuperCategoryList = async (data) => {
  try {
    let result = await api.get(Apis.GetSuperCategoryList, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getSuperCatDelete = async (data) => {
  try {
    let result = await api.post(Apis.GetSuperCatDelete, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateSuperCategory = async (data) => {
  try {
    let result = await api.put(Apis.UpdateSuperCategory, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getUpdateChildCat = async (data) => {
  try {
    let result = await api.put(Apis.GetUpdateChildCat, data);
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
  createCategoryList,
  updateSuperCategory,
  getCategoryList,
  getUpdateCategoryList,
  createSubCategoryList,
  getSubCategoryList,
  getUpdateSubList,
  getSubDeleteById,
  getUpdateChildCat,
  getSelectSubCategory,
  createChildCategory,
  getChildCategoryList,
  getCategoryDeleteById,
  createSuperCategory,
  getSuperCategoryList,
  getSuperCatDelete,
  getChildDeleteById,
  getAllSubChildCategory,
};
