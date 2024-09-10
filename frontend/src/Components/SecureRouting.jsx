import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About.jsx';
import Login from '../Pages/Login.jsx';
import Client from '../Pages/Client.jsx';
import Mls from '../Pages/Mls.jsx';
import PropertyDetails from "../Pages/PropertyDetails.jsx";
import PropertyListingPage from "../Pages/PropertyListingPage.jsx";
import Property from '../Pages/Property.jsx';

function Route({ isAuthenticated, setIsAuthenticated }) {
    const routes = [
        { path: "/", element: <Home /> },
        { path: "/about/", element: <About /> },
        { path: "/mls/", element: <Mls /> },
        { path: "/properties/", element: <PropertyListingPage /> },
        { path: "/property/:id", element: <PropertyDetails /> },
        { path: "/login/", element: <Login setIsAuthenticated={setIsAuthenticated} /> },
    ];

    // If user is authenticated, add the Client route
    if (isAuthenticated) {
        routes.push({ path: "/client", element: <Client /> });
        routes.push({ path: "/propertydashboard", element: <Property /> });
    }

    // Use the routes array with useRoutes hook
    const element = useRoutes(routes);
    return element;
}

export default Route;
