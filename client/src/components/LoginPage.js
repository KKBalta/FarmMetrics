import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New state for storing the error message
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear previous error messages
        try {
            const response = await axios.post('http://localhost:3031/farmers/login', {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Login successful:', token);
            navigate('/dashboard');
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";
            if (error.response) {
                // The server responded with a problem
                errorMessage = error.response.data.message || 'Invalid login credentials';
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "No response from server. Check your network connection.";
            } else {
                // Something else caused the error
                errorMessage = error.message;
            }
            setErrorMessage(errorMessage); // Set the error message in state
        }
    };
    
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
            </form>
        </div>
    );
    
};

export default LoginPage;
