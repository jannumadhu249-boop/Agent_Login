import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import Registration from '../components/Registration';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import EnquiryPage from '../pages/EnquiryPage';
import LeadsPage from '../pages/LeadsPage';
import ProfilePage from '../pages/ProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import TransactionHistoryPage from '../pages/TransactionHistoryPage';
import DebitWithdrawPage from '../pages/DebitWithdrawPage';
import CreateLead from '../pages/CreateLead';
import EditLeadPage from '../pages/EditLeadPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Wrapper (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Router Configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Redirect root to login
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      
      // Public Routes (Login, Register)
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Registration />
          </PublicRoute>
        ),
      },
      
      // Protected Routes (Dashboard)
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'enquiry',
            element: <EnquiryPage />,
          },
          {
            path: 'leads',
            element: <LeadsPage />,
          },
          {
            path: 'create-lead',
            element: <CreateLead />,
          },
          {
            path: 'edit-lead',
            element: <EditLeadPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'change-password',
            element: <ChangePasswordPage />,
          },
          {
            path: 'wallet',
            children: [
              {
                path: 'transactions',
                element: <TransactionHistoryPage />,
              },
              {
                path: 'withdrawals',
                element: <DebitWithdrawPage />,
              },
            ],
          },
        ],
      },
      
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

export default router;
