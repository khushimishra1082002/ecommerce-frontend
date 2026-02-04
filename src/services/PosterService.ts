import api from "../utils/api";
import conf from "../config/Conf"

export const getPosterData = async () => {
  try {
    const response = await api.get(conf.GetAllPoster); 
    console.log("Posters", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching Posters",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSinglePosterData = async (posterId: string) => {
  try {
    const response = await api.get(
      `${conf.singlePosterUrl}/${posterId}`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching single poster:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deletePosterData = async (posterId:string) => {
  try {
    const response = await api.delete(`${conf.deletePosterUrl}/${posterId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
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
  } catch (error:any) {
    console.error(
      "Error adding poster:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatePosterData = async (
  posterId: string,
  formData: FormData
) => {
  try {
    const response = await api.put(
      `${conf.upatePosterUrl}/${posterId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating poster:",
      error.response?.data || error.message
    );
    throw error;
  }
};
