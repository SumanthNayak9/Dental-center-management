import React, { useState } from 'react';
import { useData } from '../contexts';
import './AdminDashboard.css';
import Calendar from './Calender';
import PatientList from './Patients/PatientList';
import PatientIncidents from './Patients/PatientIncidents';
import AppointmentBooking from './Appointments/AppointmentBooking';
import RecordsManagement from './Records/RecordsManagement';

const AdminDashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { patients, appointments, incidents } = useData();

  const handlePatientIncidents = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('patient-incidents');
  };

  if (currentView === 'calendar') {
    return (
      <Calendar 
        user={user} 
        onLogout={onLogout} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'patients') {
    return (
      <PatientList 
        user={user} 
        onLogout={onLogout} 
        onBack={() => setCurrentView('dashboard')}
        onPatientIncidents={handlePatientIncidents}
      />
    );
  }

  if (currentView === 'appointments') {
    return (
      <AppointmentBooking 
        user={user} 
        onLogout={onLogout} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'records') {
    return (
      <RecordsManagement 
        user={user} 
        onLogout={onLogout} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'patient-incidents') {
    return (
      <PatientIncidents 
        user={user} 
        onLogout={onLogout} 
        onBack={() => setCurrentView('patients')}
        patient={selectedPatient}
      />
    );
  }
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dentist Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Navigation Cards at Top */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Patient Management</h3>
            <p>Manage patient records, appointments, and medical history</p>
            <button className="card-button" onClick={() => setCurrentView('patients')}>View Patients</button>
          </div>

          <div className="dashboard-card">
            <h3>Calendar</h3>
            <p>Schedule and manage patient appointments</p>
            <button className="card-button" onClick={() => setCurrentView('calendar')}>Calendar</button>
          </div>

          <div className="dashboard-card">
            <h3>Appointments</h3>
            <p>Book and manage patient appointments</p>
            <button className="card-button" onClick={() => setCurrentView('appointments')}>Appointment Booking</button>
          </div>

          <div className="dashboard-card">
            <h3>Records</h3>
            <p>Upload and view various records</p>
            <button className="card-button" onClick={() => setCurrentView('records')}>View Records</button>
          </div>
        </div>

        {/* KPI Section */}
        <div className="kpi-section">
          <h2>Dashboard Overview</h2>
          <div className="kpi-grid">
            <div className="kpi-card revenue">
              <div className="kpi-icon">💰</div>
              <div className="kpi-content">
                <h3>Monthly Revenue</h3>
                <div className="kpi-value">₹81,000</div>
                <div className="kpi-change positive">+15% from last month</div>
              </div>
            </div>
            
            <div className="kpi-card appointments">
              <div className="kpi-icon">📅</div>
              <div className="kpi-content">
                <h3>Today's Appointments</h3>
                <div className="kpi-value">5</div>
                <div className="kpi-change neutral">3 confirmed, 2 pending</div>
              </div>
            </div>
            
            <div className="kpi-card patients">
              <div className="kpi-icon">👥</div>
              <div className="kpi-content">
                <h3>Total Patients</h3>
                <div className="kpi-value">{patients.length}</div>
                <div className="kpi-change positive">Active patients</div>
              </div>
            </div>
            
            <div className="kpi-card treatments">
              <div className="kpi-icon">🦷</div>
              <div className="kpi-content">
                <h3>Treatments This Week</h3>
                <div className="kpi-value">8</div>
                <div className="kpi-change positive">3 pending, 5 completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Next 10 Appointments */}
        <div className="appointments-section">
          <h2>Next 10 Appointments</h2>
          <div className="appointments-table">
            <div className="appointment-row header">
              <div>Time</div>
              <div>Patient</div>
              <div>Treatment</div>
              <div>Status</div>
              <div>Duration</div>
            </div>
            <div className="appointment-row">
              <div className="time">09:00 AM</div>
              <div className="patient">Priya Sharma</div>
              <div className="treatment">Dental Cleaning</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">45 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">10:30 AM</div>
              <div className="patient">Rajesh Kumar</div>
              <div className="treatment">Teeth Whitening</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">60 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">11:00 AM</div>
              <div className="patient">Anita Desai</div>
              <div className="treatment">Crown Placement</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">90 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">02:00 PM</div>
              <div className="patient">Priya Sharma</div>
              <div className="treatment">Root Canal Follow-up</div>
              <div className="status scheduled">Scheduled</div>
              <div className="duration">60 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">03:30 PM</div>
              <div className="patient">Anita Desai</div>
              <div className="treatment">Follow-up Checkup</div>
              <div className="status scheduled">Scheduled</div>
              <div className="duration">30 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">Tomorrow 09:00 AM</div>
              <div className="patient">Rajesh Kumar</div>
              <div className="treatment">Invisalign Fitting</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">45 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">Tomorrow 10:30 AM</div>
              <div className="patient">Priya Sharma</div>
              <div className="treatment">Crown Placement</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">120 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">Tomorrow 02:00 PM</div>
              <div className="patient">Anita Desai</div>
              <div className="treatment">Periodontal Treatment</div>
              <div className="status pending">Pending</div>
              <div className="duration">75 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">Tomorrow 03:30 PM</div>
              <div className="patient">Rajesh Kumar</div>
              <div className="treatment">Orthodontic Adjustment</div>
              <div className="status confirmed">Confirmed</div>
              <div className="duration">30 min</div>
            </div>
            <div className="appointment-row">
              <div className="time">Tomorrow 04:30 PM</div>
              <div className="patient">Priya Sharma</div>
              <div className="treatment">Dental Cleaning</div>
              <div className="status pending">Pending</div>
              <div className="duration">45 min</div>
            </div>
          </div>
        </div>

        {/* Top Patients */}
        <div className="patients-section">
          <h2>Top Patients (Most Treatments & Revenue)</h2>
          <div className="patients-grid">
            <div className="patient-card">
              <div className="patient-avatar">AD</div>
              <div className="patient-info">
                <div className="patient-name">Anita Desai</div>
                <div className="patient-stats">2 treatments • Last: Jan 25</div>
                <div className="patient-incidents">Revenue: ₹48,000 • Status: 1 Pending</div>
              </div>
            </div>
            <div className="patient-card">
              <div className="patient-avatar">PS</div>
              <div className="patient-info">
                <div className="patient-name">Priya Sharma</div>
                <div className="patient-stats">2 treatments • Last: Jan 15</div>
                <div className="patient-incidents">Revenue: ₹28,000 • Status: All Paid</div>
              </div>
            </div>
            <div className="patient-card">
              <div className="patient-avatar">RK</div>
              <div className="patient-info">
                <div className="patient-name">Rajesh Kumar</div>
                <div className="patient-stats">1 treatment • Last: Jan 20</div>
                <div className="patient-incidents">Revenue: ₹5,000 • Status: All Paid</div>
              </div>
            </div>
            <div className="patient-card">
              <div className="patient-avatar">
                <div className="add-patient-icon">+</div>
              </div>
              <div className="patient-info">
                <div className="patient-name">Add New Patient</div>
                <div className="patient-stats">Click to add new patient</div>
                <div className="patient-incidents">Expand your practice</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
