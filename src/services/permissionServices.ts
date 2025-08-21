import api from "../utils/api";
import conf from "../config/Conf";
import { PermissionDTO } from "../types/permission";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

interface CreatePermissionResponse {
  success: boolean;
  message: string;
  role: any;
}
export const getPermissionData = async () => {
  try {
    const response = await api.get(conf.getPermissionsUrl);
    console.log("response dd", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching roles",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFilterPermissionData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); 
    const response = await api.get(
      `${conf.getFilteredPermissionUrl}?${queryString}`
    );

    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error ",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSinglePermissionData = async (id) => {
  try {
    const response = await api.get(`${conf.getSinglePermissionUrl}/${id}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createPermissionData = async (
  formData: PermissionDTO
): Promise<CreatePermissionResponse> => {
  try {
    const response = await api.post<CreatePermissionResponse>(
      conf.createPermissionUrl,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deletePermissionData = async (id) => {
  try {
    const response = await api.delete(`${conf.deletePermissionUrl}/${id}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteMultiplePermissionData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultiplePermissionUrl, {
      data: { ids }, 
    });
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};


export const editPermissionData = async (id, formData) => {
  try {
    const response = await api.put(`${conf.updatePermissionUrl}/${id}`, formData,);
    console.log("response", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error ", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};