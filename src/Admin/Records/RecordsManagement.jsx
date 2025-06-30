import React, { useState } from 'react';
import { useData } from '../../contexts';
import './RecordsManagement.css';

const RecordsManagement = ({ user, onLogout, onBack }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState('file');
  const [textRecord, setTextRecord] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [recordCategory, setRecordCategory] = useState('general');

  // Get patient data from context
  const { patients } = useData();

  // Enhanced patient data with sample records for demonstration
  const patientsWithRecords = patients.map(patient => ({
    ...patient,
    records: [
      // Treatment records based on patient's treatment history
      ...(patient.treatmentHistory || []).map((treatment, index) => ({
        id: `treatment-${patient.id}-${index}`,
        title: `${treatment.treatment} - Treatment Record`,
        type: 'file',
        category: 'treatment',
        date: treatment.date,
        filename: `treatment_record_${treatment.date.replace(/-/g, '_')}.pdf`,
        size: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9) + 1} MB`,
        uploadedBy: treatment.doctor,
        content: `Treatment: ${treatment.treatment}, Cost: ₹${treatment.cost.toLocaleString('en-IN')}, Doctor: ${treatment.doctor}`
      })),
      
      // Medical history record
      {
        id: `history-${patient.id}`,
        title: 'Medical History',
        type: 'text',
        category: 'notes',
        date: patient.lastVisit || '2024-01-01',
        content: `Medical History: ${patient.medicalHistory || 'No significant history'}\nBlood Type: ${patient.bloodType}\nAllergies: ${patient.allergies}\nEmergency Contact: ${patient.emergencyContact}`,
        uploadedBy: 'Staff'
      },
      
      // Sample imaging record
      {
        id: `xray-${patient.id}`,
        title: 'Dental X-Ray',
        type: 'image',
        category: 'imaging',
        date: patient.lastVisit || '2024-01-01',
        filename: `xray_${patient.name.replace(/\s+/g, '_').toLowerCase()}_${(patient.lastVisit || '2024-01-01').replace(/-/g, '_')}.jpg`,
        size: `${Math.floor(Math.random() * 3) + 2}.${Math.floor(Math.random() * 9) + 1} MB`,
        uploadedBy: 'Dr. Radiologist'
      },
      
      // Consultation record if patient has appointments
      ...(patient.appointments && patient.appointments.length > 0 ? [{
        id: `consultation-${patient.id}`,
        title: 'Consultation Report',
        type: 'file',
        category: 'consultation',
        date: patient.appointments[0].date,
        filename: `consultation_${patient.name.replace(/\s+/g, '_').toLowerCase()}.pdf`,
        size: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9) + 1} MB`,
        uploadedBy: 'Dr. Consultant'
      }] : [])
    ]
  }));

  const handleUploadRecord = (e) => {
    e.preventDefault();
    // Here you would handle the actual file upload
    console.log('Uploading record:', {
      patientId: selectedPatient.id,
      type: uploadType,
      title: recordTitle,
      category: recordCategory,
      content: uploadType === 'text' ? textRecord : null
    });
    
    setShowUploadForm(false);
    setRecordTitle('');
    setTextRecord('');
    setRecordCategory('general');
  };

  const getCategoryColor = (category) => {
    const colors = {
      imaging: '#e3f2fd',
      treatment: '#e8f5e8',
      notes: '#fff3e0',
      consultation: '#f3e5f5',
      insurance: '#fce4ec',
      general: '#f5f5f5'
    };
    return colors[category] || colors.general;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'file': return '📄';
      case 'text': return '📝';
      default: return '📄';
    }
  };

  return (
    <div className="records-container">
      <header className="records-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">
              ← Back
            </button>
            <h1>Records Management</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="records-main">
        <div className="records-layout">
          {/* Patients List */}
          <div className="patients-sidebar">
            <h2>Patients</h2>
            <div className="patients-list">
              {patientsWithRecords.map(patient => (
                <div
                  key={patient.id}
                  className={`patient-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="patient-avatar">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="patient-details">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-info">
                      {patient.records.length} record{patient.records.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Records Content */}
          <div className="records-content">
            {selectedPatient ? (
              <>
                <div className="patient-header">
                  <div className="patient-info-card">
                    <h2>{selectedPatient.name}</h2>
                    <p>Age: {selectedPatient.age} | Email: {selectedPatient.email} | Phone: {selectedPatient.phone}</p>
                  </div>
                  <button
                    className="upload-btn"
                    onClick={() => setShowUploadForm(true)}
                  >
                    Upload Record
                  </button>
                </div>

                <div className="records-grid">
                  {selectedPatient.records.length > 0 ? (
                    selectedPatient.records.map(record => (
                      <div
                        key={record.id}
                        className="record-card"
                        style={{ backgroundColor: getCategoryColor(record.category) }}
                      >
                        <div className="record-header">
                          <div className="record-icon">{getTypeIcon(record.type)}</div>
                          <div className="record-info">
                            <h3>{record.title}</h3>
                            <div className="record-meta">
                              <span className="record-date">{record.date}</span>
                              <span className="record-category">{record.category}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="record-content">
                          {record.type === 'text' ? (
                            <p className="text-content">{record.content}</p>
                          ) : (
                            <div className="file-info">
                              <span className="filename">{record.filename}</span>
                              <span className="filesize">{record.size}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="record-footer">
                          <span className="uploaded-by">Uploaded by: {record.uploadedBy}</span>
                          <div className="record-actions">
                            <button className="view-btn">View</button>
                            <button className="download-btn">Download</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-records">
                      <h3>No records found</h3>
                      <p>Upload the first record for this patient</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-patient-selected">
                <h2>Select a Patient</h2>
                <p>Choose a patient from the list to view and manage their records</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="form-overlay">
            <div className="upload-form">
              <div className="form-header">
                <h3>Upload Record for {selectedPatient?.name}</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowUploadForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUploadRecord}>
                <div className="form-group">
                  <label>Record Title</label>
                  <input
                    type="text"
                    value={recordTitle}
                    onChange={(e) => setRecordTitle(e.target.value)}
                    placeholder="Enter record title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={recordCategory}
                    onChange={(e) => setRecordCategory(e.target.value)}
                  >
                    <option value="general">General</option>
                    <option value="imaging">Imaging</option>
                    <option value="treatment">Treatment</option>
                    <option value="notes">Notes</option>
                    <option value="consultation">Consultation</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Upload Type</label>
                  <div className="upload-type-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="file"
                        checked={uploadType === 'file'}
                        onChange={(e) => setUploadType(e.target.value)}
                      />
                      File Upload
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="image"
                        checked={uploadType === 'image'}
                        onChange={(e) => setUploadType(e.target.value)}
                      />
                      Image Upload
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="text"
                        checked={uploadType === 'text'}
                        onChange={(e) => setUploadType(e.target.value)}
                      />
                      Text Record
                    </label>
                  </div>
                </div>

                {uploadType === 'text' ? (
                  <div className="form-group">
                    <label>Record Content</label>
                    <textarea
                      value={textRecord}
                      onChange={(e) => setTextRecord(e.target.value)}
                      placeholder="Enter record content..."
                      rows="6"
                      required
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>
                      {uploadType === 'image' ? 'Select Image' : 'Select File'}
                    </label>
                    <input
                      type="file"
                      accept={uploadType === 'image' ? 'image/*' : '*/*'}
                      required
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowUploadForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Upload Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecordsManagement;
