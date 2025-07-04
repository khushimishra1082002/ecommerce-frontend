import api from "../utils/api";
import conf from "../config/Conf"

export const getPosterData = async () => {
  try {
    const response = await api.get(conf.GetAllPoster); 
    console.log("API Response poster:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching banner",
      error.response?.data || error.message
    );
    throw error;
  }
};