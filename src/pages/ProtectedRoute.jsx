import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function ProtectedRoute({ children }) {
    const user = getUserFromToken();
    if (!user) return <Navigate to="/login" replace />;
        return children;
}
