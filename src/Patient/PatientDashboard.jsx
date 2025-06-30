import React, { useState } from 'react';
import { useAuth, usePatientProfile } from '../contexts';
import '../Admin/AdminDashboard.css';

const PatientDashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  
  const { getPatientProfile, updatePatientProfile } = usePatientProfile();
  
  // Get patient data based on logged-in user
  const patientData = getPatientProfile(user.email);
  
  // Helper functions for profile editing
  const handleEditStart = () => {
    setEditedProfile({
      name: patientData.name,
      phone: patientData.phone,
      address: patientData.address,
      emergencyContact: patientData.emergencyContact,
      allergies: patientData.allergies.join(', ')
    });
    setIsEditing(true);
  };

  const handleEditSave = () => {
    // Update the patient profile using context
    const updatedProfile = {
      ...patientData,
      name: editedProfile.name,
      phone: editedProfile.phone,
      address: editedProfile.address,
      emergencyContact: editedProfile.emergencyContact,
      allergies: editedProfile.allergies.split(',').map(item => item.trim())
    };
    
    updatePatientProfile(user.email, updatedProfile);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  if (!patientData) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <h1>Patient Profile Not Found</h1>
          <p>Unable to find patient data for {user.email}</p>
          <button onClick={onLogout} className="logout-button">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const renderAppointments = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setCurrentView('dashboard')} className="back-btn">
              ← Back
            </button>
            <h1>My Appointments</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="appointments-section">
          <h2>My Appointments</h2>
          <div className="appointments-list">
            {patientData.appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h4>{appointment.treatment}</h4>
                  <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Doctor:</strong> {appointment.doctor}</p>
                  <p><strong>Notes:</strong> {appointment.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setCurrentView('dashboard')} className="back-btn">
              ← Back
            </button>
            <h1>Medical History</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="patients-section">
          <h2>Medical History</h2>
          <div className="patients-grid">
            {patientData.medicalHistory.map(record => (
              <div key={record.id} className="patient-card">
                <div className="patient-info">
                  <div className="patient-name">{record.treatment}</div>
                  <div className="patient-stats">Date: {record.date}</div>
                  <div className="patient-stats">Doctor: {record.doctor}</div>
                  <div className="patient-incidents">Notes: {record.notes}</div>
                  <div className="patient-stats">Prescription: {record.prescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const renderTreatmentPlans = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setCurrentView('dashboard')} className="back-btn">
              ← Back
            </button>
            <h1>Treatment Plans</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="patients-section">
          <h2>Treatment Plans</h2>
          <div className="patients-grid">
            {patientData.treatmentPlans.map(plan => (
              <div key={plan.id} className="patient-card">
                <div className="patient-info">
                  <div className="patient-name">{plan.title}</div>
                  <div className="patient-stats">Duration: {plan.startDate} to {plan.endDate}</div>
                  <div className="patient-stats">Doctor: {plan.doctor}</div>
                  <div className="patient-stats">Treatments: {plan.treatments.join(', ')}</div>
                  <div className="patient-incidents">Progress: {plan.progress}% Complete</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const renderBilling = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setCurrentView('dashboard')} className="back-btn">
              ← Back
            </button>
            <h1>Billing & Payments</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="appointments-section">
          <h2>Billing & Payments</h2>
          <div className="appointments-list">
            {patientData.bills.map(bill => (
              <div key={bill.id} className="appointment-card">
                <div className="appointment-header">
                  <h4>{bill.treatment}</h4>
                  <span className={`status-badge ${bill.status.toLowerCase()}`}>
                    {bill.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p><strong>Date:</strong> {bill.date}</p>
                  <p><strong>Total Amount:</strong> ₹{bill.amount.toFixed(2)}</p>
                  <p><strong>Insurance Covered:</strong> ₹{bill.insurance.toFixed(2)}</p>
                  <p><strong>Patient Due:</strong> ₹{bill.patientDue.toFixed(2)}</p>
                  <p><strong>Due Date:</strong> {bill.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const renderProfile = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => setCurrentView('dashboard')} className="back-btn">
              ← Back
            </button>
            <h1>My Profile</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-title">
              <h2>Personal Information</h2>
              <p>Manage your personal details and contact information</p>
            </div>
            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEditStart}>
                  ✏️ Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleEditSave}>
                    ✓ Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleEditCancel}>
                    ✕ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="profile-content">
            <div className="profile-section">
              <h3>Basic Information</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="profile-input"
                    />
                  ) : (
                    <div className="profile-value">{patientData.name}</div>
                  )}
                </div>
                
                <div className="profile-field">
                  <label>Email Address</label>
                  <div className="profile-value readonly">{patientData.email}</div>
                  <small className="field-note">Email cannot be changed</small>
                </div>
                
                <div className="profile-field">
                  <label>Date of Birth</label>
                  <div className="profile-value readonly">{patientData.dob}</div>
                  <small className="field-note">Date of birth cannot be changed</small>
                </div>
                
                <div className="profile-field">
                  <label>Blood Type</label>
                  <div className="profile-value readonly">{patientData.bloodType}</div>
                  <small className="field-note">Blood type cannot be changed</small>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Contact Information</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="profile-input"
                    />
                  ) : (
                    <div className="profile-value">{patientData.phone}</div>
                  )}
                </div>
                
                <div className="profile-field full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="profile-textarea"
                      rows="2"
                    />
                  ) : (
                    <div className="profile-value">{patientData.address}</div>
                  )}
                </div>
                
                <div className="profile-field full-width">
                  <label>Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact || ''}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className="profile-input"
                    />
                  ) : (
                    <div className="profile-value">{patientData.emergencyContact}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Medical Information</h3>
              <div className="profile-grid">
                <div className="profile-field full-width">
                  <label>Known Allergies</label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.allergies || ''}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      className="profile-textarea"
                      rows="2"
                      placeholder="Enter allergies separated by commas"
                    />
                  ) : (
                    <div className="profile-value">{patientData.allergies.join(', ')}</div>
                  )}
                </div>
                
                <div className="profile-field full-width">
                  <label>Insurance Information</label>
                  <div className="profile-value readonly">{patientData.insurance}</div>
                  <small className="field-note">Contact admin to update insurance information</small>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Account Summary</h3>
              <div className="summary-stats">
                <div className="summary-card">
                  <div className="summary-number">{patientData.appointments.length}</div>
                  <div className="summary-label">Total Appointments</div>
                </div>
                <div className="summary-card">
                  <div className="summary-number">{patientData.medicalHistory.length}</div>
                  <div className="summary-label">Medical Records</div>
                </div>
                <div className="summary-card">
                  <div className="summary-number">{patientData.treatmentPlans.length}</div>
                  <div className="summary-label">Active Plans</div>
                </div>
                <div className="summary-card">
                  <div className="summary-number">
                    ₹{patientData.bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.patientDue, 0).toFixed(0)}
                  </div>
                  <div className="summary-label">Outstanding Balance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  if (currentView === 'appointments') return renderAppointments();
  if (currentView === 'history') return renderMedicalHistory();
  if (currentView === 'plans') return renderTreatmentPlans();
  if (currentView === 'billing') return renderBilling();
  if (currentView === 'profile') return renderProfile();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Patient Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {patientData.name}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="patient-welcome">
          <h2>Hello, {patientData.name}!</h2>
          <p>Manage your dental care and appointments</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My Appointments</h3>
            <p>View and manage your upcoming appointments</p>
            <div className="card-stats">
              {patientData.appointments.length} upcoming appointment{patientData.appointments.length !== 1 ? 's' : ''}
            </div>
            <button className="card-button" onClick={() => setCurrentView('appointments')}>
              View Appointments
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Medical History</h3>
            <p>Access your medical records and treatment history</p>
            <div className="card-stats">
              {patientData.medicalHistory.length} record{patientData.medicalHistory.length !== 1 ? 's' : ''}
            </div>
            <button className="card-button" onClick={() => setCurrentView('history')}>
              View History
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Treatment Plans</h3>
            <p>View your current and upcoming treatment plans</p>
            <div className="card-stats">
              {patientData.treatmentPlans.length} active plan{patientData.treatmentPlans.length !== 1 ? 's' : ''}
            </div>
            <button className="card-button" onClick={() => setCurrentView('plans')}>
              View Plans
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Billing</h3>
            <p>View invoices and payment history</p>
            <div className="card-stats">
              {patientData.bills.filter(bill => bill.status === 'Pending').length} pending payment{patientData.bills.filter(bill => bill.status === 'Pending').length !== 1 ? 's' : ''}
            </div>
            <button className="card-button" onClick={() => setCurrentView('billing')}>
              View Bills
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Update your personal information and preferences</p>
            <div className="card-stats">
              Contact updated: {patientData.dob}
            </div>
            <button className="card-button" onClick={() => setCurrentView('profile')}>
              View Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
