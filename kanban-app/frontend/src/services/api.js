import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// 🔹 Interceptor de Peticiones: Adjunta el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recuperamos el token guardado por el slice
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Interceptor de Respuestas: Maneja errores globales (como token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el servidor dice que no estamos autorizados, limpiamos el local
      localStorage.removeItem('token');
      // Podrías redirigir al login aquí si fuera necesario
    }
    return Promise.reject(error);
  }
);

export default api;