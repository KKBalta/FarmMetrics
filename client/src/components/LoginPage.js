import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        console.log("Login attempt started"); // Check if this logs when you click the button
        event.preventDefault();
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
            // More robust error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Login error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Login error: No response received', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Login error:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
