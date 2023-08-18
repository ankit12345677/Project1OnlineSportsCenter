import api from '../../components/ApiConfig';
import { Apis } from '../../config';
import { NotificationManager } from 'react-notifications';
import ApiError from '../../common/ApiError';
const getAllCategoryList = async (slug) => {
    try {
        let result = await api.get(Apis.GetAllCategoryList + slug);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        ApiError(error)
    }
};

const getFilterByCategory = async (data) => {
    try {
        let result = await api.post(Apis.GetFilterByCategory, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        ApiError(error)
    }
};

const getAllMainCategorlist = async () => {
    try {
        let result = await api.get(Apis.GetAllMainCategorlist);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        ApiError(error)
    }
}

const getFilterCatBrandList = async (data) => {
    try {
        let result = await api.post(Apis.GetFilterCatBrandList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        ApiError(error)
    }
};

const getSearchByCatList = async (data) => {
    try {
        let result = await api.post(Apis.GetSearchByCatList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        ApiError(error)
    }
};

export default {
    getAllCategoryList,
    getFilterByCategory,
    getFilterCatBrandList,
    getSearchByCatList,
    getAllMainCategorlist,
};