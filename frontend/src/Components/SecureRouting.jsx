// File: src/Routes/AppRoutes.js
import * as React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About';
import Login from '../Pages/Login';
import Client from '../Pages/Client';
import Mls from '../Pages/Mls';
import PropertyDetails from "../Pages/PropertyDetails";
import PropertyListingPage from "../Pages/PropertyListingPage";
import Property from '../Pages/Property';

function ProtectedRoute({ isAuthenticated, children }) {
    // Redirects unauthenticated users to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
    const routes = [
        { path: "/", element: <Home /> },
        { path: "/about/", element: <About /> },
        { path: "/mls/", element: <Mls /> },
        { path: "/properties/", element: <PropertyListingPage /> },
        { path: "/property/:id", element: <PropertyDetails /> },
        { path: "/login/", element: <Login setIsAuthenticated={setIsAuthenticated} /> },
        {
            path: "/client",
            element: (
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Client />
                </ProtectedRoute>
            ),
        },
        {
            path: "/propertydashboard",
            element: (
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Property />
                </ProtectedRoute>
            ),
        }
    ];

    // Use the routes array with useRoutes hook
    return useRoutes(routes);
}

export default AppRoutes;
