import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/dashboard';
import NavBar from './components/navBar';

const AuthenticatedRoutes = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animals" element={<div>Animals Page</div>} />
        <Route path="/weight" element={<div>Weight Page</div>} />
        <Route path="/rasyon" element={<div>Rasyon Page</div>} />
        <Route path="/sales" element={<div>Sales Page</div>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<AuthenticatedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
