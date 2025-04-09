import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
