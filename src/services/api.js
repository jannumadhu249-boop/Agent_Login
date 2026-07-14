/**
 * Base API Configuration
 * Centralized Axios instance with interceptors
 */

import axios from 'axios';

// Base URL from environment or fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://187.127.143.141:8000';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authentication token to all requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common response scenarios
 */
api.interceptors.response.use(
  (response) => {
    // Return data directly for successful responses
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
          sessionStorage.removeItem('authUser');
          window.location.href = '/';
          break;
          
        case 403:
          console.error('Forbidden: You don\'t have permission');
          break;
          
        case 404:
          console.error('Not Found: Resource doesn\'t exist');
          break;
          
        case 500:
          console.error('Server Error: Something went wrong');
          break;
          
        default:
          console.error('API Error:', data.message || 'Unknown error');
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response from server');
      return Promise.reject({
        status: false,
        message: 'Network error. Please check your connection.',
      });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({
        status: false,
        message: error.message,
      });
    }
  }
);

/**
 * Helper function to create FormData for file uploads
 */
export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach((key) => {
    const value = data[key];
    
    // Handle nested objects
    if (typeof value === 'object' && value !== null && !(value instanceof File)) {
      Object.keys(value).forEach((nestedKey) => {
        formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
      });
    } else {
      formData.append(key, value);
    }
  });
  
  return formData;
};

export default api;
