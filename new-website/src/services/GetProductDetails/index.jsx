import api from "../../components/ApiConfig";
import { Apis } from "../../config";
import { NotificationManager } from "react-notifications";
import ApiError from "../../common/ApiError";

const getFlashSale = async () => {
  try {
    let result = await api.get(Apis.GetFlashSale);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    ApiError(error);
  }
};

export default {
  getFlashSale,
};
