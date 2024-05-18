import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import API from '../api/api'; // Import your API utility

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        try {
            const response = await API.post('/farmers/login', { email, password });
            const { token } = response.data; // Destructure only token from response
            localStorage.setItem('token', token); // Store the token in localStorage
            navigate('/dashboard'); // Navigate to the dashboard on successful login
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message || 'An unexpected error occurred.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="link-container">
                    <Link to="/signup" className="signup-link">Don't have an account? Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
