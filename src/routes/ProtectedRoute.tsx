import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props): React.ReactElement | null => {
  const token = getAccessToken();

  if (!token) return <Navigate to="/login" replace />;
  return children as React.ReactElement;
};

export default ProtectedRoute;
