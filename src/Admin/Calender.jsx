import React, { useState } from 'react';

const Calendar = ({ user, onLogout, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('monthly'); // 'monthly' or 'weekly'

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      date: '2025-06-30',
      time: '09:00',
      patient: 'John Smith',
      treatment: 'Dental Cleaning',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2025-06-30',
      time: '11:00',
      patient: 'Emma Johnson',
      treatment: 'Root Canal',
      status: 'confirmed'
    },
    {
      id: 3,
      date: '2025-07-01',
      time: '14:00',
      patient: 'Michael Brown',
      treatment: 'Teeth Whitening',
      status: 'pending'
    },
    {
      id: 4,
      date: '2025-07-02',
      time: '10:30',
      patient: 'Sarah Davis',
      treatment: 'Cavity Filling',
      status: 'confirmed'
    },
    {
      id: 5,
      date: '2025-07-03',
      time: '16:00',
      patient: 'David Wilson',
      treatment: 'Dental Checkup',
      status: 'confirmed'
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date);
    return appointments.filter(apt => apt.date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const isSelected = selectedDate && selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${dayAppointments.length > 0 ? 'has-appointments' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {dayAppointments.length > 0 && (
            <div className="appointment-indicator">
              <span className="appointment-count">{dayAppointments.length}</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderAppointments = () => {
    if (!selectedDate) {
      return (
        <div className="appointments-placeholder">
          <p>Click on a date to view scheduled appointments</p>
        </div>
      );
    }

    const dayAppointments = getAppointmentsForDate(selectedDate);
    
    if (dayAppointments.length === 0) {
      return (
        <div className="no-appointments">
          <h3>No appointments for {selectedDate.toLocaleDateString()}</h3>
          <p>No appointments scheduled for this date.</p>
        </div>
      );
    }

    return (
      <div className="appointments-list">
        <h3>Appointments for {selectedDate.toLocaleDateString()}</h3>
        {dayAppointments.map(appointment => (
          <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
            <div className="appointment-time">{appointment.time}</div>
            <div className="appointment-details">
              <div className="patient-name">{appointment.patient}</div>
              <div className="treatment-name">{appointment.treatment}</div>
            </div>
            <div className={`appointment-status ${appointment.status}`}>
              {appointment.status}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-btn">← Back</button>
            <h1>Calendar & Appointments</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="calendar-main">
        <div className="calendar-container">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button onClick={goToPreviousMonth} className="nav-btn">‹</button>
              <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={goToNextMonth} className="nav-btn">›</button>
            </div>
            <div className="view-toggle">
              <button 
                className={`view-btn ${view === 'monthly' ? 'active' : ''}`}
                onClick={() => setView('monthly')}
              >
                Month
              </button>
              <button 
                className={`view-btn ${view === 'weekly' ? 'active' : ''}`}
                onClick={() => setView('weekly')}
              >
                Week
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {weekdays.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        <div className="appointments-panel">
          {renderAppointments()}
        </div>
      </main>
    </div>
  );
};

export default Calendar;