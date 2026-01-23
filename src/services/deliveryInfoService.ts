import api from "../utils/api";
import conf from "../config/Conf";
import { DeliveryInfoFormDTO } from "../types/deliveryInformationDto";

export const getDeliveryInfoData = async () => {
  try {
    const response = await api.get(conf.getDeliveryInfoUrl,
       {
      headers: {
        requiresAuth: true, 
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error info",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postDeliveryInfoData = async (deliveryData:DeliveryInfoFormDTO) => {
  try {
    const response = await api.post(conf.postDeliveryInfoUrl, deliveryData, {
      headers: {
        requiresAuth: true,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error info",
      error.response?.data || error.message
    );
    throw error;
  }
};
