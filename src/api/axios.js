// src/api/axios.js
import axios from 'axios';
import { globalAuthStore } from '@/stores/useAuth.js'; // Import your auth store

const BASE_URL = 'https://admin-dashboard-back-end-1.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// Add a request interceptor to axiosPrivate
axiosPrivate.interceptors.request.use(
    (config) => {
        // Get the access token from your global auth store
        const accessToken = globalAuthStore.auth.value?.accessToken;

        // If the Authorization header is not already set and a token exists, add it
        if (accessToken && !config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);