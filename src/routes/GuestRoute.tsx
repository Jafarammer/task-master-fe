import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const GuestRoute = ({ children }: Props): React.ReactElement | null => {
  const token = getToken();

  if (token) return <Navigate to="/my-task" replace />;

  return children as React.ReactElement;
};

export default GuestRoute;
