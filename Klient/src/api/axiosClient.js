import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export const setupInterceptors = (setLoading) => {
  apiClient.interceptors.request.use((config) => {
    setLoading(true); 
    return config;
  }, (error) => {
    setLoading(false);
    return Promise.reject(error);
  });

  apiClient.interceptors.response.use((response) => {
    setLoading(false); 
    return response;
  }, (error) => {
    setLoading(false); 
    return Promise.reject(error);
  });
};

export default apiClient;