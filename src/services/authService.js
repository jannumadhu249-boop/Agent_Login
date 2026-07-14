/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import api from './api';
import { URLS } from '../url';

/**
 * Agent Login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with token
 */
export const login = async (email, password) => {
  try {
    const response = await api.post(URLS.Login.replace(URLS.Base, ''), {
      email,
      password,
    });
    
    // Store token if login successful
    if (response.status && response.token) {
      localStorage.setItem('authToken', response.token);
      if (response.data) {
        localStorage.setItem('authUser', JSON.stringify(response.data));
      }
    }
    
    return response;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

/**
 * Agent Registration
 * @param {Object} registrationData - Registration form data
 * @returns {Promise} Registration response
 */
export const register = async (registrationData) => {
  try {
    const response = await api.post(URLS.Registration.replace(URLS.Base, ''), registrationData);
    return response;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

/**
 * Send Email OTP
 * @param {string} email - User email
 * @returns {Promise} OTP send response
 */
export const sendEmailOtp = async (email) => {
  try {
    const response = await api.post(URLS.SendEmailOtp.replace(URLS.Base, ''), {
      email,
    });
    return response;
  } catch (error) {
    console.error('Send Email OTP Error:', error);
    throw error;
  }
};

/**
 * Verify Email OTP
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @returns {Promise} OTP verification response
 */
export const verifyEmailOtp = async (email, otp) => {
  try {
    const response = await api.post(URLS.VerifyEmailOtp.replace(URLS.Base, ''), {
      email,
      otp,
    });
    return response;
  } catch (error) {
    console.error('Verify Email OTP Error:', error);
    throw error;
  }
};

/**
 * Send Mobile OTP
 * @param {string} mobileNo - User mobile number
 * @returns {Promise} OTP send response
 */
export const sendMobileOtp = async (mobileNo) => {
  try {
    const response = await api.post(URLS.SendMobileOtp.replace(URLS.Base, ''), {
      mobileNo,
    });
    return response;
  } catch (error) {
    console.error('Send Mobile OTP Error:', error);
    throw error;
  }
};

/**
 * Verify Mobile OTP
 * @param {string} mobileNo - User mobile number
 * @param {string} otp - OTP code
 * @returns {Promise} OTP verification response
 */
export const verifyMobileOtp = async (mobileNo, otp) => {
  try {
    const response = await api.post(URLS.VerifyMobileOtp.replace(URLS.Base, ''), {
      mobileNo,
      otp,
    });
    return response;
  } catch (error) {
    console.error('Verify Mobile OTP Error:', error);
    throw error;
  }
};

/**
 * Logout
 * Clears authentication data from storage
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('authUser');
};

/**
 * Get Current User
 * @returns {Object|null} Current user data
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Get Auth Token
 * @returns {string|null} Current auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Generate Forgot Password OTP
 * @param {string} email - User email
 * @returns {Promise} OTP generation response with userId
 */
export const generateForgotPasswordOtp = async (email) => {
  try {
    const response = await api.post(URLS.GenerateForgotPasswordOtp.replace(URLS.Base, ''), {
      email,
    });
    return response;
  } catch (error) {
    console.error('Generate Forgot Password OTP Error:', error);
    throw error;
  }
};

/**
 * Verify Forgot Password OTP
 * @param {string} userId - User ID from OTP generation
 * @param {string} otp - OTP code
 * @returns {Promise} OTP verification response
 */
export const verifyForgotPasswordOtp = async (userId, otp) => {
  try {
    const response = await api.post(URLS.VerifyForgotPasswordOtp.replace(URLS.Base, ''), {
      userId,
      otp,
    });
    return response;
  } catch (error) {
    console.error('Verify Forgot Password OTP Error:', error);
    throw error;
  }
};

/**
 * Reset Password
 * @param {string} userId - User ID
 * @param {string} newPassword - New password
 * @param {string} confirmPassword - Confirm password
 * @returns {Promise} Password reset response
 */
export const resetPassword = async (userId, newPassword, confirmPassword) => {
  try {
    const response = await api.post(URLS.ResetPassword.replace(URLS.Base, ''), {
      userId,
      newPassword,
      confirmPassword,
    });
    return response;
  } catch (error) {
    console.error('Reset Password Error:', error);
    throw error;
  }
};
