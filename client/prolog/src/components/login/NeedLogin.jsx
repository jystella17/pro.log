import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NeedLogin = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default NeedLogin;
