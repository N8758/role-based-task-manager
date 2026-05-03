import axios from 'axios';

const API = axios.create({
  baseURL: 'https://role-based-task-manager-uinl.onrender.com/api',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized - token missing or invalid");
    }
    return Promise.reject(err);
  }
);

export default API;
