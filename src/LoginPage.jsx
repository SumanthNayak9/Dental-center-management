import React, { useState } from 'react';
import { useAuth, usePatientProfile } from './contexts';
import './App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { getPatientProfile } = usePatientProfile();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // Check for admin login
      if (email === 'admin@entnt.in' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          email: 'admin@entnt.in',
          name: 'Admin User',
          role: 'Admin'
        };
        login(adminUser, 'admin');
        setIsLoading(false);
        return;
      }

      // Check for patient login
      const patientProfile = getPatientProfile(email);
      if (patientProfile && patientProfile.password === password) {
        const patientUser = {
          id: patientProfile.id,
          email: patientProfile.email,
          name: patientProfile.name,
          role: 'Patient'
        };
        login(patientUser, 'patient');
        setIsLoading(false);
        return;
      }

      // Failed login
      setError('Invalid email or password');
      setIsLoading(false);
    }, 1000);
  };



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Dental Center Management</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2025 Dental Center Management System</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;