import api from "../utils/api";
import conf from "../config/Conf";
import { LoginDTO } from "../types/auth";

export const LoginAdminData = async (formData: LoginDTO) => {
  try {
    const response = await api.post(conf.adminLoginUrl, formData);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed.",
    };
  }
};
