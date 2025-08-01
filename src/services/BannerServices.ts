import api from "../utils/api";
import conf from "../config/Conf";

export const getBannerData = async () => {
  try {
    const response = await api.get(conf.GetAllBanner);
    console.log("banner:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching banner",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleBannerData = async (bannerId) => {
  try {
    const response = await api.get(`${conf.getSingleBannerUrl}/${bannerId}`);
    console.log("single banner", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching banner",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreateBannerData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createBannerUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding banner:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBannerData = async (bannerId) => {
  try {
    const response = await api.delete(`${conf.deleteBannerUrl}/${bannerId}`);
    console.log("banner:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error banner",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editBannerData = async (bannerId, formData) => {
  try {
    const response = await api.put(
      `${conf.updateBannerUrl}/${bannerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Banner", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error(
      "Error updating banner",
      error.response?.data || error.message
    );
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
