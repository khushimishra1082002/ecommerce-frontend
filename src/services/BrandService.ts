import api from "../utils/api";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getBrandData = async () => {
  try {
    const response = await api.get(`${conf.GetBrandUrl}`);
    console.log("API Response Brands:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBrandData = async (BrandId) => {
  try {
    const response = await api.delete(`${conf.deleteBrandUrl}/${BrandId}`);
    console.log("API Response single:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product",
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

export const CreateBrandData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.createBrandUrl, formData,);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleBrandData = async (brandID) => {
  try {
    const response = await api.get(`${conf.singleBrandUrl}/${brandID}`);
    console.log("API Response single:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category",
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
    console.error("Error updating product", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};

export const deleteMultipleBrandData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleBrandUrl, {
      data: { ids }, 
    });
    console.log("API Response multiple delete:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting multiple products:", error.response?.data || error.message);
    throw error;
  }
};
