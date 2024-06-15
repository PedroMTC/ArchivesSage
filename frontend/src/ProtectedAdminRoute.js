import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin ? <Route element={element} /> : <Navigate to="/chat" />;
};

export default ProtectedAdminRoute;
