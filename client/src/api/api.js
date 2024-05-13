// src/api/api.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
    baseURL: 'http://localhost:3031', // Your API base URL
});

// Add auth token to every request if available
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Handle global errors
API.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized errors
            localStorage.removeItem('token'); // Optional: clear token if it's expired or invalid
            window.location = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default API;
