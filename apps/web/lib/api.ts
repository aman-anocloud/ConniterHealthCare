import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    timeout: 10000,
});

// Attach JWT token from localStorage on each request
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('conninter_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
