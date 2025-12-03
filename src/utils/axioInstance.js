import axios from "axios";

// ✅ CORRECT BASE URL - /api included
const BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,  // ✅ CRITICAL for cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request interceptor (optional - for debugging)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor (for error handling)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error:', error.response?.status, error.message);
    
    // ✅ Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
