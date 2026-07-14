import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardPage from './DashboardPage';
import EnquiryPage from './EnquiryPage';
import LeadsPage from './LeadsPage';
import ProfilePage from './ProfilePage';
import ChangePasswordPage from './ChangePasswordPage';
import TransactionHistoryPage from './TransactionHistoryPage';
import DebitWithdrawPage from './DebitWithdrawPage';
import MenuIcon from '../assets/icons/MenuIcon';
import { getCurrentUser } from '../services/authService';
import { getProfile } from '../services/profileService';
import { URLS } from '../url';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard({ onLogout, authData }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

  // Fetch user profile on mount and when profile changes
  useEffect(() => {
    fetchUserProfile();
  }, [profileRefreshKey]);

  const fetchUserProfile = async () => {
    try {
      // Try to get from API first
      const response = await getProfile();
      if (response.status && response.data) {
        setUserProfile(response.data);
      }
    } catch (err) {
      // Fallback to stored user data
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUserProfile(storedUser);
      } else if (authData) {
        setUserProfile(authData);
      }
    }
  };

  // Function to trigger profile refresh
  const refreshUserProfile = () => {
    setProfileRefreshKey(prev => prev + 1);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    onLogout();
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
      />

      {isMobileSidebarOpen && (
        <div
          className={`${styles.overlay} ${styles.overlayVisible}`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.mobileMenuToggle}
              onClick={handleMobileSidebarToggle}
              title="Open Menu"
            >
              <MenuIcon size={20} color="#64748b" />
            </button>

            <button
              className={styles.desktopCollapseToggle}
              onClick={handleSidebarCollapse}
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <MenuIcon size={20} color="#64748b" />
            </button>
          </div>

          <div className={styles.userSection} onClick={handleDropdownToggle}>
            {userProfile?.profileImage ? (
              <img 
                src={URLS.ImageUrl + userProfile.profileImage + '?t=' + new Date().getTime()} 
                alt="Profile" 
                className={styles.avatar}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div className={styles.avatar}>👤</div>
            )}
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {userProfile?.name || 'Admin User'}
              </div>
              <div className={styles.userRole}>Administrator</div>
            </div>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={handleLogoutClick}
                >
                  <span className={styles.dropdownItemIcon}>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <div className={styles.pageContent}>
          {activePage === 'dashboard' && (
            <DashboardPage
              onEnquiryViewAll={() => setActivePage('enquiry')}
              onLeadsViewAll={() => setActivePage('leads')}
            />
          )}
          {activePage === 'enquiry' && <EnquiryPage />}
          {activePage === 'leads' && <LeadsPage />}
          {activePage === 'profile' && <ProfilePage onProfileUpdate={refreshUserProfile} />}
          {activePage === 'changePassword' && <ChangePasswordPage />}
          {activePage === 'transactionHistory' && <TransactionHistoryPage />}
          {activePage === 'debitWithdraw' && <DebitWithdrawPage />}
        </div>
      </main>
    </div>
  );
}
