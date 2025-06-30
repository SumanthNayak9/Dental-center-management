import React, { useState, useEffect } from 'react';

const AppointmentBooking = ({ user, onLogout, onBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockAppointments = [
      {
        id: 1,
        patientName: 'John Smith',
        title: 'Dental Cleaning',
        description: 'Regular dental cleaning and checkup',
        comments: 'Patient has sensitive teeth',
        appointmentDateTime: '2025-06-30T09:00:00',
        status: 'scheduled',
        cost: '',
        treatment: '',
        nextDate: '',
        files: []
      },
      {
        id: 2,
        patientName: 'Emma Johnson',
        title: 'Root Canal Treatment',
        description: 'Root canal procedure for tooth #14',
        comments: 'Patient is anxious about the procedure',
        appointmentDateTime: '2025-06-30T10:00:00',
        status: 'completed',
        cost: '$850',
        treatment: 'Root canal completed successfully',
        nextDate: '2025-07-15T10:00:00',
        files: ['invoice_001.pdf', 'xray_001.jpg']
      },
      {
        id: 3,
        patientName: 'Michael Brown',
        title: 'Teeth Whitening',
        description: 'Professional teeth whitening treatment',
        comments: 'Patient wants 2 shades whiter',
        appointmentDateTime: '2025-06-30T11:30:00',
        status: 'in-progress',
        cost: '$450',
        treatment: 'First session completed',
        nextDate: '2025-07-07T11:30:00',
        files: ['before_photo.jpg']
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const [formData, setFormData] = useState({
    patientName: '',
    title: '',
    description: '',
    comments: '',
    appointmentDateTime: '',
    status: 'scheduled',
    cost: '',
    treatment: '',
    nextDate: '',
    files: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...fileNames]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAppointment) {
      setAppointments(prev => prev.map(apt => 
        apt.id === editingAppointment.id ? { ...formData, id: apt.id } : apt
      ));
    } else {
      const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
      setAppointments(prev => [...prev, { ...formData, id: newId }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      title: '',
      description: '',
      comments: '',
      appointmentDateTime: '',
      status: 'scheduled',
      cost: '',
      treatment: '',
      nextDate: '',
      files: []
    });
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleEdit = (appointment) => {
    setFormData(appointment);
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#007bff';
      case 'in-progress': return '#ffc107';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">← Back</button>
            <h1>Appointment Management</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="appointments-management">
          {/* Controls */}
          <div className="controls-section">
            <button 
              className="add-btn" 
              onClick={() => setShowForm(true)}
            >
              + Book New Appointment
            </button>
            
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search by patient name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointment Form */}
          {showForm && (
            <div className="form-overlay">
              <div className="appointment-form">
                <h3>{editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Patient Name *</label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="2"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Appointment Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="appointmentDateTime"
                        value={formData.appointmentDateTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Post-appointment fields */}
                  <div className="post-appointment-section">
                    <h4>Post-Appointment Details</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Cost</label>
                        <input
                          type="text"
                          name="cost"
                          value={formData.cost}
                          onChange={handleInputChange}
                          placeholder="e.g., $150"
                        />
                      </div>
                      <div className="form-group">
                        <label>Next Appointment Date</label>
                        <input
                          type="datetime-local"
                          name="nextDate"
                          value={formData.nextDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Treatment Notes</label>
                      <textarea
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Treatment details, procedures performed, etc."
                      />
                    </div>

                    <div className="form-group">
                      <label>Upload Files (Invoices, Images, etc.)</label>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      {formData.files.length > 0 && (
                        <div className="uploaded-files">
                          <p>Uploaded files:</p>
                          <ul>
                            {formData.files.map((file, index) => (
                              <li key={index}>{file}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-btn">
                      {editingAppointment ? 'Update Appointment' : 'Book Appointment'}
                    </button>
                    <button type="button" onClick={resetForm} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Appointments List */}
          <div className="appointments-list">
            <h3>Appointments ({filteredAppointments.length})</h3>
            
            {filteredAppointments.length === 0 ? (
              <div className="no-appointments">
                <p>No appointments found matching your criteria.</p>
              </div>
            ) : (
              <div className="appointments-grid">
                {filteredAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-header">
                      <h4>{appointment.title}</h4>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="appointment-details">
                      <p><strong>Patient:</strong> {appointment.patientName}</p>
                      <p><strong>Date & Time:</strong> {formatDateTime(appointment.appointmentDateTime)}</p>
                      <p><strong>Description:</strong> {appointment.description}</p>
                      {appointment.comments && (
                        <p><strong>Comments:</strong> {appointment.comments}</p>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <div className="post-appointment-info">
                          {appointment.cost && <p><strong>Cost:</strong> {appointment.cost}</p>}
                          {appointment.treatment && <p><strong>Treatment:</strong> {appointment.treatment}</p>}
                          {appointment.nextDate && (
                            <p><strong>Next Appointment:</strong> {formatDateTime(appointment.nextDate)}</p>
                          )}
                          {appointment.files.length > 0 && (
                            <p><strong>Files:</strong> {appointment.files.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="appointment-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(appointment)}
                        title="Edit Appointment"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(appointment.id)}
                        title="Delete Appointment"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;
