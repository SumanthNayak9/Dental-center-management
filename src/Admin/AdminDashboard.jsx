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
                <div className="kpi-value">
                  ₹{patients.reduce((total, patient) => total + (patient.totalBill || 0), 0).toLocaleString('en-IN')}
                </div>
                <div className="kpi-change positive">Total from all patients</div>
              </div>
            </div>
            
            <div className="kpi-card appointments">
              <div className="kpi-icon">📅</div>
              <div className="kpi-content">
                <h3>Upcoming Appointments</h3>
                <div className="kpi-value">
                  {patients.reduce((total, patient) => total + (patient.appointments?.filter(apt => apt.status === 'Scheduled').length || 0), 0)}
                </div>
                <div className="kpi-change neutral">Scheduled appointments</div>
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
                <h3>Total Treatments</h3>
                <div className="kpi-value">
                  {patients.reduce((total, patient) => total + (patient.treatmentHistory?.length || 0), 0)}
                </div>
                <div className="kpi-change positive">All treatments recorded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="appointments-section">
          <h2>Upcoming Appointments</h2>
          <div className="appointments-table">
            <div className="appointment-row header">
              <div>Date</div>
              <div>Time</div>
              <div>Patient</div>
              <div>Treatment</div>
              <div>Status</div>
            </div>
            {patients.map(patient => 
              patient.appointments?.filter(apt => apt.status === 'Scheduled').map(appointment => (
                <div key={`${patient.id}-${appointment.id}`} className="appointment-row">
                  <div className="date">{appointment.date}</div>
                  <div className="time">{appointment.time}</div>
                  <div className="patient">{patient.name}</div>
                  <div className="treatment">{appointment.type}</div>
                  <div className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</div>
                </div>
              ))
            ).flat()}
            {patients.every(patient => !patient.appointments?.some(apt => apt.status === 'Scheduled')) && (
              <div className="appointment-row">
                <div colSpan="5" style={{textAlign: 'center', color: '#666'}}>
                  No upcoming appointments
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="patients-section">
          <h2>Patient Overview</h2>
          <div className="patients-grid">
            {patients.slice(0, 4).map(patient => (
              <div key={patient.id} className="patient-card">
                <div className="patient-avatar">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="patient-info">
                  <div className="patient-name">{patient.name}</div>
                  <div className="patient-stats">
                    {patient.treatmentHistory?.length || 0} treatments • Last: {patient.lastVisit}
                  </div>
                  <div className="patient-incidents">
                    Total Bill: ₹{patient.totalBill?.toLocaleString('en-IN') || '0'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
