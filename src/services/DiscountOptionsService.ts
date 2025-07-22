import api from "../utils/api";
import conf from "../config/Conf";

export const getDiscountOptionsData = async (categoryID) => {
  try {
    const response = await api.get(`${conf.getDiscountOptionsUrl}/${categoryID}`);
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error discount",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createDiscountOptionsData = async ({ categoryId, options }) => {
  try {
    const response = await api.post(conf.createDiscountOptionsModel, {
      categoryId,
      options,
    });
    return response.data;
  } catch (error) {
    console.error("Error add siscount options", error.response?.data || error.message);
    throw error;
  }
};

