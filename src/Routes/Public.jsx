import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, restricted }) => {
  console.log(restricted);

  return restricted ? <Navigate to="/dashboard" /> : children;
};
