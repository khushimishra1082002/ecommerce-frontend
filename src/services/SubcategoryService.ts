import api from "../utils/api";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getSubcategoryData = async () => {
  try {
    const response = await api.get(`${conf.GetAllSubcategoryUrl}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error subactegory", error.response?.data || error.message);
    throw error;
  }
};

export const getSingleSubcategoryData = async (subcategoryID:string) => {
  try {
    const response = await api.get(`${conf.GetSingleSubcategoryUrl}/${subcategoryID}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error subcategory data",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMultipleSubcategoriesData = async (query:any) => {
  try {
    const response = await api.get(`${conf.getMultipleSubcategoriesUrl}?ids=${query}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error  subcategory",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteSubcategoryData = async (subcategoryID:string) => {
  try {
    const response = await api.delete(`${conf.deleteSubcategoryUrl}/${subcategoryID}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error subcateory",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteMultipleSubCategoryData = async (ids:[]) => {
  try {
    const response = await api.delete(conf.deleteMultipleSubcategoriesUrl, {
      data: { ids }, 
    });
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error("Error subactegory", error.response?.data || error.message);
    throw error;
  }
};

export const getFilterSubCategoryData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); // builds ?brand=Nike&subcategory=id1,id2
    const response = await api.get(
      `${conf.getFilteredSubategoriesurl}?${queryString}`
    );

    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error subcategory",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreateSubcategoryData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createSubcategoryUrl, formData,);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editSubcategoryData = async (subcategoryID:string, formData:FormData) => {
  try {
    const response = await api.put(`${conf.editSubcategoryUrl}/${subcategoryID}`, formData, {
    });
    console.log("response", response.data);
    return { ok: true, data: response.data };
  } catch (error:any) {
    console.error("Error ", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};


export const getAllSubcategoryByCategoryData = async (categoryId:string) => {
  try {
    const response = await api.get(`${conf.getAllSubcategoryByCategoryUrl}/${categoryId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error",
      error.response?.data || error.message
    );
    throw error;
  }
};



