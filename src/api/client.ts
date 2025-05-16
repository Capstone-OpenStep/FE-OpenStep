import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const excludedPaths = [
      "/github/auth/callback",
      "/repo/trending",
      "/issues/trending",
    ];

    const isExcluded = excludedPaths.some(path =>
      config.url?.startsWith(path)
    );

    if (!isExcluded) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;