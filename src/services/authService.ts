import api from "../utils/api";
import conf from "../config/Conf"
import { LoginDTO, SignupDTO } from "../types/auth";


export const SignUpUserData = async (formData: SignupDTO) => {
  try {
    const response = await api.post(conf.SignupUrl, formData);
    return response.data;
  } catch (error: any) {
    console.error("Signup Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed.",
    };
  }
};

export const LoginUserData = async (formData: LoginDTO) => {
  try {
    const response = await api.post(conf.LoginUrl, formData);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed.",
    };
  }
};
