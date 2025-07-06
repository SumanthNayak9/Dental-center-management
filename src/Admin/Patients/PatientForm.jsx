import React, { useState, useEffect } from 'react';

const PatientForm = ({ user, onLogout, onBack, onSave, editingPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    bloodType: '',
    insurance: '',
    lastVisit: '',
    nextAppointment: '',
    totalBill: 0,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPatient) {
      setFormData({
        name: editingPatient.name || '',
        email: editingPatient.email || '',
        phone: editingPatient.phone || '',
        dateOfBirth: editingPatient.dateOfBirth || '',
        gender: editingPatient.gender || '',
        address: editingPatient.address || '',
        emergencyContact: editingPatient.emergencyContact || '',
        medicalHistory: Array.isArray(editingPatient.medicalHistory) 
          ? editingPatient.medicalHistory.join(', ') 
          : editingPatient.medicalHistory || '',
        allergies: editingPatient.allergies || '',
        bloodType: editingPatient.bloodType || '',
        insurance: editingPatient.insurance || '',
        lastVisit: editingPatient.lastVisit || '',
        nextAppointment: editingPatient.nextAppointment || '',
        totalBill: editingPatient.totalBill || 0,
        notes: editingPatient.notes || ''
      });
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Calculate age from date of birth
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Process medical history as array
    const medicalHistoryArray = formData.medicalHistory
      ? formData.medicalHistory.split(',').map(item => item.trim()).filter(item => item)
      : [];

    const patientData = {
      ...formData,
      age,
      medicalHistory: medicalHistoryArray,
      totalBill: parseFloat(formData.totalBill) || 0,
      createdAt: editingPatient ? editingPatient.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(patientData);
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

      <main className="form-main">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={errors.gender ? 'error' : ''}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Name and phone number"
                  />
                </div>
              </div>

              {/* Medical Information */}
              <div className="form-section">
                <h3>Medical Information</h3>

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
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="3"
                    placeholder="List any known allergies"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="medicalHistory">Medical History</label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Separate multiple entries with commas"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="insurance">Insurance Information</label>
                  <input
                    type="text"
                    id="insurance"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                    placeholder="Insurance provider and policy number"
                  />
                </div>
              </div>

              {/* Appointment & Billing Information */}
              <div className="form-section">
                <h3>Appointment & Billing</h3>

                <div className="form-group">
                  <label htmlFor="lastVisit">Last Visit</label>
                  <input
                    type="date"
                    id="lastVisit"
                    name="lastVisit"
                    value={formData.lastVisit}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nextAppointment">Next Appointment</label>
                  <input
                    type="date"
                    id="nextAppointment"
                    name="nextAppointment"
                    value={formData.nextAppointment}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="totalBill">Total Outstanding Bill (₹)</label>
                  <input
                    type="number"
                    id="totalBill"
                    name="totalBill"
                    value={formData.totalBill}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any additional notes about the patient"
                  />
                </div>
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

export default PatientForm;
