import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  patientProfiles: {},
  loading: false,
  error: null
};

// Action types
const PATIENT_PROFILE_ACTIONS = {
  SET_PATIENT_PROFILES: 'SET_PATIENT_PROFILES',
  UPDATE_PATIENT_PROFILE: 'UPDATE_PATIENT_PROFILE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const patientProfileReducer = (state, action) => {
  switch (action.type) {
    case PATIENT_PROFILE_ACTIONS.SET_PATIENT_PROFILES:
      return { ...state, patientProfiles: action.payload };
    case PATIENT_PROFILE_ACTIONS.UPDATE_PATIENT_PROFILE:
      return {
        ...state,
        patientProfiles: {
          ...state.patientProfiles,
          [action.payload.email]: action.payload
        }
      };
    case PATIENT_PROFILE_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case PATIENT_PROFILE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case PATIENT_PROFILE_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const PatientProfileContext = createContext();

// Provider component
export const PatientProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientProfileReducer, initialState);

  // Initialize patient profiles
  useEffect(() => {
    const initializePatientProfiles = () => {
      const patientProfiles = {
        'priya.sharma@email.com': {
          id: 1,
          name: 'Priya Sharma',
          email: 'priya.sharma@email.com',
          password: 'priya123',
          dob: '1995-03-15',
          phone: '+91 9876543210',
          address: '123 MG Road, Bangalore, Karnataka 560001',
          emergencyContact: 'Rahul Sharma - +91 9876543211',
          bloodType: 'O+',
          allergies: ['Penicillin', 'Latex'],
          insurance: 'Star Health - Policy #SH123456',
          appointments: [
            {
              id: 1,
              date: '2024-07-05',
              time: '09:00 AM',
              treatment: 'Dental Cleaning',
              doctor: 'Dr. Mehta',
              status: 'Confirmed',
              notes: 'Regular checkup and cleaning'
            },
            {
              id: 2,
              date: '2024-07-15',
              time: '02:00 PM',
              treatment: 'Root Canal Follow-up',
              doctor: 'Dr. Mehta',
              status: 'Scheduled',
              notes: 'Follow-up for root canal treatment'
            }
          ],
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-25',
              treatment: 'Root Canal',
              doctor: 'Dr. Mehta',
              notes: 'Root canal treatment on molar. Patient responded well to treatment.',
              prescription: 'Ibuprofen 600mg, Amoxicillin 500mg'
            },
            {
              id: 2,
              date: '2024-05-20',
              treatment: 'Dental Cleaning',
              doctor: 'Dr. Mehta',
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
              doctor: 'Dr. Mehta'
            }
          ],
          bills: [
            {
              id: 1,
              date: '2024-06-25',
              treatment: 'Root Canal',
              amount: 25000.00,
              insurance: 15000.00,
              patientDue: 10000.00,
              status: 'Paid',
              dueDate: '2024-07-25'
            },
            {
              id: 2,
              date: '2024-05-20',
              treatment: 'Dental Cleaning',
              amount: 3000.00,
              insurance: 2500.00,
              patientDue: 500.00,
              status: 'Paid',
              dueDate: '2024-06-20'
            }
          ]
        },
        'rajesh.kumar@email.com': {
          id: 2,
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@email.com',
          password: 'rajesh123',
          dob: '1985-07-22',
          phone: '+91 9876543220',
          address: '456 Brigade Road, Bangalore, Karnataka 560025',
          emergencyContact: 'Sunita Kumar - +91 9876543221',
          bloodType: 'A+',
          allergies: ['None known'],
          insurance: 'HDFC ERGO - Policy #HE789012',
          appointments: [
            {
              id: 3,
              date: '2024-07-08',
              time: '10:30 AM',
              treatment: 'Teeth Whitening',
              doctor: 'Dr. Singh',
              status: 'Confirmed',
              notes: 'Professional whitening treatment'
            }
          ],
          medicalHistory: [
            {
              id: 3,
              date: '2024-06-22',
              treatment: 'Orthodontic Consultation',
              doctor: 'Dr. Singh',
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
              doctor: 'Dr. Singh'
            }
          ],
          bills: [
            {
              id: 3,
              date: '2024-06-22',
              treatment: 'Orthodontic Consultation',
              amount: 5000.00,
              insurance: 2500.00,
              patientDue: 2500.00,
              status: 'Paid',
              dueDate: '2024-07-22'
            }
          ]
        },
        'anita.desai@email.com': {
          id: 3,
          name: 'Anita Desai',
          email: 'anita.desai@email.com',
          password: 'anita123',
          dob: '1978-11-08',
          phone: '+91 9876543230',
          address: '789 Commercial Street, Bangalore, Karnataka 560001',
          emergencyContact: 'Vikram Desai - +91 9876543231',
          bloodType: 'B-',
          allergies: ['Codeine'],
          insurance: 'ICICI Lombard - Policy #IL345678',
          appointments: [
            {
              id: 4,
              date: '2024-07-10',
              time: '11:00 AM',
              treatment: 'Crown Placement',
              doctor: 'Dr. Mehta',
              status: 'Confirmed',
              notes: 'Crown placement for tooth #12'
            },
            {
              id: 5,
              date: '2024-07-25',
              time: '03:30 PM',
              treatment: 'Follow-up Checkup',
              doctor: 'Dr. Mehta',
              status: 'Scheduled',
              notes: 'Post-crown placement checkup'
            }
          ],
          medicalHistory: [
            {
              id: 4,
              date: '2024-06-15',
              treatment: 'Crown Preparation',
              doctor: 'Dr. Mehta',
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
              doctor: 'Dr. Mehta'
            }
          ],
          bills: [
            {
              id: 4,
              date: '2024-06-15',
              treatment: 'Crown Preparation',
              amount: 18000.00,
              insurance: 12000.00,
              patientDue: 6000.00,
              status: 'Paid',
              dueDate: '2024-07-15'
            },
            {
              id: 5,
              date: '2024-07-10',
              treatment: 'Crown Placement',
              amount: 30000.00,
              insurance: 18000.00,
              patientDue: 12000.00,
              status: 'Pending',
              dueDate: '2024-08-10'
            }
          ]
        },
        'john.smith@email.com': {
          id: 4,
          name: 'John Smith',
          email: 'john.smith@email.com',
          password: 'john123',
          dob: '1985-03-15',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, Springfield, IL 62701',
          emergencyContact: 'Jane Smith - (555) 123-4568',
          bloodType: 'O+',
          allergies: ['Penicillin', 'Latex'],
          insurance: 'Blue Cross Blue Shield - Policy #BCBS789012',
          appointments: [
            {
              id: 6,
              date: '2024-07-05',
              time: '09:00 AM',
              treatment: 'Dental Cleaning',
              doctor: 'Dr. Johnson',
              status: 'Confirmed',
              notes: 'Regular cleaning and checkup'
            },
            {
              id: 7,
              date: '2024-07-15',
              time: '02:00 PM',
              treatment: 'Root Canal Follow-up',
              doctor: 'Dr. Johnson',
              status: 'Scheduled',
              notes: 'Follow-up for previous root canal treatment'
            }
          ],
          medicalHistory: [
            {
              id: 5,
              date: '2024-06-25',
              treatment: 'Root Canal',
              doctor: 'Dr. Johnson',
              notes: 'Root canal treatment on upper molar. Hypertension monitored during procedure.',
              prescription: 'Amoxicillin 500mg, Ibuprofen 600mg'
            },
            {
              id: 6,
              date: '2024-05-20',
              treatment: 'Dental Cleaning',
              doctor: 'Dr. Johnson',
              notes: 'Routine cleaning completed. Patient maintains good oral hygiene.',
              prescription: 'None'
            }
          ],
          treatmentPlans: [
            {
              id: 4,
              title: 'Post Root Canal Care',
              startDate: '2024-06-25',
              endDate: '2024-12-25',
              treatments: ['Root Canal Follow-up', 'Crown Evaluation', 'Regular Cleanings'],
              progress: 40,
              doctor: 'Dr. Johnson'
            }
          ],
          bills: [
            {
              id: 6,
              date: '2024-06-25',
              treatment: 'Root Canal',
              amount: 1250.00,
              insurance: 750.00,
              patientDue: 500.00,
              status: 'Paid',
              dueDate: '2024-07-25'
            },
            {
              id: 7,
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
          id: 5,
          name: 'Emma Johnson',
          email: 'emma.johnson@email.com',
          password: 'emma123',
          dob: '1990-07-22',
          phone: '+1 (555) 234-5678',
          address: '456 Oak Ave, Springfield, IL 62702',
          emergencyContact: 'Michael Johnson - (555) 234-5679',
          bloodType: 'A+',
          allergies: ['None known'],
          insurance: 'Aetna - Policy #AET456789',
          appointments: [
            {
              id: 8,
              date: '2024-07-08',
              time: '10:30 AM',
              treatment: 'Teeth Whitening',
              doctor: 'Dr. Smith',
              status: 'Confirmed',
              notes: 'Professional teeth whitening treatment'
            }
          ],
          medicalHistory: [
            {
              id: 7,
              date: '2024-06-22',
              treatment: 'Orthodontic Consultation',
              doctor: 'Dr. Smith',
              notes: 'Consultation for cosmetic improvements. Patient interested in whitening and minor alignment.',
              prescription: 'None'
            }
          ],
          treatmentPlans: [
            {
              id: 5,
              title: 'Cosmetic Enhancement',
              startDate: '2024-07-01',
              endDate: '2024-09-01',
              treatments: ['Teeth Whitening', 'Cosmetic Evaluation', 'Follow-up Care'],
              progress: 25,
              doctor: 'Dr. Smith'
            }
          ],
          bills: [
            {
              id: 8,
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
          id: 6,
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          password: 'michael123',
          dob: '1978-11-08',
          phone: '+1 (555) 345-6789',
          address: '789 Pine St, Springfield, IL 62703',
          emergencyContact: 'Sarah Brown - (555) 345-6780',
          bloodType: 'B-',
          allergies: ['Codeine'],
          insurance: 'Cigna - Policy #CIG123456',
          appointments: [
            {
              id: 9,
              date: '2024-07-10',
              time: '11:00 AM',
              treatment: 'Crown Placement',
              doctor: 'Dr. Johnson',
              status: 'Confirmed',
              notes: 'Crown placement for prepared tooth'
            },
            {
              id: 10,
              date: '2024-07-25',
              time: '03:30 PM',
              treatment: 'Follow-up Checkup',
              doctor: 'Dr. Johnson',
              status: 'Scheduled',
              notes: 'Post-crown placement evaluation'
            }
          ],
          medicalHistory: [
            {
              id: 8,
              date: '2024-06-15',
              treatment: 'Crown Preparation',
              doctor: 'Dr. Johnson',
              notes: 'Crown preparation for damaged molar. Diabetes management discussed.',
              prescription: 'Amoxicillin 500mg (adjusted for diabetes)'
            }
          ],
          treatmentPlans: [
            {
              id: 6,
              title: 'Diabetic-Friendly Dental Care',
              startDate: '2024-06-01',
              endDate: '2024-12-01',
              treatments: ['Crown Placement', 'Diabetic Monitoring', 'Regular Check-ups'],
              progress: 60,
              doctor: 'Dr. Johnson'
            }
          ],
          bills: [
            {
              id: 9,
              date: '2024-06-15',
              treatment: 'Crown Preparation',
              amount: 800.00,
              insurance: 500.00,
              patientDue: 300.00,
              status: 'Paid',
              dueDate: '2024-07-15'
            },
            {
              id: 10,
              date: '2024-07-10',
              treatment: 'Crown Placement',
              amount: 1200.00,
              insurance: 700.00,
              patientDue: 500.00,
              status: 'Pending',
              dueDate: '2024-08-10'
            }          ]
        }
      };

      dispatch({
        type: PATIENT_PROFILE_ACTIONS.SET_PATIENT_PROFILES,
        payload: patientProfiles
      });
    };

    initializePatientProfiles();
  }, []);

  // Update patient profile
  const updatePatientProfile = (email, updatedProfile) => {
    dispatch({
      type: PATIENT_PROFILE_ACTIONS.UPDATE_PATIENT_PROFILE,
      payload: { ...updatedProfile, email }
    });
  };

  // Get patient profile by email
  const getPatientProfile = (email) => {
    return state.patientProfiles[email] || null;
  };

  const value = {
    ...state,
    updatePatientProfile,
    getPatientProfile
  };

  return (
    <PatientProfileContext.Provider value={value}>
      {children}
    </PatientProfileContext.Provider>
  );
};

// Custom hook
export const usePatientProfile = () => {
  const context = useContext(PatientProfileContext);
  if (!context) {
    throw new Error('usePatientProfile must be used within a PatientProfileProvider');
  }
  return context;
};

export default PatientProfileContext;
