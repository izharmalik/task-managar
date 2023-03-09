import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, restricted }) => {
  return restricted ? <Navigate to="/dashboard" /> : children;
};
