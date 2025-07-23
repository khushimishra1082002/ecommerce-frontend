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

export const deletePosterData = async (posterId) => {
  try {
    const response = await api.delete(`${conf.deletePosterUrl}/${posterId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching poster",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreatePosterData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createPosterUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding poster:",
      error.response?.data || error.message
    );
    throw error;
  }
};