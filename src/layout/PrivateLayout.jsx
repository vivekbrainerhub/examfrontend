import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateLayout = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  if (!token || token.trim() === "") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateLayout;
