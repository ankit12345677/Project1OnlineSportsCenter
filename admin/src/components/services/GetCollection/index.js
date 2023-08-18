import api from "../../ApiConfig";
import { Apis } from "../../../config";
import { NotificationManager } from "react-notifications";
import { apiError } from "../../common";

const createCollection = async (data) => {
  try {
    let result = await api.post(Apis.CreateCollection, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getCollection = async () => {
  try {
    let result = await api.get(Apis.GetCollection);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getCollectionUpdate = async (data) => {
  try {
    let result = await api.put(Apis.GetCollectionUpdate, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const createItemCollection = async (data) => {
  try {
    let result = await api.post(Apis.CreateItemCollection, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getItemList = async (id) => {
  try {
    let result = await api.get(Apis.GetItemList, {
      params: { collectionId: id },
    });
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deleteItem = async (data) => {
  try {
    let result = await api.post(Apis.DeleteItem, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getFlashSale = async () => {
  try {
    let result = await api.get(Apis.GetFlashSale);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const deleteProductFromFlash = async (id) => {
  try {
    let result = await api.delete(Apis.DeleteProductFromFlash, {
      params: { id: id },
    });
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateProductFromFlash = async (data) => {
  try {
    let result = await api.put(Apis.UpdateProductFromFlash, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const updateFlashStatus = async (data) => {
  try {
    let result = await api.put(Apis.UpdateFlashStatus, data);
    if (result.errors) {
      NotificationManager.error(result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
export default {
  createCollection,
  getCollection,
  getCollectionUpdate,
  createItemCollection,
  getItemList,
  deleteItem,
  getFlashSale,
  deleteProductFromFlash,
  updateProductFromFlash,
  updateFlashStatus,
};
