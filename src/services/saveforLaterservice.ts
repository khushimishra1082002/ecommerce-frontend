import api from "../utils/api";
import conf from "../config/Conf";

interface AddSaveForLaterPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export const addSaveForLaterData = async (payload: AddSaveForLaterPayload) => {
  try {
    const response = await api.post(conf.saveForLetterProductUrl, payload);
    return response.data;
  } catch (err: any) {
    console.error(
      "Error adding save for later product",
      err.response?.data || err.message,
    );
    throw err;
  }
};

export const getSaveForLaterData = async (userId: string) => {
  try {
    const response = await api.get(
      `${conf.getSaveForLaterProductUrl}/${userId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching saved for later products",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const removeSaveForLaterData = async (
  userId: string,
  productId: string,
) => {
  try {
    const response = await api.delete(
      `${conf.removeSaveForLaterProductUrl}/${userId}/${productId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error removing saved for later product",
      error.response?.data || error.message,
    );
    throw error;
  }
};
