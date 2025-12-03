import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ missing import

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; // ya spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
