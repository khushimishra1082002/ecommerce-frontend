import api from "../utils/api";
import conf from "../config/Conf";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

export const getAllProductData = async () => {
  try {
    const response = await api.get(conf.GetAllProductUrl);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleProductData = async (productId) => {
  try {
    const response = await api.get(`${conf.GetSingleProductUrl}/${productId}`);
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

export const getNewArrivalsProductData = async () => {
  try {
    const response = await api.get(conf.GetNewArrivalProduct);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFeaturedProductData = async () => {
  try {
    const response = await api.get(conf.GetNewArrivalProduct);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTreandingProductData = async () => {
  try {
    const response = await api.get(conf.GetTrendingProduct);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postRecentlyViewedProductData = async ({ productId, userId }) => {
  console.log();

  try {
    const response = await api.post(conf.PostRecentlyViwedProduct, {
      productId,
      userId,
    });
    console.log("Recently", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getRecentlyViewedProductData = async (userId) => {
  try {
    const response = await api.get(
      `${conf.GetRecentlyViwedProducts}/${userId}`
    );
    console.log("API Response recently View:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSimilorProductData = async (productId) => {
  try {
    const response = await api.get(`${conf.GetSimilorProduct}/${productId}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getRecommendedProductData = async (userId) => {
  try {
    const response = await api.get(`${conf.GetRecommendedProduct}/${userId}`);
    console.log("yAPI Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFilterProductsData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); // builds ?brand=Nike&subcategory=id1,id2
    console.log("🧪 Query String:", queryString);
    const response = await api.get(
      `${conf.GetFilteredProductsUrl}?${queryString}`
    );
    console.log("🔗 Full API URL:", response);
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

export const CreateProductData = async (formData: FormData) => {
  try {
    const response = await api.post(conf.CreateProductUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteProductData = async (productId) => {
  try {
    const response = await api.delete(`${conf.deleteProductUrl}/${productId}`);
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

export const deleteMultipleProductData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleProductUrl, {
      data: { ids },
    });
    console.log("API Response multiple delete:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting multiple products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editProductData = async (productId, formData) => {
  try {
    const response = await api.put(
      `${conf.editProductUrl}/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("API Response single:", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error(
      "Error updating product",
      error.response?.data || error.message
    );
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
