# Dental Center Management System

A comprehensive role-based dental center management system built with React.js, featuring separate dashboards for administrators and patients with modern UI/UX design.

## Features

### Admin Dashboard
- **Patient Management**: View, edit, and manage patient records
- **Appointment Management**: Schedule and track appointments
- **Incident Tracking**: Monitor and manage patient incidents
- **Online Consultations**: Initiate consultations with patients (chat, voice, video)
- **Patient Selection**: Choose any patient for direct consultation
- **KPI Dashboard**: Overview of key performance indicators
- **Profile Management**: Edit patient profiles and medical information

### Patient Dashboard
- **Personal Profile**: View and edit personal information
- **Appointment History**: Track past and upcoming appointments
- **Medical Records**: Access medical history and treatment records
- **Incident Reports**: View any reported incidents
- **Online Consultations**: Book appointments and consult with doctors (chat, voice, video)
- **Summary Statistics**: Personal health and visit statistics

### Online Consultation System
- **Bidirectional Communication**: Both doctors and patients can initiate consultations
- **Multiple Communication Modes**: 
  - Text chat for quick questions and follow-ups
  - Voice calls for detailed discussions
  - Video calls for visual examinations
- **Patient Booking System**: Patients can book appointments with available doctors
- **Doctor-Initiated Consultations**: Doctors can directly select and consult with any patient
- **Real-time Messaging**: Instant chat with automated responses for testing
- **Consultation Management**: Track active consultations and appointment history

### Key Features
- **Role-based Authentication**: Separate access for admins and patients
- **Data Isolation**: Patients can only access their own data
- **Bidirectional Online Consultations**: Both doctors and patients can initiate consultations
- **Multi-modal Communication**: Chat, voice, and video consultation options
- **Responsive Design**: Modern, card-based UI that works on all devices
- **Professional Styling**: Consistent design language throughout the application
- **Real-time Updates**: Dynamic data management and updates
- **Indian Rupees Currency**: All pricing displayed in ₹ with proper formatting
- **Context API State Management**: Efficient state management across the application
- **Vercel Analytics Integration**: Built-in analytics for performance tracking

## Login Credentials

### Administrator Access
- **Email**: `admin@entnt.in`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: Full system access, can manage all patients and appointments

### Patient Access

#### Patient 1 - Priya Sharma
- **Email**: `priya.sharma@email.com`
- **Password**: `priya123`
- **Role**: Patient
- **Blood Type**: O+
- **Location**: Bangalore, India
- **Access**: Personal dashboard and data only

#### Patient 2 - Rajesh Kumar
- **Email**: `rajesh.kumar@email.com`
- **Password**: `rajesh123`
- **Role**: Patient
- **Blood Type**: A+
- **Location**: Bangalore, India
- **Access**: Personal dashboard and data only

#### Patient 3 - Anita Desai
- **Email**: `anita.desai@email.com`
- **Password**: `anita123`
- **Role**: Patient
- **Blood Type**: B-
- **Location**: Bangalore, India
- **Access**: Personal dashboard and data only

#### Patient 4 - John Smith
- **Email**: `john.smith@email.com`
- **Password**: `john123`
- **Role**: Patient
- **Blood Type**: O+
- **Location**: Springfield, IL, USA
- **Access**: Personal dashboard and data only

#### Patient 5 - Emma Johnson
- **Email**: `emma.johnson@email.com`
- **Password**: `emma123`
- **Role**: Patient
- **Blood Type**: A+
- **Location**: Springfield, IL, USA
- **Access**: Personal dashboard and data only

#### Patient 6 - Michael Brown
- **Email**: `michael.brown@email.com`
- **Password**: `michael123`
- **Role**: Patient
- **Blood Type**: B-
- **Location**: Springfield, IL, USA
- **Access**: Personal dashboard and data only

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dental-center-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── Admin/
│   ├── AdminDashboard.jsx       # Main admin dashboard
│   ├── AdminDashboard.css       # Unified styling for dashboards
│   ├── Calender.jsx            # Calendar component
│   ├── Patients/
│   │   ├── PatientForm.jsx     # Patient creation/editing form
│   │   └── PatientList.jsx     # Patient management table
│   └── Incidents/
│       ├── IncidentForm.jsx    # Incident reporting form
│       └── IncidentList.jsx    # Incident management
├── Patient/
│   └── PatientDashboard.jsx    # Patient dashboard with profile editing
├── LoginPage.jsx               # Authentication component
├── App.js                      # Main application component
├── App.css                     # Global application styles
└── index.js                    # Application entry point
```

## Technology Stack

- **Frontend**: React.js (Functional Components with Hooks)
- **Styling**: CSS3 with modern design patterns
- **State Management**: React useState and localStorage
- **Authentication**: Role-based with local storage
- **UI/UX**: Card-based design with gradients and animations

## User Experience Features

### Admin Features
- **Patient Table Management** Professional table with action buttons (Incidents, Edit, Delete)
- **All Patients Overview**: Dashboard displays all 6 patients (3 Indian + 3 US patients) with dynamic data
- **Patient Management List**: Complete patient table with all 6 patients, including blood type and allergies
- **KPI Cards**: Visual dashboard with key metrics and total patient count
- **Appointment Scheduling**: Calendar-based appointment management with dynamic patient data
- **Responsive Design**: Optimized for desktop and mobile devices

### Patient Features
- **Profile Editing**: In-place editing with save/cancel functionality
- **Summary Dashboard**: Personal statistics and overview
- **Medical History**: Access to treatment records and appointments
- **Responsive Layout**: Mobile-friendly interface

### Data Management
- **Complete Patient Database**: All 6 patients (Priya Sharma, Rajesh Kumar, Anita Desai, John Smith, Emma Johnson, Michael Brown) are displayed in both the admin dashboard overview and patient management section
- **Dynamic Updates**: Patient data is dynamically loaded from the DataContext
- **Context API Integration**: Full state management with React Context for authentication and data
- **localStorage Reset**: Use `clear-localStorage.html` to refresh data if needed

## Design System

### Color Scheme
- **Primary Gradient**: Purple to blue (#667eea to #764ba2)
- **Success**: Green tones (#28a745 to #20c997)
- **Warning**: Orange/red tones (#ff6b6b to #ee5a24)
- **Danger**: Red tones (#dc3545 to #c82333)

### UI Components
- **Cards**: Elevated design with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Tables**: Professional styling with hover states
- **Forms**: Clean input design with focus states

## Security Features

- **Role-based Access Control**: Users can only access appropriate features
- **Data Isolation**: Patients cannot access other patients' data
- **Session Management**: Login state persisted in localStorage
- **Input Validation**: Form validation for data integrity

## Browser Compatibility

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Support

For support, please contact the development team or create an issue in the repository.

---

**© 2025 Dental Center Management System**
