import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    // If AuthContext is still loading (verifying token), show nothing or a spinner
    // Note: AuthContext usually blocks app rendering, but this is a double safety.
    if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-2xl">Loading...</div>;

    // If not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If role is restricted and user doesn't match
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Or unauthorized page
    }

    return <Outlet />;
};

export default ProtectedRoute;
