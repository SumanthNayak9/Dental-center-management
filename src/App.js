import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, DataProvider, PatientProfileProvider } from './contexts';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PatientProfileProvider>
          <AppRoutes />
          <Analytics />
        </PatientProfileProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
