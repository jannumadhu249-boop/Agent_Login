import { useState } from 'react';
import { URLS } from '../url';
import ForgotPassword from './ForgotPassword';
import styles from '../styles/Login.module.css';

// Images from public folder
const logo = '/images/raglogo-1.png';

export default function Login({ onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!password.trim()) {
      setError('Password is required.');
      return false;
    }

    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(URLS.Login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email.trim(),
          password: password.trim(),
        }).toString(),
      });

      const text = await response.text();
      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = {};
      }

      if (!response.ok || (!result.success && !result.status)) {
        throw new Error(result.message || 'Login failed. Please try again.');
      }

      const storage = rememberDevice ? localStorage : sessionStorage;
      storage.setItem('authToken', result.token || '');
      storage.setItem('authUser', JSON.stringify(result.data || result.user || {}));

      setSuccess(result.message || 'Login successful.');

      if (typeof onLogin === 'function') {
        onLogin(result);
      }
    } catch (err) {
      setError(err.message || 'Unable to log in right now.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className={styles.leftTitle}>Welcome to Right Agent Group</h2>
          <p className={styles.leftDescription}>
            Empower your business with our comprehensive admin dashboard. Access real-time analytics,
            manage leads effectively, and make data-driven decisions. Your success journey starts here.
          </p>
          <div className={styles.leftFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📊</span>
              <span className={styles.featureText}>Real-time analytics & insights</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🎨</span>
              <span className={styles.featureText}>Beautiful & intuitive interface</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🚀</span>
              <span className={styles.featureText}>Boost productivity by 10x</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>💡</span>
              <span className={styles.featureText}>Smart automation features</span>
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
            <h1 className={styles.title}>Welcome Back!</h1>
            <p className={styles.subtitle}>Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your Email"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIconSvg} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className={styles.optionsRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Remember this device</span>
              </label>
              <a href="#" className={styles.forgotLink} onClick={(e) => {
                e.preventDefault();
                setShowForgotPassword(true);
              }}>Forgot Password?</a>
            </div>

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

            <button type="submit" className={styles.signInButton} disabled={isSubmitting}>
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <p className={styles.signupText}>
            Don't have an account? <button type="button" onClick={onSwitchToRegister} className={styles.signupLink}>Create Account</button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
}
