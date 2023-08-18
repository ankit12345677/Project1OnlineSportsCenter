import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import {
    apiError
} from '../../common';
const getLocation = async (name, status) => {
    try {
        // data.date = moment().format();
        let data = { name: name, status: status }
        let result = await api.post(Apis.GetAllLocationCreate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getLocationList = async () => {
    try {
        let result = await api.get(Apis.GetAllLocationList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getLocationDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetLocationDeleteById, { params: { id } });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getLocationUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetLocationUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

// area api 
const getCityList = async () => {
    try {
        let result = await api.get(Apis.GetCityList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const createCityList = async (data) => {
    try {
        let result = await api.post(Apis.CreateCityList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getCityDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCityDeleteById, { params: { id }});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getCityUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCityUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getAllAreaByLocation = async (id) => {
    try {
        let result = await api.get(Apis.GetAllAreaByLocation + `${id}`);
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
    getLocation,
    getLocationList,
    getLocationDeleteById,
    getLocationUpdate,
    createCityList,
    getCityList,
    getCityDeleteById,
    getCityUpdate,
    getAllAreaByLocation
};