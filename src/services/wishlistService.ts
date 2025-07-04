import api from "../utils/api";
import conf from "../config/Conf";

export const getWishlistData = async (userId) => {
  try {
    const response = await api.get(`${conf.GetWishlistProductUrl}/${userId}`);
    console.log("API Response wishlist  dataaaaa:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist", error.response?.data || error.message);
    throw error;
  }
};

export const AddProductInWishlistData = async ({ userId, productId }) => {
  try {
    const response = await api.post(conf.AddProductInWishlistUrl, {
      productId,
      userId,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error add products", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteProductFromWishlistData = async (userId,productId) =>{
     try {
    const response = await api.delete(`${conf.DeleteProductFromWishlistUrl}/${userId}/${productId}`);
    console.log("API Response cart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in delete cart", error.response?.data || error.message);
    throw error;
  }
}