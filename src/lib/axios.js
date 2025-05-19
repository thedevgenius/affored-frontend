import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
});

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/token/refresh/', {}, {
            withCredentials: true
        });
        const access = res.data.access;
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return access;
    } catch (err) {
        console.error("Token refresh failed", err);
        throw err;
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccess = await refreshToken();
                originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
                return api(originalRequest);
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
