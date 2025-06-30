import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  patients: [],
  appointments: [],
  incidents: [],
  loading: false,
  error: null
};

// Action types
const DATA_ACTIONS = {
  SET_PATIENTS: 'SET_PATIENTS',
  ADD_PATIENT: 'ADD_PATIENT',
  UPDATE_PATIENT: 'UPDATE_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',
  SET_APPOINTMENTS: 'SET_APPOINTMENTS',
  ADD_APPOINTMENT: 'ADD_APPOINTMENT',
  UPDATE_APPOINTMENT: 'UPDATE_APPOINTMENT',
  DELETE_APPOINTMENT: 'DELETE_APPOINTMENT',
  SET_INCIDENTS: 'SET_INCIDENTS',
  ADD_INCIDENT: 'ADD_INCIDENT',
  UPDATE_INCIDENT: 'UPDATE_INCIDENT',
  DELETE_INCIDENT: 'DELETE_INCIDENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Data reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case DATA_ACTIONS.SET_PATIENTS:
      return { ...state, patients: action.payload };
    case DATA_ACTIONS.ADD_PATIENT:
      return { ...state, patients: [...state.patients, action.payload] };
    case DATA_ACTIONS.UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        )
      };
    case DATA_ACTIONS.DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id !== action.payload)
      };
    case DATA_ACTIONS.SET_APPOINTMENTS:
      return { ...state, appointments: action.payload };
    case DATA_ACTIONS.ADD_APPOINTMENT:
      return { ...state, appointments: [...state.appointments, action.payload] };
    case DATA_ACTIONS.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        )
      };
    case DATA_ACTIONS.DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload)
      };
    case DATA_ACTIONS.SET_INCIDENTS:
      return { ...state, incidents: action.payload };
    case DATA_ACTIONS.ADD_INCIDENT:
      return { ...state, incidents: [...state.incidents, action.payload] };
    case DATA_ACTIONS.UPDATE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? action.payload : incident
        )
      };
    case DATA_ACTIONS.DELETE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.filter(incident => incident.id !== action.payload)
      };
    case DATA_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case DATA_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case DATA_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const DataContext = createContext();

