import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../component/auth/login";
import { Register } from "../component/auth/register";
import { Dashboard } from "../pages/dashboard";
import { PrivateRoutes } from "./Private";
import { PublicRoute } from "./Public";
import { Navigate } from "react-router-dom";
import { AboutPage } from "../pages/about";
import { ForgotPassword } from "../component/auth/Forgot";

export const AllRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/about-us"
        element={
          <PrivateRoutes>
            <AboutPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute restricted={props.userAuth}>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute restricted={props.userAuth}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword restricted={props.userAuth} />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
