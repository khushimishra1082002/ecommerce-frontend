import api from "../utils/api";
import conf from "../config/Conf"
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getAllCategoryData = async () => {
  try {
    const response = await api.get(conf.GetAllCategoryUrl); 
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleCategoryData = async (categoryID) => {
  try {
    const response = await api.get(`${conf.getSingleCategoryUrl}/${categoryID}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFilterCategoryData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); // builds ?brand=Nike&subcategory=id1,id2
    const response = await api.get(
      `${conf.getFilteredCategoriesUrl}?${queryString}`
    );

    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreateCategoryData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createCategoryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error category:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteCategoryData = async (categoryID) => {
  try {
    const response = await api.delete(`${conf.deleteCategoryUrl}/${categoryID}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteMultipleCategoryData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleCategoryUrl, {
      data: { ids }, 
    });
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error category", error.response?.data || error.message);
    throw error;
  }
};

export const editCategoryData = async (categoryID, formData) => {
  try {
    const response = await api.put(`${conf.editCategoryUrl}/${categoryID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error category", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};