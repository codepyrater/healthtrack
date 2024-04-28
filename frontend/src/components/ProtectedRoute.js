import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    // Check if auth.isAuthenticated is true, redirect if not
    return auth.isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
