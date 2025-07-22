import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/token";

export const decodeToken = (): TokenPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
