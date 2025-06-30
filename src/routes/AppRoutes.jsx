import React from 'react';
import { useAuth } from '../contexts';
import LoginPage from '../LoginPage';
import AdminDashboard from '../Admin/AdminDashboard';
import PatientDashboard from '../Patient/PatientDashboard';

const AppRoutes = () => {
  const { user, userRole, isAuthenticated, loading, logout } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // If no user is logged in, show login page
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Route based on user role
  switch (userRole) {
    case 'admin':
      return <AdminDashboard user={user} onLogout={logout} />;
    
    case 'patient':
      return <PatientDashboard user={user} onLogout={logout} />;
    
    default:
      return (
        <div className="App">
          <div className="error-container">
            <h1>Unknown User Role</h1>
            <p>The user role "{userRole}" is not recognized.</p>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      );
  }
};

export default AppRoutes;
