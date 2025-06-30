import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, DataProvider, PatientProfileProvider } from './contexts';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PatientProfileProvider>
          <AppRoutes />
        </PatientProfileProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
