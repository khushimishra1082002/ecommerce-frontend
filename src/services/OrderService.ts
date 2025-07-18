import api from "../utils/api";
import conf from "../config/Conf"

export const placeOrderData = async (data) => {
  try {
    const response = await api.post(conf.placeOrderUrl, data,);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserOrdersData = async (userId) => {
  try {
    const response = await api.get(`${conf.getUserOrdersUrl}/${userId}`);
    console.log("API Response single:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category",
      error.response?.data || error.message
    );
    throw error;
  }
};