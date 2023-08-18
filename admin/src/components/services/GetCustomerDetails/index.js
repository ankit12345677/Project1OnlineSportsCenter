import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';
import {
    apiError
} from '../../common';

const getAllCustomerList = async (data) => {
    try {
        let result = await api.post(Apis.GetAllCustomerDetails, data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        apiError(error)
    }
};

const getCustomerDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetCustomerDeleteById, { params: { id } });
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
    getAllCustomerList,
    getCustomerDeleteById
};