import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/dashboard';
import NavBar from './components/navBar';

// Component to handle authenticated routes
const AuthenticatedRoutes = () => {
  // Check for token directly from local storage
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Return routes that should only be accessible to authenticated users
  return (
    <>
      <NavBar />  // Render the NavBar for authenticated pages
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Additional authenticated routes can be added here */}
        {/* <Route path="/animals" element={<Animals />} />
        <Route path="/weight" element={<Weight />} />
        <Route path="/rasyon" element={<Rasyon />} />
        <Route path="/sales" element={<Sales />} /> */}
      </Routes>
    </>
  );
};

// Main App component that includes routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<AuthenticatedRoutes />} />  // Handle all other routes
      </Routes>
    </Router>
  );
}

export default App;
