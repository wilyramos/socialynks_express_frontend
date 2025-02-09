import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// interceptor to add the token to the request

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token_milink_auth');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
// Si hay un token en el localStorage, se agrega al header de la petición.

export default api;