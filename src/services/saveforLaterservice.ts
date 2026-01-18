import api from "../utils/api";
import conf from "../config/Conf";

export const AddSaveForLetterData = async ({ userId, productId, quantity }) => {
  try {
    const response = await api.post(conf.saveForLetterProductUrl, {
      productId,
      userId,
      quantity,
    });
    console.log("tttttttttttt", response);
    return response.data;
  } catch (error) {
    console.error("Error add product", error.response?.data || error.message);
    throw error;
  }
};

export const getSaveForLaterData = async (userId) => {
  try {
    const response = await api.get(
      `${conf.getSaveForLaterProductUrl}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching saved for later products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const removeSaveForLaterData = async (userId, productId) => {
  try {
    const response = await api.delete(
      `${conf.removeSaveForLaterProductUrl}/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing saved for later product",
      error.response?.data || error.message
    );
    throw error;
  }
};
