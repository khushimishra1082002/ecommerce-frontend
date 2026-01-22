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

// import axios from "axios";
// import conf from "../config/Conf";

// // instance
// const api = axios.create({
//   baseURL:  conf.BaseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor to add token conditionally
// api.interceptors.request.use(
//   (config) => {
//     if (config.headers?.requiresAuth) {
//       const token = sessionStorage.getItem("token");
//       console.log("Token:", token);

//       if (token) {
//         config.headers.Authorization = `Bearer ${token.trim()}`;
//       } else {
//         console.warn("No token found. Redirecting to login...");
//         window.location.href = "/"; // Redirect to login page
//         return Promise.reject("No token found");
//       }
//     }
//     delete config.headers.requiresAuth; // Remove custom property
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Response interceptor to handle expired tokens
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Token expired or unauthorized. Redirecting to login...");
//       sessionStorage.removeItem("token"); // Clear invalid token
//       window.location.href = "/"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
