// PrivateRoute.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} element={isAuthenticated ? <Component /> : <Navigate to="/login" />} />

        
    );
};

// Define prop types for PrivateRoute component
PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
