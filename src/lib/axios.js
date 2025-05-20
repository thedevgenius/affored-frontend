// utils/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post("http://localhost:8000/refresh/", {}, {
                    withCredentials: true,
                });

                return api(originalRequest);
            } catch (refreshErr) {
                console.error("Refresh token expired or invalid.");
                // Optional: redirect to login
            }
        }

        return Promise.reject(err);
    }
);

export default api;
