import { useState } from 'react';
import DashboardIcon from '../assets/icons/DashboardIcon';
import EnquiryIcon from '../assets/icons/EnquiryIcon';
import LeadsIcon from '../assets/icons/LeadsIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import WalletIcon from '../assets/icons/WalletIcon';
import styles from '../styles/Dashboard.module.css';

// Logo from public folder
const logo = '/images/raglogo-1.png';

export default function Sidebar({ 
  activePage, 
  setActivePage, 
  isMobileOpen, 
  onClose, 
  isCollapsed
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { id: 'enquiry', label: 'Enquiry', Icon: EnquiryIcon },
    { id: 'leads', label: 'Leads', Icon: LeadsIcon },
  ];

  const handleMenuClick = (id) => {
    setActivePage(id);
    setSettingsOpen(false);
    setWalletOpen(false);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
    setWalletOpen(false);
  };

  const handleProfileClick = () => {
    setActivePage('profile');
    setSettingsOpen(false);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleChangePasswordClick = () => {
    setActivePage('changePassword');
    setSettingsOpen(false);
    setWalletOpen(false);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleWalletClick = () => {
    setWalletOpen(!walletOpen);
    setSettingsOpen(false);
  };

  const handleTransactionHistoryClick = () => {
    setActivePage('transactionHistory');
    setWalletOpen(false);
    setSettingsOpen(false);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const handleDebitWithdrawClick = () => {
    setActivePage('debitWithdraw');
    setWalletOpen(false);
    setSettingsOpen(false);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <aside 
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${
        isMobileOpen ? styles.sidebarMobileOpen : ''
      }`}
    >
      {/* Logo - Full Width */}
      <div className={styles.logoSection}>
        <img src={logo} alt="Right Agent Group" className={styles.logoImage} />
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`${styles.menuItem} ${
                isActive ? styles.menuItemActive : ''
              }`}
            >
              <span className={styles.menuIcon}>
                <item.Icon size={20} color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'} />
              </span>
              <span className={styles.menuLabel}>{item.label}</span>
            </button>
          );
        })}

        {/* Wallet with Submenu */}
        <div>
          <button
            onClick={handleWalletClick}
            className={`${styles.menuItem} ${walletOpen ? styles.menuItemActive : ''}`}
          >
            <span className={styles.menuIcon}>
              <WalletIcon size={20} color={walletOpen ? '#fff' : 'rgba(255,255,255,0.7)'} />
            </span>
            {!isCollapsed && <span className={styles.menuLabel}>Wallet</span>}
            {!isCollapsed && (
              <svg 
                style={{ 
                  transform: walletOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  marginLeft: 'auto',
                  flexShrink: 0
                }}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Submenu */}
          {walletOpen && !isCollapsed && (
            <div className={styles.submenu}>
              <button
                onClick={handleTransactionHistoryClick}
                className={`${styles.submenuItem} ${activePage === 'transactionHistory' ? styles.submenuItemActive : ''}`}
              >
                <svg className={styles.submenuIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 16l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Transaction History</span>
              </button>
              <button
                onClick={handleDebitWithdrawClick}
                className={`${styles.submenuItem} ${activePage === 'debitWithdraw' ? styles.submenuItemActive : ''}`}
              >
                <svg className={styles.submenuIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Debit Withdraw Requests</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings with Submenu */}
        <div>
          <button
            onClick={handleSettingsClick}
            className={`${styles.menuItem} ${settingsOpen ? styles.menuItemActive : ''}`}
          >
            <span className={styles.menuIcon}>
              <SettingsIcon size={20} color={settingsOpen ? '#fff' : 'rgba(255,255,255,0.7)'} />
            </span>
            {!isCollapsed && <span className={styles.menuLabel}>Settings</span>}
            {!isCollapsed && (
              <svg 
                style={{ 
                  transform: settingsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  marginLeft: 'auto',
                  flexShrink: 0
                }}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Submenu */}
          {settingsOpen && !isCollapsed && (
            <div className={styles.submenu}>
              <button
                onClick={handleProfileClick}
                className={`${styles.submenuItem} ${activePage === 'profile' ? styles.submenuItemActive : ''}`}
              >
                <svg className={styles.submenuIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Profile</span>
              </button>
              <button
                onClick={handleChangePasswordClick}
                className={`${styles.submenuItem} ${activePage === 'changePassword' ? styles.submenuItemActive : ''}`}
              >
                <svg className={styles.submenuIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Change Password</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
