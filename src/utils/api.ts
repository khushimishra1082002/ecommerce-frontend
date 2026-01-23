import axios from "axios";
import conf from "../config/Conf";

const api = axios.create({
  baseURL: conf.BaseURL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Token injection
api.interceptors.request.use(
  (config) => {
    if (config.headers?.requiresAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
      } else {
        window.location.href = "/IsLoggedIn";
        return Promise.reject("No token found");
      }
    }
    delete config.headers.requiresAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/IsLoggedIn";
    }
    return Promise.reject(error);
  }
);

export default api;

