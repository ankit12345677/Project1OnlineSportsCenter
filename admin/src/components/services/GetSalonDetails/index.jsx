import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import {
    apiError
} from '../../common';
const getCreateSalonCategory = async (data) => {
    try {
        let result = await api.post(Apis.GetCreateSalonCategory, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getSalonUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetSalonUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllSalonList = async (data) => {
    try {
        let result = await api.get(Apis.GetAllSalonList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getServiceCreate = async (data) => {
    try {
        let result = await api.post(Apis.GetServiceCreate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getServiceList = async () => {
    try {
        let result = await api.get(Apis.GetServiceList);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getServiceUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetServiceUpdate, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getServiceListByGender = async (data) => {
    try {
        let result = await api.post(Apis.GetServiceListByGender, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const deleteCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.DeleteCategoryList, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getServiceDeleteFromSalon = async (data) => {
    try {
        let result = await api.post(Apis.GetServiceDeleteFromSalon, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const addSalonDetails = async (data, config) => {
    try {
        let result = await api.post(Apis.CreateSalonDetails, data, config);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};


const getAllSalonOwner = async () => {
    try {
        let result = await api.get(Apis.GetAllSalonOwner);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const updateSalonDetails = async (data, config) => {
    try {
        let result = await api.post(Apis.UpdateSalonDetails, data, config);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getParlourStatusChanged = async (data) => {
    try {
        let result = await api.post(Apis.GetParlourStatus, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllOrderList = async (data) => {
    try {
        let result = await api.post(Apis.GetParlourOrderList, data);
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
    getCreateSalonCategory,
    getAllSalonList,
    getServiceCreate,
    getServiceListByGender,
    getServiceList,
    deleteCategoryList,
    getServiceUpdate,
    getServiceDeleteFromSalon,
    addSalonDetails,
    getAllSalonOwner,
    updateSalonDetails,
    getSalonUpdate,
    getParlourStatusChanged,
    getAllOrderList,
};