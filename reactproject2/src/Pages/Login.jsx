import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/Pages/Login.css'; // Make sure this path is correct
import PropTypes from 'prop-types';


const LoginForm = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(username, password);
        
    };

    const authenticate = (username, password) => {
        fetch('https://ec2-54-176-5-13.us-west-1.compute.amazonaws.com/Accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid username or password');
                }
                setIsAuthenticated(true);
                navigate('/client'); // Navigate to the protected page
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (

        <div className="login-form"> {/* Make sure to add the correct class here */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
LoginForm.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginForm;
