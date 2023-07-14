import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = ({ user, allowedRoles }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return !allowedRoles || allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default Auth;
