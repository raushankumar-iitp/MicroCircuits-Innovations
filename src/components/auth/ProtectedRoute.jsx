import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import InfiniteLogoPreloader from '../common/InfiniteLogoPreloader';

const ProtectedRoute = ({ children }) => {
    const { isAdmin: isAuthenticated, loading } = useAdmin();

    if (loading) {
        return null; // Global loader in App.jsx handles this now
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
