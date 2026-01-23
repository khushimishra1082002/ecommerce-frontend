import api from "../utils/api";
import conf from "../config/Conf";
import { DiscountOptionDTO } from "../types/discountOptions";


export const getDiscountOptionsData = async (
  categoryId: string
): Promise<DiscountOptionDTO> => {
  try {
    const response = await api.get<DiscountOptionDTO>(
      `${conf.getDiscountOptionsUrl}/${categoryId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error discount options",
      error.response?.data || error.message
    );
    throw error;
  }
};


interface CreateDiscountOptionsPayload {
  categoryId: string;
  options: {
    label: string;
    value: number;
  }[];
}

export const createDiscountOptionsData = async (
  payload: CreateDiscountOptionsPayload
): Promise<DiscountOptionDTO> => {
  try {
    const response = await api.post<DiscountOptionDTO>(
      conf.createDiscountOptionsModel,
      payload
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error add discount options",
      error.response?.data || error.message
    );
    throw error;
  }
};
