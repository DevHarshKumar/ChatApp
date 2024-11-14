import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000, // Adjusted timeout for more flexibility
  headers: { 'Content-Type': 'application/json' }, // Default header
});

export default axiosInstance;
