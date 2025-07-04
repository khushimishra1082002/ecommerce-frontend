import api from "../utils/api";
import conf from "../config/Conf"

export const getBannerData = async () => {
  try {
    const response = await api.get(conf.GetAllBanner); 
    console.log("API Response banner:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching banner",
      error.response?.data || error.message
    );
    throw error;
  }
};