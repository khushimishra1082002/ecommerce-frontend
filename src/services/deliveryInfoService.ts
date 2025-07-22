import api from "../utils/api";
import conf from "../config/Conf";

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
  } catch (error) {
    console.error(
      "Error info",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postDeliveryInfoData = async (deliveryData) => {
  try {
    const response = await api.post(conf.postDeliveryInfoUrl, deliveryData, {
      headers: {
        requiresAuth: true,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error info",
      error.response?.data || error.message
    );
    throw error;
  }
};
