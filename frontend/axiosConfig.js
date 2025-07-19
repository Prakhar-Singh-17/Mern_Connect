import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const api = axios.create({
  baseURL: isLocal 
    ? "http://localhost:8080/user" 
    : "https://tradetrackerbackend-ja6g.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api as axios };
