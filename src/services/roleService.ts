import api from "../utils/api";
import conf from "../config/Conf";
import { RolesDTo } from "../types/role";
import { buildQueryFromFilters } from "../utils/buildQueryFromFilters";

interface CreateRoleResponse {
  success: boolean;
  message: string;
  role: any; }

export const getRolesData = async () => {
  try {
    const response = await api.get(conf.getRolesUrl);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching roles",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleRoleData = async (id) => {
  try {
    const response = await api.get(`${conf.getSingleRoleUrl}/${id}`);
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




export const createRoleData = async (formData: RolesDTo): Promise<CreateRoleResponse> => {
  try {
    const response = await api.post<CreateRoleResponse>(conf.createRoleUrl, formData);
    return response.data; 
  } catch (error: any) {
    console.error("Error category:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteRoleData = async (id) => {
  try {
    const response = await api.delete(`${conf.deleteRoleUrl}/${id}`);
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

export const deleteMultipleRolesData = async (ids) => {
  try {
    const response = await api.delete(conf.deleteMultipleRoleUrl, {
      data: { ids }, 
    });
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error category", error.response?.data || error.message);
    throw error;
  }
};

export const editRoleData = async (id, formData) => {
  try {
    const response = await api.put(`${conf.updateRoleUrl}/${id}`, formData,);
    console.log("response", response.data);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error category", error.response?.data || error.message);
    return { ok: false, message: error.response?.data?.message || error.message };
  }
};


export const getFilterRoleData = async (filters = {}) => {
  try {
    const queryString = buildQueryFromFilters(filters); 
    const response = await api.get(
      `${conf.getFilteredRolesUrl}?${queryString}`
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