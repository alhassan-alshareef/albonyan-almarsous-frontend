import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function ProtectedRoute({ children }) {
  const user = getUserFromToken();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;


  if (location.pathname.startsWith("/patient") && user.role !== "patient") {
    return <Navigate to="/posts" replace />;
  }

  if ((location.pathname.startsWith("/posts") || location.pathname.startsWith("/donations")) 
      && user.role !== "supporter") {
    return <Navigate to="/patient/posts" replace />;
  }

  return children;
}