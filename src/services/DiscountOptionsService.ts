import api from "../utils/api";
import conf from "../config/Conf";

export const getDiscountOptionsData = async (categoryID) => {
  try {
    const response = await api.get(`${conf.getDiscountOptionsUrl}/${categoryID}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createDiscountOptionsData = async ({ category, options }) => {
  try {
    const response = await api.post(conf.createDiscountOptionsModel, {
      category,
      options,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error add products", error.response?.data || error.message);
    throw error;
  }
};
