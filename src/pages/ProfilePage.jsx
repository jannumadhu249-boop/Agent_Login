import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Page.module.css';
import { getProfile, updateProfile } from '../services/profileService';
import { URLS } from '../url';

export default function ProfilePage({ onProfileUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadharNumber: '',
    panNumber: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await getProfile();
      
      if (response.status) {
        const profile = response.data;
        
        // Map API response to form data
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.mobileNo || '',
          aadharNumber: profile.aadharNo || '',
          panNumber: profile.panNo || '',
          gstNumber: profile.gstNumber || '',
          address: profile.communicationAddress?.address || '',
          city: profile.communicationAddress?.city || '',
          state: profile.communicationAddress?.state || '',
          pinCode: profile.communicationAddress?.pincode || '',
        });

        // Set profile image if available
        if (profile.profileImage) {
          // Check if profileImage is already a full URL
          const imageUrl = profile.profileImage.startsWith('http') 
            ? profile.profileImage 
            : URLS.ImageUrl + profile.profileImage;
          // Add cache buster to force reload
          setImagePreview(imageUrl + '?t=' + new Date().getTime());
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      // Keep default data if API fails
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Call update profile API
      const response = await updateProfile(formData, profileImage);
      
      if (response.status) {
        alert('Profile updated successfully!');
        // Refresh profile data
        await fetchProfileData();
        // Clear the selected file
        setProfileImage(null);
        // Trigger Dashboard to refresh user profile
        if (onProfileUpdate) {
          onProfileUpdate();
        }
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error: Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.headerTitle}>Profile Settings</h3>
        </div>
        <button 
          className={styles.addButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div style={{ 
            padding: '32px', 
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div 
              onClick={handleImageClick}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '20px',
                background: imagePreview ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
              ) : (
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={handleImageClick}
              className={styles.addButton}
              style={{ margin: 0 }}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="8.5" r="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Photo
            </button>
          </div>

          {/* Form Fields */}
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your phone"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Aadhar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter Aadhar number"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter PAN number"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>GST Number</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter GST number"
                />
              </div>

              <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your address"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter city"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter state"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter pin code"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
