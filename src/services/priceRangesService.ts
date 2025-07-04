import api from "../utils/api";
import conf from "../config/Conf"

export const getPriceRangeData = async (categoryID) => {
  try {
    const response = await api.get(`${conf.GetPriceRangeUrl}/${categoryID}`);
    console.log("API Response price range:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching price range", error.response?.data || error.message);
    throw error;
  }
};

export const CreatePriceRangeData = async ({ label, min, max, category }) => {
  try {
    const response = await api.post(conf.CreatePriceRangeUrl, {
      label, min, max, category
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error add products", error.response?.data || error.message);
    throw error;
  }
};