// Data provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Initialize data from localStorage
  useEffect(() => {
    try {
      const storedPatients = localStorage.getItem('patients');
      const storedAppointments = localStorage.getItem('appointments');
      const storedIncidents = localStorage.getItem('incidents');

      if (storedPatients) {
        dispatch({ type: DATA_ACTIONS.SET_PATIENTS, payload: JSON.parse(storedPatients) });
      } else {
        // Initialize with default patients if none exist
        initializeDefaultData();
      }

      if (storedAppointments) {
        dispatch({ type: DATA_ACTIONS.SET_APPOINTMENTS, payload: JSON.parse(storedAppointments) });
      }

      if (storedIncidents) {
        dispatch({ type: DATA_ACTIONS.SET_INCIDENTS, payload: JSON.parse(storedIncidents) });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      dispatch({ type: DATA_ACTIONS.SET_ERROR, payload: 'Failed to load data' });
    }
  }, []);

  // Initialize default data
  const initializeDefaultData = () => {
    const defaultPatients = [
      {
        id: 1,
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 9876543210',
        age: 30,
        address: '123 MG Road, Bangalore, Karnataka 560001',
        medicalHistory: 'No major issues, regular checkups',
        lastVisit: '2024-01-15',
        nextAppointment: '2024-02-15',
        totalBill: 28000,
        password: 'priya123',
        appointments: [
          { id: 1, date: '2024-02-15', time: '10:00 AM', type: 'Cleaning', status: 'Scheduled' },
          { id: 2, date: '2024-01-15', time: '2:00 PM', type: 'Checkup', status: 'Completed' }
        ],
        treatmentHistory: [
          { id: 1, date: '2024-01-15', treatment: 'Routine Cleaning', cost: 3000, doctor: 'Dr. Mehta' },
          { id: 2, date: '2023-12-10', treatment: 'Root Canal', cost: 25000, doctor: 'Dr. Mehta' }
        ],
        billingHistory: [
          { id: 1, date: '2024-01-15', amount: 3000, description: 'Routine Cleaning', status: 'Paid' },
          { id: 2, date: '2023-12-10', amount: 25000, description: 'Root Canal', status: 'Paid' }
        ]
      },
      {
        id: 2,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 9876543220',
        age: 40,
        address: '456 Brigade Road, Bangalore, Karnataka 560025',
        medicalHistory: 'Diabetes, requires special care',
        lastVisit: '2024-01-20',
        nextAppointment: '2024-02-20',
        totalBill: 5000,
        password: 'rajesh123',
        appointments: [
          { id: 3, date: '2024-02-20', time: '3:00 PM', type: 'Teeth Whitening', status: 'Scheduled' },
          { id: 4, date: '2024-01-20', time: '11:00 AM', type: 'Consultation', status: 'Completed' }
        ],
        treatmentHistory: [
          { id: 3, date: '2024-01-20', treatment: 'Orthodontic Consultation', cost: 5000, doctor: 'Dr. Singh' }
        ],
        billingHistory: [
          { id: 3, date: '2024-01-20', amount: 5000, description: 'Orthodontic Consultation', status: 'Paid' }
        ]
      },
      {
        id: 3,
        name: 'Anita Desai',
        email: 'anita.desai@email.com',
        phone: '+91 9876543230',
        age: 47,
        address: '789 Commercial Street, Bangalore, Karnataka 560001',
        medicalHistory: 'Sensitive teeth, allergic to certain medications',
        lastVisit: '2024-01-25',
        nextAppointment: '2024-02-25',
        totalBill: 48000,
        password: 'anita123',
        appointments: [
          { id: 5, date: '2024-02-25', time: '4:00 PM', type: 'Crown Placement', status: 'Scheduled' },
          { id: 6, date: '2024-01-25', time: '1:00 PM', type: 'Crown Preparation', status: 'Completed' }
        ],
        treatmentHistory: [
          { id: 5, date: '2024-01-25', treatment: 'Crown Preparation', cost: 18000, doctor: 'Dr. Mehta' },
          { id: 6, date: '2024-01-10', treatment: 'Crown Placement', cost: 30000, doctor: 'Dr. Mehta' }
        ],
        billingHistory: [
          { id: 5, date: '2024-01-25', amount: 18000, description: 'Crown Preparation', status: 'Paid' },
          { id: 6, date: '2024-01-10', amount: 30000, description: 'Crown Placement', status: 'Pending' }
        ]
      }
    ];

    dispatch({ type: DATA_ACTIONS.SET_PATIENTS, payload: defaultPatients });
    localStorage.setItem('patients', JSON.stringify(defaultPatients));
  };

  // Patient actions
  const addPatient = (patient) => {
    const newPatient = { ...patient, id: Date.now() };
    dispatch({ type: DATA_ACTIONS.ADD_PATIENT, payload: newPatient });
    updateLocalStorage('patients', [...state.patients, newPatient]);
  };

  const updatePatient = (updatedPatient) => {
    dispatch({ type: DATA_ACTIONS.UPDATE_PATIENT, payload: updatedPatient });
    const updatedPatients = state.patients.map(patient =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
    updateLocalStorage('patients', updatedPatients);
  };

  const deletePatient = (patientId) => {
    dispatch({ type: DATA_ACTIONS.DELETE_PATIENT, payload: patientId });
    const filteredPatients = state.patients.filter(patient => patient.id !== patientId);
    updateLocalStorage('patients', filteredPatients);
  };

  // Appointment actions
  const addAppointment = (appointment) => {
    const newAppointment = { ...appointment, id: Date.now() };
    dispatch({ type: DATA_ACTIONS.ADD_APPOINTMENT, payload: newAppointment });
    updateLocalStorage('appointments', [...state.appointments, newAppointment]);
  };

  const updateAppointment = (updatedAppointment) => {
    dispatch({ type: DATA_ACTIONS.UPDATE_APPOINTMENT, payload: updatedAppointment });
    const updatedAppointments = state.appointments.map(appointment =>
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    );
    updateLocalStorage('appointments', updatedAppointments);
  };

  const deleteAppointment = (appointmentId) => {
    dispatch({ type: DATA_ACTIONS.DELETE_APPOINTMENT, payload: appointmentId });
    const filteredAppointments = state.appointments.filter(appointment => appointment.id !== appointmentId);
    updateLocalStorage('appointments', filteredAppointments);
  };

  // Incident actions
  const addIncident = (incident) => {
    const newIncident = { ...incident, id: Date.now() };
    dispatch({ type: DATA_ACTIONS.ADD_INCIDENT, payload: newIncident });
    updateLocalStorage('incidents', [...state.incidents, newIncident]);
  };

  const updateIncident = (updatedIncident) => {
    dispatch({ type: DATA_ACTIONS.UPDATE_INCIDENT, payload: updatedIncident });
    const updatedIncidents = state.incidents.map(incident =>
      incident.id === updatedIncident.id ? updatedIncident : incident
    );
    updateLocalStorage('incidents', updatedIncidents);
  };

  const deleteIncident = (incidentId) => {
    dispatch({ type: DATA_ACTIONS.DELETE_INCIDENT, payload: incidentId });
    const filteredIncidents = state.incidents.filter(incident => incident.id !== incidentId);
    updateLocalStorage('incidents', filteredIncidents);
  };

  // Utility function to update localStorage
  const updateLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error updating ${key} in localStorage:`, error);
      dispatch({ type: DATA_ACTIONS.SET_ERROR, payload: `Failed to save ${key}` });
    }
  };

  // Error handling
  const clearError = () => {
    dispatch({ type: DATA_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    ...state,
    // Patient actions
    addPatient,
    updatePatient,
    deletePatient,
    // Appointment actions
    addAppointment,
    updateAppointment,
    deleteAppointment,
    // Incident actions
    addIncident,
    updateIncident,
    deleteIncident,
    // Utility actions
    clearError
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
