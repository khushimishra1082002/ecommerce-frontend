import api from "../utils/api";
import conf from "../config/Conf";

interface AddWishlistPayload {
  userId: string;
  productId: string;
}

export const getWishlistData = async (userId: string) => {
  try {
    const response = await api.get(`${conf.GetWishlistProductUrl}/${userId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error wishlist", error.response?.data || error.message);
    throw error;
  }
};

export const AddProductInWishlistData = async ({
  userId,
  productId,
}: AddWishlistPayload) => {
  try {
    const response = await api.post(conf.AddProductInWishlistUrl, {
      productId,
      userId,
    });
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteProductFromWishlistData = async (
  userId: string,
  productId: string,
) => {
  try {
    const response = await api.delete(
      `${conf.DeleteProductFromWishlistUrl}/${userId}/${productId}`,
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error ", error.response?.data || error.message);
    throw error;
  }
};
