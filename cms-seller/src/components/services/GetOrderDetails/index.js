import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import { getCookie } from '../../../function';
import {
    apiError
} from '../../common';
const getAllOrderList = async (data) => {
    try {
        let result = await api.post(Apis.GetAllOrderDetails,data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getOrderStatusUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderStatusUpdate, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};
const getOrderNotification = async () => {
    try {
        let result = await api.get(Apis.GetOrderNotification);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getDeleteOrder = async (data) => {
    try {
        let result = await api.post(Apis.GetDeleteOrder, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getAllProductProfitList = async () => {
    try {
        let result = await api.get(Apis.GetAllProductProfitList, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('token')
            }
        });
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

export default {
    getAllOrderList,
    getOrderNotification,
    getOrderStatusUpdate,
    getAllProductProfitList,
    getDeleteOrder,
};