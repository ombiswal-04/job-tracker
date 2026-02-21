import axios from 'axios';

// Centralized Axios instance
// Base URL is read from .env file (VITE_API_URL)
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT Bearer token to every request automatically
API.interceptors.request.use((config) => {
    const stored = localStorage.getItem('user');
    if (stored) {
        const { token } = JSON.parse(stored);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default API;
