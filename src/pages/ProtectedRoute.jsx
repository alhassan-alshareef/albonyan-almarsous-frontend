import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function ProtectedRoute({ children, allowedRole }) {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" replace />;


  if (allowedRole && user.role !== allowedRole) {
    return user.role === "patient"
      ? <Navigate to="/patient/posts" replace />
      : <Navigate to="/posts" replace />;
  }


  return children;
}
