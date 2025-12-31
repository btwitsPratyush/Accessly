import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GuestRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    // If logged in, redirect to dashboard based on role
    if (user) {
        return <Navigate to={user.role === 'admin' ? '/admin/users' : '/profile'} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
