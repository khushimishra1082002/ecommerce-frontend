import api from "../utils/api";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getBrandData = async () => {
  try {
    const response = await api.get(`${conf.GetBrandUrl}`);
    console.log("Brand", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBrandData = async (BrandId) => {
  try {
    const response = await api.delete(`${conf.deleteBrandUrl}/${BrandId}`);
    console.log("brand", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error brand",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFilterBrandData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); // builds ?brand=Nike&subcategory=id1,id2
    const response = await api.get(
      `${conf.getFilteredBrandUrl}?${queryString}`
    );

    console.log("brand", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error brand",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CreateBrandData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createBrandUrl, formData,);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding brand:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleBrandData = async (brandID) => {
  try {
    const response = await api.get(`${conf.singleBrandUrl}/${brandID}`);
    console.log("Single Brand", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error brand",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editBrandData = async (brandID, updatedData) => {
  try {
    const response = await api.put(`${conf.editBrandUrl}/${brandID}`, updatedData);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error updating brand", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};

export const deleteMultipleBrandData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleBrandUrl, {
      data: { ids }, 
    });
    console.log("brand", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting multiple brand:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllBrandBySubcategoryData = async (subcategoryID: string) => {
  if (!subcategoryID) return;

  try {
    const response = await api.get(
      `${conf.getAllBrandBySubcategoryUrl}/${subcategoryID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching brand",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllBrandByCategoryData = async (categoryID: string) => {
  if (!categoryID) return;

  try {
    const response = await api.get(
      `${conf.getAllBrandByCategoryUrl}/${categoryID}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching brand",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllBrandByMultipleSubcategoryData = async (ids) => {
  try {
    const response = await api.get(conf.getAllBrandByMultipleSubcategoryUrl, {
      params: { ids: ids.join(",") }, // pass as query param ?ids=...
    });
    console.log("Brand", response.data);
    return response.data;
  } catch (error) {
    console.error("Error brand", error.response?.data || error.message);
    throw error;
  }
};
