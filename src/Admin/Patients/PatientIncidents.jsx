import React, { useState } from 'react';

const PatientIncidents = ({ user, onLogout, onBack, patient }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Sample incident data for the specific patient
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      patientId: patient.id,
      incidentDate: '2025-06-20',
      incidentTime: '14:30',
      type: 'Equipment Malfunction',
      severity: 'Medium',
      description: 'Dental drill stopped working during cavity filling procedure',
      actionTaken: 'Switched to backup equipment, procedure completed successfully',
      reportedBy: 'Dr. Smith',
      followUpRequired: 'Equipment maintenance scheduled',
      status: 'Resolved'
    },
    {
      id: 2,
      patientId: patient.id,
      incidentDate: '2025-05-15',
      incidentTime: '10:45',
      type: 'Patient Reaction',
      severity: 'High',
      description: 'Patient experienced mild allergic reaction to local anesthetic',
      actionTaken: 'Administered antihistamine, monitored patient for 30 minutes',
      reportedBy: 'Dr. Johnson',
      followUpRequired: 'Update patient allergy record, use alternative anesthetic',
      status: 'Resolved'
    },
    {
      id: 3,
      patientId: patient.id,
      incidentDate: '2025-04-08',
      incidentTime: '16:20',
      type: 'Procedure Complication',
      severity: 'Medium',
      description: 'Unexpected bleeding during tooth extraction',
      actionTaken: 'Applied additional pressure, used hemostatic agent',
      reportedBy: 'Dr. Brown',
      followUpRequired: 'Follow-up appointment in 1 week',
      status: 'Closed'
    }
  ]);

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'status-resolved';
      case 'pending': return 'status-pending';
      case 'closed': return 'status-closed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddIncident = (incidentData) => {
    const newIncident = {
      ...incidentData,
      id: Math.max(...incidents.map(i => i.id)) + 1,
      patientId: patient.id
    };
    setIncidents([newIncident, ...incidents]);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <IncidentForm
        user={user}
        onLogout={onLogout}
        onBack={() => setShowAddForm(false)}
        onSave={handleAddIncident}
        patient={patient}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">← Back to Patients</button>
            <h1>Patient Incidents - {patient.fullName}</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="incidents-main">
        <div className="patient-info-bar">
          <div className="patient-summary">
            <h3>{patient.fullName}</h3>
            <p>DOB: {formatDate(patient.dob)} | Phone: {patient.phone}</p>
            <p>Total Incidents: {incidents.length}</p>
          </div>
        </div>

        <div className="incidents-container">
          <div className="incidents-header">
            <h2>Incident History</h2>
            <button 
              onClick={() => setShowAddForm(true)}
              className="add-incident-btn"
            >
              + Add New Incident
            </button>
          </div>
          
          {incidents.length === 0 ? (
            <div className="no-incidents">
              <p>No incidents reported for this patient.</p>
            </div>
          ) : (
            <div className="incidents-list">
              {incidents.map(incident => (
                <div key={incident.id} className="incident-card">
                  <div className="incident-header">
                    <div className="incident-meta">
                      <span className="incident-date">
                        {formatDate(incident.incidentDate)} at {incident.incidentTime}
                      </span>
                      <span className={`severity-badge ${getSeverityClass(incident.severity)}`}>
                        {incident.severity} Severity
                      </span>
                      <span className={`status-badge ${getStatusClass(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                    <h4 className="incident-type">{incident.type}</h4>
                  </div>

                  <div className="incident-body">
                    <div className="incident-section">
                      <h5>Description</h5>
                      <p>{incident.description}</p>
                    </div>

                    <div className="incident-section">
                      <h5>Action Taken</h5>
                      <p>{incident.actionTaken}</p>
                    </div>

                    <div className="incident-section">
                      <h5>Follow-up Required</h5>
                      <p>{incident.followUpRequired}</p>
                    </div>

                    <div className="incident-footer">
                      <span className="reported-by">Reported by: {incident.reportedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Incident Form Component
const IncidentForm = ({ user, onLogout, onBack, onSave, patient }) => {
  const [formData, setFormData] = useState({
    incidentDate: new Date().toISOString().split('T')[0],
    incidentTime: new Date().toTimeString().slice(0, 5),
    type: '',
    otherType: '',
    severity: 'Low',
    description: '',
    actionTaken: '',
    reportedBy: '',
    followUpRequired: '',
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // If "Other" is selected, use the otherType value as the type
    const submissionData = {
      ...formData,
      type: formData.type === 'Other' ? formData.otherType : formData.type
    };
    onSave(submissionData);
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
            <button onClick={onBack} className="back-btn">← Back to Incidents</button>
            <h1>Add New Incident - {patient.fullName}</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="incident-form-main">
        <div className="incident-form-container">
          <form onSubmit={handleSubmit} className="incident-form">
            <div className="form-section">
              <h3>Incident Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="incidentDate">Incident Date *</label>
                  <input
                    type="date"
                    id="incidentDate"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="incidentTime">Incident Time *</label>
                  <input
                    type="time"
                    id="incidentTime"
                    name="incidentTime"
                    value={formData.incidentTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Incident Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Incident Type</option>
                    <option value="Equipment Malfunction">Equipment Malfunction</option>
                    <option value="Patient Reaction">Patient Reaction</option>
                    <option value="Procedure Complication">Procedure Complication</option>
                    <option value="Medication Error">Medication Error</option>
                    <option value="Fall/Injury">Fall/Injury</option>
                    <option value="Infection Control">Infection Control</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="severity">Severity *</label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {formData.type === 'Other' && (
                <div className="form-group">
                  <label htmlFor="otherType">Specify Other Incident Type *</label>
                  <input
                    type="text"
                    id="otherType"
                    name="otherType"
                    value={formData.otherType}
                    onChange={handleChange}
                    placeholder="Please specify the incident type..."
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Detailed description of the incident..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="actionTaken">Action Taken *</label>
                <textarea
                  id="actionTaken"
                  name="actionTaken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Actions taken to address the incident..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reportedBy">Reported By *</label>
                  <input
                    type="text"
                    id="reportedBy"
                    name="reportedBy"
                    value={formData.reportedBy}
                    onChange={handleChange}
                    placeholder="Name of person reporting the incident"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="followUpRequired">Follow-up Required</label>
                <textarea
                  id="followUpRequired"
                  name="followUpRequired"
                  value={formData.followUpRequired}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Any follow-up actions required..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onBack} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Add Incident
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PatientIncidents;
