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
  const { patients } = useData();

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
          <div className="header-left"></div>
          <h1 className="header-center">Dentist Dashboard</h1>
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
          <h2>Upcoming Appointments</h2>
          <div className="appointments-table">
            <div className="appointment-row header">
              <div>Time</div>
              <div>Patient</div>
              <div>Treatment</div>
              <div>Status</div>
              <div>Contact</div>
            </div>
            {patients.slice(0, 10).map((patient, index) => {
              // Get the next appointment for each patient
              const nextAppointment = patient.appointments && patient.appointments.length > 0 
                ? patient.appointments[0] 
                : null;
              
              if (!nextAppointment) return null;
              
              return (
                <div key={`${patient.id}-${index}`} className="appointment-row">
                  <div className="time">{nextAppointment.time}</div>
                  <div className="patient">{patient.name}</div>
                  <div className="treatment">{nextAppointment.type}</div>
                  <div className={`status ${nextAppointment.status.toLowerCase()}`}>
                    {nextAppointment.status}
                  </div>
                  <div className="duration">{patient.phone}</div>
                </div>
              );
            }).filter(Boolean)}
            
            {/* Fill remaining slots with sample appointments if needed */}
            {patients.filter(p => p.appointments && p.appointments.length > 0).length < 6 && (
              <>
                <div className="appointment-row">
                  <div className="time">Tomorrow 09:00 AM</div>
                  <div className="patient">John Smith</div>
                  <div className="treatment">Dental Cleaning</div>
                  <div className="status confirmed">Confirmed</div>
                  <div className="duration">+1 (555) 123-4567</div>
                </div>
                <div className="appointment-row">
                  <div className="time">Tomorrow 10:30 AM</div>
                  <div className="patient">Emma Johnson</div>
                  <div className="treatment">Teeth Whitening</div>
                  <div className="status confirmed">Confirmed</div>
                  <div className="duration">+1 (555) 234-5678</div>
                </div>
                <div className="appointment-row">
                  <div className="time">Tomorrow 02:00 PM</div>
                  <div className="patient">Michael Brown</div>
                  <div className="treatment">Crown Placement</div>
                  <div className="status pending">Pending</div>
                  <div className="duration">+1 (555) 345-6789</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Top Patients Based on Appointments */}
        <div className="patients-section">
          <h2>Top Patients (Most Appointments)</h2>
          <div className="patients-grid">
            {patients
              .sort((a, b) => {
                const aAppointments = (a.appointments || []).length;
                const bAppointments = (b.appointments || []).length;
                return bAppointments - aAppointments;
              })
              .slice(0, 6)
              .map((patient) => {
                const initials = patient.name.split(' ').map(n => n[0]).join('').toUpperCase();
                const totalBill = patient.totalBill || 0;
                const lastVisit = patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A';
                const appointmentCount = patient.appointments ? patient.appointments.length : 0;
                
                return (
                  <div key={patient.id} className="patient-card">
                    <div className="patient-avatar">{initials}</div>
                    <div className="patient-info">
                      <div className="patient-name">{patient.name}</div>
                      <div className="patient-stats">{appointmentCount} appointments • Last: {lastVisit}</div>
                      <div className="patient-incidents">Revenue: ₹{totalBill.toLocaleString('en-IN')} • Age: {patient.age}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
