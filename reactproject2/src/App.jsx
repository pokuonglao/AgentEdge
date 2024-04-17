import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav.jsx';
import App2 from './App2.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
 
    return (
        <Router>
            <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <App2 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </Router>
    );
}

export default App;
