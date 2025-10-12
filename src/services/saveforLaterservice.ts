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