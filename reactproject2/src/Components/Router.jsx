import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav.jsx';
import SecureRouting from './SecureRouting.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
 
    return (
        <Router>
            <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <SecureRouting isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
}

export default App;
