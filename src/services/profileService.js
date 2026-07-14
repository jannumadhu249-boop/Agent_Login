/**
 * Profile Service
 * Handles all profile-related API calls
 */

import api, { createFormData } from './api';
import { URLS } from '../url';

/**
 * Get Agent Profile
 * @returns {Promise} Profile data
 */
export const getProfile = async () => {
  try {
    const response = await api.post(URLS.GetProfile.replace(URLS.Base, ''));
    return response;
  } catch (error) {
    console.error('Get Profile Error:', error);
    throw error;
  }
};

/**
 * Update Agent Profile
 * @param {Object} profileData - Profile data to update
 * @param {File} imageFile - Profile image file (optional)
 * @returns {Promise} Updated profile data
 */
export const updateProfile = async (profileData, imageFile = null) => {
  try {
    // Prepare data for FormData
    const data = {
      name: profileData.name,
      mobileNo: profileData.mobileNo || profileData.phone,
      gstNumber: profileData.gstNumber,
      communicationAddress: {
        address: profileData.communicationAddress?.address || profileData.address,
        city: profileData.communicationAddress?.city || profileData.city,
        state: profileData.communicationAddress?.state || profileData.state,
        pincode: profileData.communicationAddress?.pincode || profileData.pinCode,
      },
      officeAddress: {
        address: profileData.officeAddress?.address || profileData.address,
        city: profileData.officeAddress?.city || profileData.city,
        state: profileData.officeAddress?.state || profileData.state,
        pincode: profileData.officeAddress?.pincode || profileData.pinCode,
      },
    };

    // Create FormData
    const formData = createFormData(data);

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Send PUT request with FormData
    const response = await api.put(URLS.UpdateProfile.replace(URLS.Base, ''), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Update Profile Error:', error);
    throw error;
  }
};
