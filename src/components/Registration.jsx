import { useState } from 'react';
import { URLS } from '../url';
import styles from '../styles/Login.module.css';

// Images from public folder
const logo = '/images/raglogo-1.png';

export default function Registration({ onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Step 1: Basic Details
  const [basicDetails, setBasicDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Step 2: Address Details
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  // Step 3: Tax Commission Details
  const [taxDetails, setTaxDetails] = useState({
    panNumber: '',
    aadharNumber: '',
    gstNumber: '',
  });

  const request = async (url, payload, options = {}) => {
    const contentType = options.contentType || 'json';
    const headers = {};
    let body = payload;

    if (contentType === 'form') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = new URLSearchParams(payload).toString();
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(payload);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const text = await response.text();
    let result = {};

    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = {};
    }

    const isSuccess = response.ok || result?.success === true;

    if (!isSuccess) {
      throw new Error(result?.message || result?.error || 'Request failed. Please try again.');
    }

    return result;
  };

  const handleBasicChange = (e) => {
    setBasicDetails({ ...basicDetails, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const handleTaxChange = (e) => {
    setTaxDetails({ ...taxDetails, [e.target.name]: e.target.value });
  };

  const handleProceedStep1 = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!emailVerified) {
      setError('Please verify your email first!');
      return;
    }
    if (!phoneVerified) {
      setError('Please verify your phone number first!');
      return;
    }
    if (!basicDetails.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (basicDetails.password !== basicDetails.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setStep(2);
  };

  const handleSendEmailOtp = async () => {
    if (!basicDetails.email.trim()) {
      setError('Please enter your email address!');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await request(URLS.SendEmailOtp, { email: basicDetails.email.trim() }, { contentType: 'form' });
      setSuccess('OTP sent to your email.');
      setEmailOtpSent(true);
    } catch (err) {
      setError(err.message || 'Unable to send email OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp.trim()) {
      setError('Please enter the OTP!');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await request(URLS.VerifyEmailOtp, {
        email: basicDetails.email.trim(),
        otp: emailOtp.trim(),
      }, { contentType: 'form' });
      setSuccess('Email verified successfully!');
      setEmailVerified(true);
    } catch (err) {
      setError(err.message || 'Invalid email OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendPhoneOtp = async () => {
    if (!basicDetails.phone.trim()) {
      setError('Please enter your phone number!');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await request(URLS.SendMobileOtp, { mobileNo: basicDetails.phone.trim() }, { contentType: 'form' });
      setSuccess('OTP sent to your phone.');
      setPhoneOtpSent(true);
    } catch (err) {
      setError(err.message || 'Unable to send mobile OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!phoneOtp.trim()) {
      setError('Please enter the OTP!');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await request(URLS.VerifyMobileOtp, {
        mobileNo: basicDetails.phone.trim(),
        otp: phoneOtp.trim(),
      }, { contentType: 'form' });
      setSuccess('Phone verified successfully!');
      setPhoneVerified(true);
    } catch (err) {
      setError(err.message || 'Invalid mobile OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedStep2 = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!addressDetails.address.trim() || !addressDetails.city.trim() || !addressDetails.state.trim() || !addressDetails.pinCode.trim()) {
      setError('Please fill in your complete address details.');
      return;
    }

    setStep(3);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!basicDetails.name.trim() || !basicDetails.email.trim() || !basicDetails.phone.trim()) {
      setError('Please fill in your basic details.');
      return;
    }

    if (!taxDetails.panNumber.trim() || !taxDetails.aadharNumber.trim() || !taxDetails.gstNumber.trim()) {
      setError('Please fill in your PAN, Aadhar, and GST details.');
      return;
    }

    if (basicDetails.password !== basicDetails.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsSubmitting(true);

    try {
      await request(URLS.Registration, {
        name: basicDetails.name.trim(),
        email: basicDetails.email.trim(),
        mobileNo: basicDetails.phone.trim(),
        password: basicDetails.password,
        confirmPassword: basicDetails.confirmPassword,
        panNo: taxDetails.panNumber.trim(),
        aadharNo: taxDetails.aadharNumber.trim(),
        gstNumber: taxDetails.gstNumber.trim(),
        communicationAddress: {
          address: addressDetails.address.trim(),
          state: addressDetails.state.trim(),
          city: addressDetails.city.trim(),
          pincode: addressDetails.pinCode.trim(),
        },
        officeAddress: {
          address: addressDetails.address.trim(),
          state: addressDetails.state.trim(),
          city: addressDetails.city.trim(),
          pincode: addressDetails.pinCode.trim(),
        },
      });

      setSuccess('Account created successfully!');
      if (typeof onSwitchToLogin === 'function') {
        onSwitchToLogin();
      }
    } catch (err) {
      setError(err.message || 'Unable to create account right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError('');
    setSuccess('');
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        {/* Logo Image - Full Width Top */}
        <div className={styles.logoTopFull}>
          <img src={logo} alt="Right Agent Group" className={styles.logoImageFull} />
        </div>

        {/* Content */}
        <div className={styles.leftContent}>
          <h2 className={styles.leftTitle}>Start Your Journey</h2>
          <p className={styles.leftDescription}>
            Join thousands of professionals who trust Right Agent Group to manage their business efficiently. 
            Create your account today and unlock powerful features designed to streamline your workflow.
          </p>
          <div className={styles.leftFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>✨</span>
              <span className={styles.featureText}>Powerful dashboard & analytics</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🔒</span>
              <span className={styles.featureText}>Secure data encryption</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>⚡</span>
              <span className={styles.featureText}>Lightning-fast performance</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🎯</span>
              <span className={styles.featureText}>Smart lead management</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.title}>Create Your Account</h1>
            <p className={styles.subtitle}>Step {step} of 3 - {step === 1 ? 'Basic Details' : step === 2 ? 'Address Details' : 'Tax Commission Details'}</p>
          </div>

          {/* Progress Steps */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <div style={{ 
              flex: 1, 
              height: '4px', 
              background: step >= 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }} />
            <div style={{ 
              flex: 1, 
              height: '4px', 
              background: step >= 2 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }} />
            <div style={{ 
              flex: 1, 
              height: '4px', 
              background: step >= 3 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }} />
          </div>

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleProceedStep1} className={styles.form}>
              {error ? (
                <div className={`${styles.message} ${styles.messageError}`} role="alert">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className={`${styles.message} ${styles.messageSuccess}`} role="status">
                  {success}
                </div>
              ) : null}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={basicDetails.name}
                    onChange={handleBasicChange}
                    className={styles.input}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={basicDetails.email}
                    onChange={handleBasicChange}
                    className={styles.input}
                    placeholder="Enter your email"
                    disabled={emailVerified}
                    style={{ paddingRight: '100px' }}
                  />
                  {!emailVerified && (
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Send OTP
                    </button>
                  )}
                  {emailVerified && (
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#10b981',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Email OTP Input */}
              {emailOtpSent && !emailVerified && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email OTP</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="text"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className={styles.input}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      style={{ paddingRight: '80px' }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    value={basicDetails.phone}
                    onChange={handleBasicChange}
                    className={styles.input}
                    placeholder="Enter your phone number"
                    disabled={phoneVerified}
                    style={{ paddingRight: '100px' }}
                  />
                  {!phoneVerified && (
                    <button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Send OTP
                    </button>
                  )}
                  {phoneVerified && (
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#10b981',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Phone OTP Input */}
              {phoneOtpSent && !phoneVerified && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Phone OTP</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="text"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      className={styles.input}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      style={{ paddingRight: '80px' }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyPhoneOtp}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    value={basicDetails.password}
                    onChange={handleBasicChange}
                    className={styles.input}
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={basicDetails.confirmPassword}
                    onChange={handleBasicChange}
                    className={styles.input}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button type="submit" className={styles.signInButton} disabled={isSubmitting}>
                <span>Proceed to Next Step</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          )}

          {/* Step 2: Address Details */}
          {step === 2 && (
            <form onSubmit={handleProceedStep2} className={styles.form}>
              {error ? (
                <div className={`${styles.message} ${styles.messageError}`} role="alert">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className={`${styles.message} ${styles.messageSuccess}`} role="status">
                  {success}
                </div>
              ) : null}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Address</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="address"
                    value={addressDetails.address}
                    onChange={handleAddressChange}
                    className={styles.input}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>City</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="city"
                    value={addressDetails.city}
                    onChange={handleAddressChange}
                    className={styles.input}
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>State</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="state"
                    value={addressDetails.state}
                    onChange={handleAddressChange}
                    className={styles.input}
                    placeholder="Enter your state"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Pin Code</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="pinCode"
                    value={addressDetails.pinCode}
                    onChange={handleAddressChange}
                    className={styles.input}
                    placeholder="Enter your pin code"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleBack} className={styles.backButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Back</span>
                </button>
                <button type="submit" className={styles.signInButton} style={{ flex: 1 }}>
                  <span>Proceed to Next Step</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Tax Commission Details */}
          {step === 3 && (
            <form onSubmit={handleCreateAccount} className={styles.form}>
              {error ? (
                <div className={`${styles.message} ${styles.messageError}`} role="alert">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className={`${styles.message} ${styles.messageSuccess}`} role="status">
                  {success}
                </div>
              ) : null}
              <div className={styles.inputGroup}>
                <label className={styles.label}>PAN Number</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="panNumber"
                    value={taxDetails.panNumber}
                    onChange={handleTaxChange}
                    className={styles.input}
                    placeholder="Enter your PAN number"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Aadhar Number</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={taxDetails.aadharNumber}
                    onChange={handleTaxChange}
                    className={styles.input}
                    placeholder="Enter your Aadhar number"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>GST Number</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    name="gstNumber"
                    value={taxDetails.gstNumber}
                    onChange={handleTaxChange}
                    className={styles.input}
                    placeholder="Enter your GST number"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleBack} className={styles.backButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Back</span>
                </button>
                <button type="submit" className={styles.signInButton} style={{ flex: 1 }}>
                  <span>Create Account</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          )}

          <p className={styles.signupText}>
            Already have an account? <button type="button" onClick={onSwitchToLogin} className={styles.signupLink}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
