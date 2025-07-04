import api from "../utils/api";
import conf from "../config/Conf";

export const getBrandData = async () => {
  try {
    const response = await api.get(`${conf.GetBrandUrl}`);
    console.log("API Response Brands:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand", error.response?.data || error.message);
    throw error;
  }
};