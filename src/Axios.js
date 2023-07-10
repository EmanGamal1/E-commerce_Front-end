import axios from 'axios';
// For Website
const axiosInstance = axios.create({baseURL:'http://e-commerce.nader-mo.tech/'});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // For Dashboard
  const axiosDashboard = axios.create({baseURL:'http://e-commerce.nader-mo.tech/'});
  axiosDashboard.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem("admin");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  });
  
export {axiosInstance, axiosDashboard};