import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import {
    apiError
} from '../../common';
const getAllSeoList = async (data) => {
    try {
        let result = await api.post(Apis.GetAllSeoList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getDeleteList = async (data) => {
    try {
        let result = await api.post(Apis.GetDeleteList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getSeoUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetSeoUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getSeoSearch = async (data) => {
    try {
        let result = await api.post(Apis.GetSeoSearch, data);
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
    getAllSeoList,
    getDeleteList,
    getSeoUpdate,
    getSeoSearch
};