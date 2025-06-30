import React, { useState } from 'react';
import { useData } from '../../contexts';
import PatientForm from './PatientForm';

const PatientList = ({ user, onLogout, onBack, onPatientIncidents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  
  const { patients, addPatient, updatePatient, deletePatient } = useData();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(patientId);
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowAddForm(true);
  };

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      // Update existing patient
      updatePatient({ ...patientData, id: editingPatient.id });
    } else {
      // Add new patient
      addPatient(patientData);
    }
    setShowAddForm(false);
    setEditingPatient(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (showAddForm) {
    return (
      <PatientForm
        user={user}
        onLogout={onLogout}
        onBack={() => {
          setShowAddForm(false);
          setEditingPatient(null);
        }}
        onSave={handleSavePatient}
        editingPatient={editingPatient}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">← Back</button>
            <h1>Patient Management</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="patients-main">
        <div className="patients-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="add-patient-btn"
          >
            + Add New Patient
          </button>
        </div>

        <div className="patients-table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td className="patient-name-cell">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-dob">Age: {patient.age}</div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.bloodType}</td>
                  <td>{patient.allergies}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => onPatientIncidents(patient)}
                      className="action-btn incidents-btn"
                      title="View Incidents"
                    >
                      🚨 Incidents
                    </button>
                    <button 
                      onClick={() => handleEditPatient(patient)}
                      className="action-btn edit-btn"
                      title="Edit Patient"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePatient(patient.id)}
                      className="action-btn delete-btn"
                      title="Delete Patient"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPatients.length === 0 && (
            <div className="no-patients">
              <p>No patients found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientList;