import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleRegister = async (credentials) => {
    try {
      const response = await fetch('https://rbas-system-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ username: credentials.username, role: credentials.role });
        setMessage('Registration successful!');
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('https://rbas-system-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ username: credentials.username, role: data.role });
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    }
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
        {message && <div className="text-red-500">{message}</div>}
        <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} /> 
          <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : (
              <>
                <RegisterForm onSubmit={handleRegister} />
                <Link to="/login" className="text-blue-500 underline">
                  Already registered? Log in
                </Link>
              </>
            )
          } />
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : (
              <>
                <LoginForm onSubmit={handleLogin} />
                <Link to="/register" className="text-blue-500 underline">
                  Need to register?
                </Link>
              </>
            )
          } />
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;