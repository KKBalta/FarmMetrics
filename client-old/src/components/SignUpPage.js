import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css'; // Importing CSS for styling
import API from '../api/api'; // Import your API utility

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await API.post('/farmers/signup', {
                farmer_name: name,  // Using the Farmer_name field as specified
                email,
                password
            });
            console.log('Sign up successful:', response.data);
            // Redirect or additional actions after sign up
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : "Failed to sign up");
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSignUp}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <div className="link-container">
                <Link to="/login" className="login-link">Already have an account? Log in</Link>
            </div>
        </div>
    );
};

export default SignUpPage;
