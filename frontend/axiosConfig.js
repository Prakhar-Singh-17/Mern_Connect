import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const api = axios.create({
  baseURL: isLocal 
    ? import.meta.env.BACKEND_URL_LOCAL 
    : import.meta.env.BACKEND_URL_PROD,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api as axios };
