import React, { useState } from 'react';

// Patient profiles with individual data
const patientProfiles = {
  'john.smith@email.com': {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    password: 'john123',
    dob: '1985-03-15',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Springfield, IL 62701',
    emergencyContact: 'Jane Smith - (555) 123-4568',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Latex'],
    insurance: 'Blue Cross Blue Shield - Policy #BC123456',
    appointments: [
      {
        id: 1,
        date: '2024-07-05',
        time: '09:00 AM',
        treatment: 'Dental Cleaning',
        doctor: 'Dr. Johnson',
        status: 'Confirmed',
        notes: 'Regular checkup and cleaning'
      },
      {
        id: 2,
        date: '2024-07-15',
        time: '02:00 PM',
        treatment: 'Root Canal Follow-up',
        doctor: 'Dr. Johnson',
        status: 'Scheduled',
        notes: 'Follow-up for root canal treatment'
      }
    ],
    medicalHistory: [
      {
        id: 1,
        date: '2024-06-25',
        treatment: 'Root Canal',
        doctor: 'Dr. Johnson',
        notes: 'Root canal treatment on tooth #14. Patient responded well to treatment.',
        prescription: 'Ibuprofen 600mg, Amoxicillin 500mg'
      },
      {
        id: 2,
        date: '2024-05-20',
        treatment: 'Dental Cleaning',
        doctor: 'Dr. Johnson',
        notes: 'Routine cleaning. Good oral hygiene maintained.',
        prescription: 'None'
      }
    ],
    treatmentPlans: [
      {
        id: 1,
        title: 'Comprehensive Oral Care',
        startDate: '2024-07-01',
        endDate: '2024-12-01',
        treatments: ['Root Canal Follow-up', 'Crown Placement', 'Regular Cleanings'],
        progress: 60,
        doctor: 'Dr. Johnson'
      }
    ],
    bills: [
      {
        id: 1,
        date: '2024-06-25',
        treatment: 'Root Canal',
        amount: 1250.00,
        insurance: 800.00,
        patientDue: 450.00,
        status: 'Paid',
        dueDate: '2024-07-25'
      },
      {
        id: 2,
        date: '2024-05-20',
        treatment: 'Dental Cleaning',
        amount: 180.00,
        insurance: 150.00,
        patientDue: 30.00,
        status: 'Paid',
        dueDate: '2024-06-20'
      }
    ]
  },
  'emma.johnson@email.com': {
    id: 2,
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    password: 'emma123',
    dob: '1990-07-22',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Springfield, IL 62702',
    emergencyContact: 'Michael Johnson - (555) 234-5679',
    bloodType: 'A+',
    allergies: ['None known'],
    insurance: 'Aetna - Policy #AE789012',
    appointments: [
      {
        id: 3,
        date: '2024-07-08',
        time: '10:30 AM',
        treatment: 'Teeth Whitening',
        doctor: 'Dr. Smith',
        status: 'Confirmed',
        notes: 'Professional whitening treatment'
      }
    ],
    medicalHistory: [
      {
        id: 3,
        date: '2024-06-22',
        treatment: 'Orthodontic Consultation',
        doctor: 'Dr. Smith',
        notes: 'Initial consultation for teeth alignment. Recommended Invisalign treatment.',
        prescription: 'None'
      }
    ],
    treatmentPlans: [
      {
        id: 2,
        title: 'Invisalign Treatment',
        startDate: '2024-08-01',
        endDate: '2025-02-01',
        treatments: ['Initial Impressions', 'Aligner Fittings', 'Monthly Check-ups'],
        progress: 10,
        doctor: 'Dr. Smith'
      }
    ],
    bills: [
      {
        id: 3,
        date: '2024-06-22',
        treatment: 'Orthodontic Consultation',
        amount: 200.00,
        insurance: 100.00,
        patientDue: 100.00,
        status: 'Paid',
        dueDate: '2024-07-22'
      }
    ]
  },
  'michael.brown@email.com': {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    password: 'michael123',
    dob: '1978-11-08',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Springfield, IL 62703',
    emergencyContact: 'Sarah Brown - (555) 345-6780',
    bloodType: 'B-',
    allergies: ['Codeine'],
    insurance: 'Cigna - Policy #CG345678',
    appointments: [
      {
        id: 4,
        date: '2024-07-10',
        time: '11:00 AM',
        treatment: 'Crown Placement',
        doctor: 'Dr. Johnson',
        status: 'Confirmed',
        notes: 'Crown placement for tooth #12'
      },
      {
        id: 5,
        date: '2024-07-25',
        time: '03:30 PM',
        treatment: 'Follow-up Checkup',
        doctor: 'Dr. Johnson',
        status: 'Scheduled',
        notes: 'Post-crown placement checkup'
      }
    ],
    medicalHistory: [
      {
        id: 4,
        date: '2024-06-15',
        treatment: 'Crown Preparation',
        doctor: 'Dr. Johnson',
        notes: 'Tooth preparation for crown placement. Temporary crown installed.',
        prescription: 'Ibuprofen 400mg as needed'
      }
    ],
    treatmentPlans: [
      {
        id: 3,
        title: 'Dental Restoration',
        startDate: '2024-06-01',
        endDate: '2024-08-01',
        treatments: ['Crown Preparation', 'Crown Placement', 'Follow-up Care'],
        progress: 75,
        doctor: 'Dr. Johnson'
      }
    ],
    bills: [
      {
        id: 4,
        date: '2024-06-15',
        treatment: 'Crown Preparation',
        amount: 800.00,
        insurance: 500.00,
        patientDue: 300.00,
        status: 'Paid',
        dueDate: '2024-07-15'
      },
      {
        id: 5,
        date: '2024-07-10',
        treatment: 'Crown Placement',
        amount: 1200.00,
        insurance: 750.00,
        patientDue: 450.00,
        status: 'Pending',
        dueDate: '2024-08-10'
      }
    ]
  }
};

const PatientDashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Get patient data based on logged-in user
  const patientData = patientProfiles[user.email];
  
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
      <button onClick={() => setCurrentView('dashboard')} className="back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="medical-history-section">
      <h2>Medical History</h2>
      <div className="history-list">
        {patientData.medicalHistory.map(record => (
          <div key={record.id} className="history-card">
            <div className="history-header">
              <h4>{record.treatment}</h4>
              <span className="history-date">{record.date}</span>
            </div>
            <div className="history-details">
              <p><strong>Doctor:</strong> {record.doctor}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentView('dashboard')} className="back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );

  const renderTreatmentPlans = () => (
    <div className="treatment-plans-section">
      <h2>Treatment Plans</h2>
      <div className="plans-list">
        {patientData.treatmentPlans.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <h4>{plan.title}</h4>
              <span className="plan-doctor">Dr. {plan.doctor}</span>
            </div>
            <div className="plan-details">
              <p><strong>Duration:</strong> {plan.startDate} to {plan.endDate}</p>
              <p><strong>Treatments:</strong> {plan.treatments.join(', ')}</p>
              <div className="progress-bar">
                <div className="progress-label">Progress: {plan.progress}%</div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${plan.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentView('dashboard')} className="back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );

  const renderBilling = () => (
    <div className="billing-section">
      <h2>Billing & Payments</h2>
      <div className="bills-list">
        {patientData.bills.map(bill => (
          <div key={bill.id} className="bill-card">
            <div className="bill-header">
              <h4>{bill.treatment}</h4>
              <span className={`status-badge ${bill.status.toLowerCase()}`}>
                {bill.status}
              </span>
            </div>
            <div className="bill-details">
              <p><strong>Date:</strong> {bill.date}</p>
              <p><strong>Total Amount:</strong> ${bill.amount.toFixed(2)}</p>
              <p><strong>Insurance Covered:</strong> ${bill.insurance.toFixed(2)}</p>
              <p><strong>Patient Due:</strong> ${bill.patientDue.toFixed(2)}</p>
              <p><strong>Due Date:</strong> {bill.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentView('dashboard')} className="back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-info">
          <h3>{patientData.name}</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Email:</strong> {patientData.email}
            </div>
            <div className="info-item">
              <strong>Date of Birth:</strong> {patientData.dob}
            </div>
            <div className="info-item">
              <strong>Phone:</strong> {patientData.phone}
            </div>
            <div className="info-item">
              <strong>Address:</strong> {patientData.address}
            </div>
            <div className="info-item">
              <strong>Emergency Contact:</strong> {patientData.emergencyContact}
            </div>
            <div className="info-item">
              <strong>Blood Type:</strong> {patientData.bloodType}
            </div>
            <div className="info-item">
              <strong>Allergies:</strong> {patientData.allergies.join(', ')}
            </div>
            <div className="info-item">
              <strong>Insurance:</strong> {patientData.insurance}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setCurrentView('dashboard')} className="back-btn">
        ← Back to Dashboard
      </button>
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
