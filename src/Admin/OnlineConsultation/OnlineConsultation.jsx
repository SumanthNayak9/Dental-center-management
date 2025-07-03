import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../../contexts';
import './OnlineConsultation.css';

const OnlineConsultation = ({ user, onLogout, onBack, userRole }) => {
  const { patients } = useData();
  const [consultationMode, setConsultationMode] = useState('chat'); // 'chat', 'voice', 'video'
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentView, setCurrentView] = useState(userRole === 'patient' ? 'booking' : (userRole === 'admin' ? 'patient-selection' : 'consultation')); // Start with patient selection for admins
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // For admin to select patient
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('chat');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [hasActiveAppointment, setHasActiveAppointment] = useState(false); // Track if patient has booked appointment
  const [bookedAppointmentDetails, setBookedAppointmentDetails] = useState(null);
  const [activeConsultation, setActiveConsultation] = useState(null); // Track active consultation for admin
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize messages when consultation starts
  useEffect(() => {
    if ((userRole === 'admin' && selectedPatient) || (userRole === 'patient' && hasActiveAppointment)) {
      const initialMessage = {
        id: 1,
        sender: userRole === 'patient' ? 'Dr. Rajesh Mehta' : (selectedPatient?.name || 'Patient'),
        message: userRole === 'admin' 
          ? `Hello Dr. ${user?.name || user?.email || 'Doctor'}! Thank you for initiating this consultation.`
          : 'Hello! How can I help you today?',
        timestamp: new Date().toLocaleTimeString(),
        isDoctor: userRole === 'patient'
      };
      setMessages([initialMessage]);
    }
  }, [selectedPatient, hasActiveAppointment, userRole, user]);

  const availableDoctors = [
    { 
      id: 1, 
      name: 'Dr. Rajesh Mehta', 
      specialty: 'General Dentistry', 
      status: 'online',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 500,
      availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    { 
      id: 2, 
      name: 'Dr. Priya Singh', 
      specialty: 'Orthodontics', 
      status: 'online',
      experience: '12 years',
      rating: 4.7,
      consultationFee: 600,
      availableSlots: ['10:00', '11:00', '12:00', '15:00', '16:00']
    },
    { 
      id: 3, 
      name: 'Dr. Michael Johnson', 
      specialty: 'Oral Surgery', 
      status: 'busy',
      experience: '20 years',
      rating: 4.9,
      consultationFee: 800,
      availableSlots: ['09:00', '14:00', '15:00']
    },
    { 
      id: 4, 
      name: 'Dr. Sarah Smith', 
      specialty: 'Cosmetic Dentistry', 
      status: 'online',
      experience: '10 years',
      rating: 4.6,
      consultationFee: 700,
      availableSlots: ['11:00', '12:00', '14:00', '16:00', '17:00']
    }
  ];

  const patientQueue = [
    { id: 1, name: 'John Smith', appointmentTime: '10:00 AM', status: 'waiting' },
    { id: 2, name: 'Emma Johnson', appointmentTime: '10:30 AM', status: 'in-call' },
    { id: 3, name: 'Michael Brown', appointmentTime: '11:00 AM', status: 'waiting' },
    { id: 4, name: 'Priya Sharma', appointmentTime: '11:30 AM', status: 'scheduled' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startCall = async (mode) => {
    setConsultationMode(mode);
    setIsCallActive(true);
    
    try {
      const constraints = {
        audio: true,
        video: mode === 'video'
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      
      if (localVideoRef.current && mode === 'video') {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simulate remote video stream (in real app, this would come from WebRTC)
      setTimeout(() => {
        if (remoteVideoRef.current && mode === 'video') {
          try {
            // Create a canvas element to simulate remote video
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 240;
            const ctx = canvas.getContext('2d');
            
            // Draw a simple placeholder
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            
            const displayName = userRole === 'admin' 
              ? (selectedPatient?.name || 'Patient')
              : 'Dr. Rajesh Mehta';
            
            ctx.fillText(displayName, canvas.width / 2, canvas.height / 2);
            
            const simulatedStream = canvas.captureStream();
            remoteVideoRef.current.srcObject = simulatedStream;
          } catch (canvasError) {
            console.warn('Could not create simulated video stream:', canvasError);
          }
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setIsCallActive(false);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const endCall = () => {
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCallActive(false);
      setConsultationMode('chat');
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error('Error ending call:', error);
      // Still set the state even if there's an error
      setIsCallActive(false);
      setConsultationMode('chat');
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: userRole === 'admin' ? `Dr. ${user?.name || user?.email || 'Doctor'}` : (user?.name || user?.email || 'Patient'),
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isDoctor: userRole === 'admin'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: userRole === 'admin' ? (selectedPatient?.name || 'Patient') : 'Dr. Rajesh Mehta',
          message: userRole === 'admin' 
            ? 'Thank you doctor. I appreciate you taking the time to consult with me.'
            : 'Thank you for that information. Let me review and get back to you.',
          timestamp: new Date().toLocaleTimeString(),
          isDoctor: userRole === 'patient'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#28a745';
      case 'busy': return '#ffc107';
      case 'offline': return '#6c757d';
      case 'waiting': return '#17a2b8';
      case 'in-call': return '#28a745';
      case 'scheduled': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  // Appointment booking functions
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView('booking');
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && consultationType) {
      // Store the appointment details
      const appointmentDetails = {
        doctor: selectedDoctor.name,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        patient: user.name || user.email,
        fee: selectedDoctor.consultationFee
      };
      
      setBookedAppointmentDetails(appointmentDetails);
      setHasActiveAppointment(true);
      
      console.log('Booking appointment:', appointmentDetails);
      
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setCurrentView('consultation');
        // Don't clear selected doctor as we need it for consultation
      }, 3000);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getNext7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    return dates;
  };

  // Appointment booking render function
  const renderAppointmentBooking = () => (
    <div className="booking-container">
      <div className="booking-header">
        {userRole !== 'patient' && (
          <button onClick={() => setCurrentView('consultation')} className="back-btn">← Back to Consultation</button>
        )}
        <h2>{selectedDoctor ? `Book Consultation with ${selectedDoctor.name}` : 'Select a Doctor for Consultation'}</h2>
      </div>

      {!selectedDoctor ? (
        <div className="doctor-selection">
          <h3>Choose a Doctor</h3>
          <p>Please select a doctor to book your consultation appointment.</p>
          <div className="doctors-grid">
            {availableDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-selection-card">
                <div className="doctor-avatar">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="doctor-info">
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <p>Experience: {doctor.experience}</p>
                  <p className="doctor-rating">⭐ {doctor.rating}/5</p>
                  <p className="doctor-fee">₹{doctor.consultationFee}</p>
                  <div className="doctor-status">
                    <span 
                      className="status-dot" 
                      style={{ backgroundColor: getStatusColor(doctor.status) }}
                    ></span>
                    {doctor.status}
                  </div>
                  <button 
                    className="select-doctor-btn"
                    onClick={() => setSelectedDoctor(doctor)}
                    disabled={doctor.status === 'busy'}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : bookingSuccess ? (
        <div className="booking-success">
          <div className="success-icon">✅</div>
          <h3>Appointment Booked Successfully!</h3>
          <p>Your consultation with {selectedDoctor.name} has been scheduled for {selectedDate} at {selectedTime}</p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      ) : (
        <div className="booking-form">
          <div className="doctor-summary">
            <div className="doctor-avatar">
              {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="doctor-details">
              <h3>{selectedDoctor.name}</h3>
              <p>{selectedDoctor.specialty}</p>
              <p>Experience: {selectedDoctor.experience}</p>
              <p>Rating: ⭐ {selectedDoctor.rating}/5</p>
              <p>Consultation Fee: ₹{selectedDoctor.consultationFee}</p>
            </div>
          </div>

          <div className="booking-fields">
            <div className="field-group">
              <label>Select Date</label>
              <select 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="booking-select"
              >
                <option value="">Choose a date</option>
                {getNext7Days().map(date => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Select Time</label>
              <div className="time-slots">
                {selectedDoctor.availableSlots.map(slot => (
                  <button
                    key={slot}
                    className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label>Consultation Type</label>
              <div className="consultation-types">
                <button
                  className={`type-btn ${consultationType === 'chat' ? 'selected' : ''}`}
                  onClick={() => setConsultationType('chat')}
                >
                  💬 Chat
                </button>
                <button
                  className={`type-btn ${consultationType === 'voice' ? 'selected' : ''}`}
                  onClick={() => setConsultationType('voice')}
                >
                  📞 Voice Call
                </button>
                <button
                  className={`type-btn ${consultationType === 'video' ? 'selected' : ''}`}
                  onClick={() => setConsultationType('video')}
                >
                  📹 Video Call
                </button>
              </div>
            </div>

            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
              <p><strong>Date:</strong> {selectedDate || 'Not selected'}</p>
              <p><strong>Time:</strong> {selectedTime || 'Not selected'}</p>
              <p><strong>Type:</strong> {consultationType}</p>
              <p><strong>Fee:</strong> ₹{selectedDoctor.consultationFee}</p>
            </div>

            <button 
              className="book-btn"
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime || !consultationType}
            >
              Book Appointment - ₹{selectedDoctor.consultationFee}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const handlePatientSelection = (patient) => {
    if (!patient) {
      console.error('No patient selected');
      return;
    }
    
    setSelectedPatient(patient);
    setActiveConsultation({
      patient: patient,
      doctor: user?.name || user?.email || 'Dr. Admin',
      startTime: new Date().toLocaleTimeString(),
      type: 'direct' // Direct consultation initiated by doctor
    });
    setCurrentView('consultation');
  };

  const endConsultation = () => {
    setSelectedPatient(null);
    setActiveConsultation(null);
    setMessages([]);
    setIsCallActive(false);
    setCurrentView('patient-selection');
  };

  // Patient selection render function for admins
  const renderPatientSelection = () => (
    <div className="patient-selection-container">
      <div className="selection-header">
        <h2>Select a Patient for Consultation</h2>
        <p>Choose a patient to initiate an online consultation</p>
      </div>
      
      <div className="patients-grid">
        {patients && patients.length > 0 ? patients.map(patient => (
          <div key={patient.id} className="patient-selection-card">
            <div className="patient-avatar">
              {patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}
            </div>
            <div className="patient-info">
              <h4>{patient.name || 'Unknown Patient'}</h4>
              <p>Age: {patient.age || 'N/A'}</p>
              <p>Phone: {patient.phone || 'N/A'}</p>
              <p>Email: {patient.email || 'N/A'}</p>
              <p>Last Visit: {patient.lastVisit || 'No previous visits'}</p>
              {patient.nextAppointment && (
                <p className="next-appointment">
                  Next Appointment: {patient.nextAppointment}
                </p>
              )}
              <div className="patient-status">
                <span className="status-dot" style={{ backgroundColor: '#28a745' }}></span>
                Available for consultation
              </div>
              <button 
                className="start-consultation-btn"
                onClick={() => handlePatientSelection(patient)}
              >
                Start Consultation
              </button>
            </div>
          </div>
        )) : (
          <div className="no-patients">
            <p>No patients available for consultation at the moment.</p>
          </div>
        )}
      </div>
      
      {patients && patients.length === 0 && (
        <div className="no-patients">
          <p>No patients available for consultation at the moment.</p>
        </div>
      )}
    </div>
  );

  // Handle different views
  if (currentView === 'patient-selection') {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={onBack} className="back-btn">← Back</button>
              <h1>Start Patient Consultation</h1>
            </div>
            <div className="user-info">
              <span>Welcome, Dr. {user.name || user.email}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </header>
        <main className="consultation-main">
          {renderPatientSelection()}
        </main>
      </div>
    );
  }

  if (currentView === 'booking') {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={onBack} className="back-btn">← Back</button>
              <h1>Book Consultation</h1>
            </div>
            <div className="user-info">
              <span>Welcome, {user.email}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </header>
        <main className="consultation-main">
          {renderAppointmentBooking()}
        </main>
      </div>
    );
  }

  // For patients, check if they have an active appointment before showing consultation
  if (userRole === 'patient' && !hasActiveAppointment) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={onBack} className="back-btn">← Back</button>
              <h1>Online Consultation</h1>
            </div>
            <div className="user-info">
              <span>Welcome, {user.email}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </header>
        <main className="consultation-main">
          <div className="no-appointment-message">
            <div className="appointment-required">
              <div className="appointment-icon">📅</div>
              <h2>Appointment Required</h2>
              <p>You need to book an appointment with a doctor before you can start a consultation.</p>
              <p>Please select a doctor and schedule your appointment to continue.</p>
              <button 
                className="book-appointment-btn"
                onClick={() => setCurrentView('booking')}
              >
                Book Appointment Now
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={userRole === 'admin' ? endConsultation : onBack} className="back-btn">
              ← {userRole === 'admin' ? 'End Consultation' : 'Back'}
            </button>
            <h1>Online Consultation</h1>
            {activeConsultation && userRole === 'admin' && (
              <div className="consultation-info">
                <span>Consulting with {activeConsultation.patient.name} - Started at {activeConsultation.startTime}</span>
              </div>
            )}
            {bookedAppointmentDetails && userRole === 'patient' && (
              <div className="appointment-info">
                <span>Appointment with {bookedAppointmentDetails.doctor} at {bookedAppointmentDetails.time}</span>
              </div>
            )}
          </div>
          <div className="user-info">
            <span>Welcome, {userRole === 'admin' ? `Dr. ${user.name || user.email}` : user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="consultation-main">
        <div className="consultation-layout">
          {/* Sidebar - Doctors list for patients, Patient queue for doctors */}
          <div className="consultation-sidebar">
            {userRole === 'patient' ? (
              <>
                <h3>Available Doctors</h3>
                <div className="doctors-list">
                  {availableDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-avatar">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="doctor-info">
                        <div className="doctor-name">{doctor.name}</div>
                        <div className="doctor-specialty">{doctor.specialty}</div>
                        <div className="doctor-rating">⭐ {doctor.rating}/5</div>
                        <div className="doctor-fee">₹{doctor.consultationFee}</div>
                        <div className="doctor-status">
                          <span 
                            className="status-dot" 
                            style={{ backgroundColor: getStatusColor(doctor.status) }}
                          ></span>
                          {doctor.status}
                        </div>
                        <button 
                          className="book-consultation-btn"
                          onClick={() => handleDoctorSelect(doctor)}
                          disabled={doctor.status === 'busy'}
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3>Current Consultation</h3>
                {selectedPatient ? (
                  <div className="current-patient-info">
                    <div className="patient-card">
                      <div className="patient-avatar">
                        {selectedPatient.name ? selectedPatient.name.split(' ').map(n => n[0]).join('') : 'P'}
                      </div>
                      <div className="patient-details">
                        <h4>{selectedPatient.name || 'Unknown Patient'}</h4>
                        <p>Age: {selectedPatient.age || 'N/A'}</p>
                        <p>Phone: {selectedPatient.phone || 'N/A'}</p>
                        <p>Email: {selectedPatient.email || 'N/A'}</p>
                        {selectedPatient.medicalHistory && (
                          <div className="medical-info">
                            <p><strong>Medical History:</strong></p>
                            <p>{selectedPatient.medicalHistory}</p>
                          </div>
                        )}
                        {selectedPatient.allergies && (
                          <div className="allergies-info">
                            <p><strong>Allergies:</strong></p>
                            <p>{selectedPatient.allergies}</p>
                          </div>
                        )}
                        {selectedPatient.currentSymptoms && (
                          <div className="symptoms">
                            <p><strong>Current Symptoms:</strong></p>
                            <p>{selectedPatient.currentSymptoms}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="consultation-controls">
                      <h4>Consultation Tools</h4>
                      <button 
                        className="tool-btn"
                        onClick={() => startCall('voice')}
                        disabled={isCallActive}
                      >
                        📞 Start Voice Call
                      </button>
                      <button 
                        className="tool-btn"
                        onClick={() => startCall('video')}
                        disabled={isCallActive}
                      >
                        📹 Start Video Call
                      </button>
                      <button 
                        className="tool-btn end-call"
                        onClick={endConsultation}
                      >
                        ❌ End Consultation
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="no-patient-selected">
                    <p>No patient selected for consultation</p>
                    <button 
                      className="select-patient-btn"
                      onClick={() => setCurrentView('patient-selection')}
                    >
                      Select Patient
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Main consultation area */}
          <div className="consultation-content">
            {/* Video call area */}
            {isCallActive && (consultationMode === 'video' || consultationMode === 'voice') && (
              <div className="video-call-area">
                {consultationMode === 'video' && (
                  <div className="video-container">
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      className="remote-video"
                      muted={false}
                    />
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      className="local-video"
                    />
                  </div>
                )}
                
                {consultationMode === 'voice' && (
                  <div className="voice-call-container">
                    <div className="voice-call-info">
                      <div className="caller-avatar">
                        {userRole === 'patient' ? 'DM' : (selectedPatient ? selectedPatient.name.split(' ').map(n => n[0]).join('') : 'P')}
                      </div>
                      <h3>
                        {userRole === 'patient' 
                          ? 'Dr. Rajesh Mehta' 
                          : (selectedPatient ? selectedPatient.name : 'Patient')
                        }
                      </h3>
                      <p>Voice call in progress...</p>
                    </div>
                  </div>
                )}

                <div className="call-controls">
                  <button 
                    className={`control-btn ${isMuted ? 'muted' : ''}`}
                    onClick={toggleMute}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                  
                  {consultationMode === 'video' && (
                    <button 
                      className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
                      onClick={toggleVideo}
                    >
                      {isVideoOff ? '📹' : '📸'}
                    </button>
                  )}
                  
                  <button className="control-btn end-call" onClick={endCall}>
                    📞
                  </button>
                </div>
              </div>
            )}

            {/* Chat area */}
            <div className={`chat-area ${isCallActive ? 'with-call' : ''}`}>
              <div className="chat-header">
                <h3>
                  Chat with {userRole === 'patient' 
                    ? 'Dr. Rajesh Mehta' 
                    : (selectedPatient ? selectedPatient.name : 'Patient')
                  }
                </h3>
                <div className="call-buttons">
                  <button 
                    className="call-btn voice-btn"
                    onClick={() => startCall('voice')}
                    disabled={isCallActive}
                  >
                    📞 Voice Call
                  </button>
                  <button 
                    className="call-btn video-btn"
                    onClick={() => startCall('video')}
                    disabled={isCallActive}
                  >
                    📹 Video Call
                  </button>
                </div>
              </div>

              <div className="messages-container">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.isDoctor ? 'doctor-message' : 'patient-message'}`}
                  >
                    <div className="message-sender">{message.sender}</div>
                    <div className="message-content">{message.message}</div>
                    <div className="message-time">{message.timestamp}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="message-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button type="submit" className="send-btn">Send</button>
              </form>
            </div>

            {/* Appointment booking view */}
            {currentView === 'booking' && renderAppointmentBooking()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnlineConsultation;
