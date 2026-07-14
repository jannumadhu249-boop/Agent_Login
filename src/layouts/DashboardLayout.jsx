import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MenuIcon from '../assets/icons/MenuIcon';
import styles from '../styles/Dashboard.module.css';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUser');
    
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className={`${styles.overlay} ${styles.overlayVisible}`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Sidebar Toggle for Mobile */}
            <button
              className={styles.mobileMenuToggle}
              onClick={handleMobileSidebarToggle}
              title="Open Menu"
            >
              <MenuIcon size={20} color="#64748b" />
            </button>
            
            {/* Sidebar Collapse for Desktop */}
            <button
              className={styles.desktopCollapseToggle}
              onClick={handleSidebarCollapse}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <MenuIcon size={20} color="#64748b" />
            </button>
          </div>

          {/* User Section with Dropdown */}
          <div className={styles.userSection} onClick={handleDropdownToggle}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Admin User</div>
              <div className={styles.userRole}>Administrator</div>
            </div>

            {/* Dropdown Menu - Only Logout */}
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  <span className={styles.dropdownItemIcon}>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content - Outlet renders child routes */}
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
