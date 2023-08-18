import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import {
    apiError
} from '../../common';
const createSellerList = async (data) => {
    try {
        let result = await api.post(Apis.CreateSellerShopList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllShopList = async () => {
    try {
        let result = await api.get(Apis.GetAllShopList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
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
        apiError(error)
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
        apiError(error)
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
        apiError(error)
    }
};

const getProductByVendor = async (data) => {
    try {
        let result = await api.post(Apis.GetProductByVendor, data);
        if (result.data.error) {
            NotificationManager.error(result.data.msg);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getDeleteShopList = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteShopList, { params: { id } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
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
        apiError(error)
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
        apiError(error)
    }
};

export default {
    createSellerList,
    getAllShopList,
    getAllSellerList,
    getProductByVendor,
    getUpdateSellerList,
    getVendorProductList,
    deleteProductByVendorList,
    getDeleteShopList,
    getNewVendorList
};