import api from "../utils/api";
import conf from "../config/Conf"

export const getPosterData = async () => {
  try {
    const response = await api.get(conf.GetAllPoster); 
    console.log("Posters", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Posters",
      error.response?.data || error.message
    );
    throw error;
  }
};