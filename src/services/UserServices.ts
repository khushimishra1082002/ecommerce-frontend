import api from "../utils/api";
import conf from "../config/Conf";

export const getSingleUserData = async (userId) => {
  try {
    const response = await api.get(`${conf.getSingleUserUrl}/${userId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};

export const editUserData = async (userId, formData) => {
  try {
    const response = await api.put(
      `${conf.updateUserUrl}/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const CreateUserData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createUserUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};
