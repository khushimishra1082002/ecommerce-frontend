import api from "../utils/api";
import conf from "../config/Conf"
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";
import { CreateOrderDTO } from "../types/order";

export const getAllOrdersData = async () => {
  try {
    const response = await api.get(`${conf.getAllOrders}`);
    console.log("Orders", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error order",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const placeOrderData = async (data:CreateOrderDTO) => {
  try {
    const response = await api.post(conf.placeOrderUrl, data,);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error Orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserOrdersData = async (userId:string) => {
  try {
    const response = await api.get(`${conf.getUserOrdersUrl}/${userId}`);
    console.log("Orders", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error Orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteOrderData = async (orderId:string) => {
  try {
    const response = await api.delete(`${conf.deleteOrderUrl}/${orderId}`);
    console.log("Orders", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error Orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFilterOrderData = async (searchQuery: string) => {
  try {
    const response = await api.get(
      `${conf.getFilteredOrdersUrl}?q=${encodeURIComponent(searchQuery)}`
    );

    console.log("Orders", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editOrderStatusData = async (id:string, status:string) => {
  try {
    const response = await api.put(`${conf.updateOrderStatusUrl}/${id}`, { status });
    console.log("Orders", response.data);
    return { ok: true, data: response.data };
  } catch (error:any) {
    console.error("Error updating Orders", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};

