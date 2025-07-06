# Dental Center Management System

A comprehensive role-based dental center management system built with React.js, featuring separate dashboards for administrators and patients with modern UI/UX design.

## Setup & Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser

### Installation Steps

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

4. **Access the application**
   - Open browser and navigate to `http://localhost:3000`
   - Use provided login credentials below

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Architecture

### System Overview
```
Frontend: React 18+ with Context API
├── Authentication Layer (AuthContext)
├── Data Management Layer (DataContext)
├── Patient Profile Layer (PatientProfileContext)
└── UI Components (Admin/Patient Dashboards)
```

### Component Structure
```
src/
├── contexts/
│   ├── AuthContext.js          # Authentication state management
│   ├── DataContext.js          # Application data (patients, appointments)
│   ├── PatientProfileContext.js # Patient-specific profile management
│   └── index.js                # Context exports
├── Admin/
│   ├── AdminDashboard.jsx      # Main admin interface
│   ├── AdminDashboard.css      # Unified styling
│   ├── Calender.jsx           # Appointment calendar
│   ├── Patients/
│   │   ├── PatientForm.jsx    # Patient CRUD operations
│   │   ├── PatientList.jsx    # Patient management table
│   │   └── PatientIncidents.jsx # Incident tracking
│   └── Records/
│       ├── RecordsManagement.jsx # Medical records
│       └── RecordsManagement.css # Records styling
├── Patient/
│   └── PatientDashboard.jsx    # Patient interface
├── routes/
│   └── AppRoutes.jsx           # Application routing
├── LoginPage.jsx               # Authentication component
└── App.js                      # Main application component
```

### Data Flow Architecture
```
App.js
├── AuthProvider (User authentication & role management)
├── DataProvider (Patients, appointments, incidents)
└── PatientProfileProvider (Individual patient profiles)
    └── AppRoutes
        ├── LoginPage (Authentication)
        ├── AdminDashboard (Admin interface)
        └── PatientDashboard (Patient interface)
```

### State Management Pattern
- **AuthContext**: User authentication, login/logout, role-based access
- **DataContext**: Application data with CRUD operations for patients, appointments, incidents
- **PatientProfileContext**: Individual patient profile management and updates
- **localStorage**: Data persistence across browser sessions
- **Local State**: Component-specific state using useState hooks

## User Credentials

### Administrator Access
- **Email**: `admin@entnt.in`
- **Password**: `admin123`
- **Permissions**: Full system access, patient management, appointment scheduling

### Patient Access

1. **Priya Sharma**
   - Email: `priya.sharma@email.com`
   - Password: `priya123`
   - Blood Type: O+, Location: Bangalore, India

2. **Rajesh Kumar**
   - Email: `rajesh.kumar@email.com`
   - Password: `rajesh123`
   - Blood Type: A+, Location: Bangalore, India

3. **Anita Desai**
   - Email: `anita.desai@email.com`
   - Password: `anita123`
   - Blood Type: B+, Location: Mumbai, India

4. **John Smith**
   - Email: `john.smith@email.com`
   - Password: `john123`
   - Blood Type: O-, Location: New York, USA

5. **Emma Johnson**
   - Email: `emma.johnson@email.com`
   - Password: `emma123`
   - Blood Type: AB+, Location: Los Angeles, USA

6. **Michael Brown**
   - Email: `michael.brown@email.com`
   - Password: `michael123`
   - Blood Type: B-, Location: Springfield, IL, USA

## Technical Decisions

### Frontend Framework
- **React 18+**: Chosen for component-based architecture and extensive ecosystem
- **Functional Components**: Modern React approach with hooks for state management
- **Context API**: Built-in state management solution, avoiding external dependencies like Redux

### State Management
- **Context API**: Lightweight solution for application-wide state
- **localStorage**: Client-side persistence for demo purposes
- **Three-layer Context**: Separation of concerns (Auth, Data, Patient Profile)

### Styling Approach
- **Custom CSS**: Full control over styling without framework overhead
- **CSS Variables**: Consistent color scheme and theming
- **Responsive Design**: Mobile-first approach with breakpoints
- **Card-based UI**: Modern design pattern for healthcare applications

### Authentication & Security
- **Role-based Access Control**: Admin vs Patient permissions
- **Data Isolation**: Patients can only access their own data
- **Session Management**: localStorage-based authentication state
- **Input Validation**: Form validation for data integrity

### Currency & Localization
- **Indian Rupees (₹)**: Primary currency format throughout the application
- **Locale-specific**: Number formatting and date display
- **Multi-region Support**: Patients from India and international locations

### Analytics & Monitoring
- **Error Handling**: Defensive coding practices throughout components
- **Performance Optimization**: React.memo and useCallback where appropriate

## Common Issues & Troubleshooting

### Login Issues
**Problem**: Cannot login with provided credentials
**Solution**: 
1. Verify email and password exactly as documented above
2. Check browser console for JavaScript errors
3. Clear localStorage and refresh: `localStorage.clear()`

### Data Not Persisting
**Problem**: Patient data disappears after browser refresh
**Solution**:
1. Check if localStorage is enabled in browser settings
2. Ensure localStorage quota is not exceeded
3. Disable browser extensions that might block localStorage
4. Use the provided `clear-localStorage.html` file to reset data

### Missing Patient Data
**Problem**: Admin dashboard shows empty patient list
**Solution**:
1. Refresh the browser to reload context data
2. Check browser console for data loading errors
3. Verify DataContext is properly initialized
4. Use `clear-storage.js` script to reset to default data

### Performance Issues
**Problem**: Application loading slowly or freezing
**Solution**:
1. Check browser memory usage and close unnecessary tabs
2. Ensure minimum system requirements are met
3. Disable browser extensions temporarily
4. Clear browser cache and reload

### Mobile Display Issues
**Problem**: Layout broken on mobile devices
**Solution**:
1. Ensure viewport meta tag is present
2. Test on supported browsers (Chrome 90+, Safari 14+)
3. Check for CSS conflicts with device-specific styles
4. Verify responsive breakpoints are working

### Development Issues
**Problem**: `npm start` fails or dependencies not installing
**Solution**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure Node.js version 16+ is installed
4. Check for port conflicts (default: 3000)

### Debug Mode
Enable detailed logging:
```javascript
localStorage.setItem('debug', 'true');
```

### Reset Application Data
Use the provided utility files:
- `clear-localStorage.html` - Browser-based reset
- `clear-storage.js` - Script-based reset

## Browser Compatibility

- **Chrome**: Version 90+ (Recommended)
- **Firefox**: Version 88+
- **Safari**: Version 14+
- **Edge**: Version 90+
- **Mobile**: iOS 12+, Android 8.0+

## Development & Deployment

### Environment Variables
No environment variables required for basic setup. Application uses localStorage for data persistence.

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** (Recommended): `vercel --prod`
- **Netlify**: Upload build folder
- **Traditional hosting**: Serve build folder with SPA routing

---

**© 2025 Dental Center Management System - Built with React.js**
