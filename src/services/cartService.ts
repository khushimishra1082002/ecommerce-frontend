import api from "../utils/api";
import conf from "../config/Conf";

interface AddProductPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export const getCartData = async (userId: string) => {
  try {
    const response = await api.get(`${conf.GetCartProductUrl}/${userId}`);
    console.log("cart", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching cart", error.response?.data || error.message);
    throw error;
  }
};

export const AddProductInCartData = async (payload: AddProductPayload) => {
  try {
    const response = await api.post(conf.AddProductInCartUrl, {
      productId: payload.productId,
      userId: payload.userId,
      quantity: payload.quantity,
    });
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("Error add product", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteProductFromCartData = async (
  userId: string,
  productId: string,
) => {
  try {
    const response = await api.delete(
      `${conf.DeleteProductFromCartUrl}/${userId}/${productId}`,
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error in delete cart",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const UpdateProductQuanityInCartData = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  try {
    const response = await api.put(conf.updateProductQuantityInCartUrl, {
      productId,
      userId,
      quantity,
    });
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("Error product", error.response?.data || error.message);
    throw error;
  }
};

export const ClearCartData = async (userId: string) => {
  try {
    const response = await api.delete(`${conf.ClearCartUrl}/${userId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error in delete cart",
      error.response?.data || error.message,
    );
    throw error;
  }
};
