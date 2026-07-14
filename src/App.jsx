import { useState } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [authData, setAuthData] = useState(null);

  const handleLogin = (loginResponse) => {
    setAuthData(loginResponse || null);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setAuthData(null);
    setCurrentView('login');
  };

  if (currentView === 'register') {
    return <Registration onSwitchToLogin={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return <Login onSwitchToRegister={() => setCurrentView('register')} onLogin={handleLogin} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={handleLogout} authData={authData} />;
  }

  return null;
}
