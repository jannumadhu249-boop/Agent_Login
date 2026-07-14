import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { 
  generateForgotPasswordOtp, 
  verifyForgotPasswordOtp, 
  resetPassword 
} from '../services/authService';

export default function ForgotPassword({ onClose }) {
  const [resetStep, setResetStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setResetStep(1);
    setForgotEmail('');
    setResetOtp('');
    setNewPassword('');
    setConfirmNewPassword('');
    setUserId('');
    setError('');
    setLoading(false);
    onClose();
  };

  const handleSendOtp = async () => {
    if (!forgotEmail) {
      setError('Please enter your email!');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await generateForgotPasswordOtp(forgotEmail);
      
      if (response.status) {
        // Store userId for next steps
        setUserId(response.userId || response.data?.userId);
        alert('OTP sent to your email: ' + forgotEmail);
        setResetStep(2);
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!resetOtp || resetOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP!');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await verifyForgotPasswordOtp(userId, resetOtp);
      
      if (response.status) {
        alert('OTP verified successfully!');
        setResetStep(3);
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      setError('Please fill in both password fields!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await resetPassword(userId, newPassword, confirmNewPassword);
      
      if (response.status) {
        alert('Password reset successful! You can now login with your new password.');
        handleClose();
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (err) {
      setError(err.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#64748b',
            lineHeight: 1
          }}
        >
          ×
        </button>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '8px'
        }}>
          Reset Password
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#64748b',
          marginBottom: '32px'
        }}>
          {resetStep === 1 && 'Enter your email to receive a reset code'}
          {resetStep === 2 && 'Enter the OTP sent to your email'}
          {resetStep === 3 && 'Create your new password'}
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            color: '#dc2626',
            fontSize: '13px',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Email */}
        {resetStep === 1 && (
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
            </div>
            <button
              onClick={handleSendOtp}
              className={styles.signInButton}
              style={{ width: '100%', marginTop: '24px' }}
              disabled={loading}
            >
              <span>{loading ? 'Sending...' : 'Send OTP'}</span>
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {resetStep === 2 && (
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter OTP</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  value={resetOtp}
                  onChange={(e) => {
                    setResetOtp(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  disabled={loading}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setResetStep(1);
                  setError('');
                }}
                className={styles.backButton}
                style={{ flex: 1 }}
                disabled={loading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </button>
              <button
                onClick={handleVerifyOtp}
                className={styles.signInButton}
                style={{ flex: 1 }}
                disabled={loading}
              >
                <span>{loading ? 'Verifying...' : 'Verify OTP'}</span>
                {!loading && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {resetStep === 3 && (
          <div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>
            </div>
            <div className={styles.inputGroup} style={{ marginTop: '20px' }}>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    setError('');
                  }}
                  className={styles.input}
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setResetStep(2);
                  setError('');
                }}
                className={styles.backButton}
                style={{ flex: 1 }}
                disabled={loading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back</span>
              </button>
              <button
                onClick={handleResetPassword}
                className={styles.signInButton}
                style={{ flex: 1 }}
                disabled={loading}
              >
                <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
                {!loading && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
