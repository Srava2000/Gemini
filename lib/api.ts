// lib/api.ts
import axios from "axios";

// You can replace the baseURL if needed
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
