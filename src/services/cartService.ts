import api from "../utils/api";
import conf from "../config/Conf";

export const getCartData = async (userId) => {
  try {
    const response = await api.get(`${conf.GetCartProductUrl}/${userId}`);
    console.log("API Response cart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error.response?.data || error.message);
    throw error;
  }
};

export const AddProductInCartData = async ({ userId, productId, quantity }) => {
  try {
    const response = await api.post(conf.AddProductInCartUrl, {
      productId,
      userId,
      quantity,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error add products", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteProductFromCartData = async (userId,productId) =>{
     try {
    const response = await api.delete(`${conf.DeleteProductFromCartUrl}/${userId}/${productId}`);
    console.log("API Response cart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in delete cart", error.response?.data || error.message);
    throw error;
  }
}

export const UpdateProductQuanityInCartData =  async (userId, productId, quantity) =>{
   try {
    const response = await api.put(conf.updateProductQuantityInCartUrl, {
      productId,
      userId,
      quantity,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error add products", error.response?.data || error.message);
    throw error;
  }
}
