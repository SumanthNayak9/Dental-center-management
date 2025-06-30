// This script clears localStorage to force reinitialization with new patient data structure
// Run this in browser console or as a one-time script

console.log('Clearing localStorage to reinitialize patient data...');
localStorage.removeItem('patients');
localStorage.removeItem('appointments');
localStorage.removeItem('incidents');
console.log('localStorage cleared. Refresh the page to see updated patient data with blood types and allergies.');
