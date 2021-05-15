import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const axiosPlugin = {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance;
  },
};

export default axiosPlugin;

export { axiosInstance };
