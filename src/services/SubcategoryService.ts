import api from "../utils/api";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getSubcategoryData = async () => {
  try {
    const response = await api.get(`${conf.GetAllSubcategoryUrl}`);
    console.log("API Response Subcategories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist", error.response?.data || error.message);
    throw error;
  }
};

export const getSingleSubcategoryData = async (subcategoryID) => {
  try {
    const response = await api.get(`${conf.GetSingleSubcategoryUrl}/${subcategoryID}`);
    console.log("API Response single subcategory:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subcategory",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMultipleSubcategoriesData = async (query) => {
  try {
    const response = await api.get(`${conf.getMultipleSubcategoriesUrl}?ids=${query}`);
    console.log("API Response multiple subcategory:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subcategory",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteSubcategoryData = async (subcategoryID) => {
  try {
    const response = await api.delete(`${conf.deleteSubcategoryUrl}/${subcategoryID}`);
    console.log("API Response single ddddd:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteMultipleSubCategoryData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleSubcategoriesUrl, {
      data: { ids }, 
    });
    console.log("API Response multiple delete:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting multiple products:", error.response?.data || error.message);
    throw error;
  }
};

export const getFilterSubCategoryData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); // builds ?brand=Nike&subcategory=id1,id2
    const response = await api.get(
      `${conf.getFilteredSubategoriesurl}?${queryString}`
    );

    console.log("API Response: filtrd product", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreateSubcategoryData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createSubcategoryUrl, formData,);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editSubcategoryData = async (subcategoryID, formData) => {
  try {
    const response = await api.put(`${conf.editSubcategoryUrl}/${subcategoryID}`, formData, {
    });
    console.log("API Response single:", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error updating product", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};


export const getAllSubcategoryByCategoryData = async (categoryId) => {
  try {
    const response = await api.get(`${conf.getAllSubcategoryByCategoryUrl}/${categoryId}`);
    console.log("API Response single subcategory:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching subcategory",
      error.response?.data || error.message
    );
    throw error;
  }
};



