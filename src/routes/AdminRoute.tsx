import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  console.log("AdminRoute → token:", token);
  console.log("AdminRoute → role:", role);

  if (!token) {
    return <Navigate to="/AdminLogin" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
