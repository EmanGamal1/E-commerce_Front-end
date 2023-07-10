import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ auth, children, path }) => {
  if (auth === false) {
    return <Navigate to={path} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
