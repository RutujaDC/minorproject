import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const currentUser = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/Login" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
