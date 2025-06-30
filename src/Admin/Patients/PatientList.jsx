import React, { useState } from 'react';
import { useData } from '../../contexts';

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
                <th>Medical History</th>
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
                  <td>N/A</td>
                  <td>{patient.medicalHistory}</td>
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

// Patient Form Component
const PatientForm = ({ user, onLogout, onBack, onSave, editingPatient }) => {
  const [formData, setFormData] = useState({
    fullName: editingPatient?.fullName || '',
    dob: editingPatient?.dob || '',
    phone: editingPatient?.phone || '',
    email: editingPatient?.email || '',
    address: editingPatient?.address || '',
    bloodType: editingPatient?.bloodType || '',
    allergies: editingPatient?.allergies || '',
    emergencyContact: editingPatient?.emergencyContact || '',
    medicalHistory: editingPatient?.medicalHistory || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">← Back</button>
            <h1>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="patient-form-main">
        <div className="patient-form-container">
          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth *</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Medical Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bloodType">Blood Type</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="None, Penicillin, etc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name - Phone Number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Previous treatments, conditions, notes..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onBack} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editingPatient ? 'Update Patient' : 'Add Patient'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PatientList;