// import api from "../utils/api";
// import conf from "../config/Conf";

// export const getDiscountOptionsData = async (categoryID:string) => {
//   try {
//     const response = await api.get(`${conf.getDiscountOptionsUrl}/${categoryID}`);
//     console.log("Response", response.data);
//     return response.data;
//   } catch (error:any) {
//     console.error(
//       "Error discount",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// export const createDiscountOptionsData = async ({ categoryId, options }) => {
//   try {
//     const response = await api.post(conf.createDiscountOptionsModel, {
//       categoryId,
//       options,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error add siscount options", error.response?.data || error.message);
//     throw error;
//   }
// };

import api from "../utils/api";
import conf from "../config/Conf";
import { DiscountOptionDTO } from "../types/discountOptions";

/* ---------------- GET DISCOUNT OPTIONS ---------------- */
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

/* ---------------- CREATE DISCOUNT OPTIONS ---------------- */
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
