/**
 * Forgot Password Service
 * Handles password reset related API calls
 */

import api from './api';
import { URLS } from '../url';

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
