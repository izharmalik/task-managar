import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import { Layout } from "../component/layout/index";

export const PrivateRoutes = ({ children }) => {
  const { authContext } = useAppContext();

  return authContext?.isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" />
  );
};
