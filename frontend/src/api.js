import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,  // Required for cookies
});

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest._retry === undefined) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                await refreshClient.post('/auth/token/refresh/');
                // Retry original request
                return api(originalRequest);
            } catch (e) {
                // window.location.href = '/login/';
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);

export default api;