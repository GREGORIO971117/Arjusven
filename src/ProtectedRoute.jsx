import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, userRole, allowedRoles, children }) => {
    
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/Home" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;