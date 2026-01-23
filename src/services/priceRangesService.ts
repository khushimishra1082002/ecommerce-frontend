import api from "../utils/api";
import conf from "../config/Conf";

interface CreatePriceRangePayload {
  label: string;
  min: number;
  max: number;
  category: string;
}

export const getPriceRangeData = async (categoryID: string) => {
  try {
    const response = await api.get(`${conf.GetPriceRangeUrl}/${categoryID}`);
    console.log("Response", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error price range", error.response?.data || error.message);
    throw error;
  }
};

export const createPriceRangeData = async (
  payload: CreatePriceRangePayload,
) => {
  try {
    const response = await api.post(conf.CreatePriceRangeUrl, payload);
    return response.data;
  } catch (err: any) {
    console.error(
      "Error adding save for later product",
      err.response?.data || err.message,
    );
    throw err;
  }
};
