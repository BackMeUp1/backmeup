import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SecondNavbar from './components/SecondNavbar.jsx'; 
import Home from './components/Home.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/admin/dashboard.jsx'

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoute = ({ children, user }) => {
  const isAuthenticated = user !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);
  
  const isAuthenticated = localStorage.getItem('token') !== true;

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
              const response = await fetch('URL_TO_FETCH_USER_DATA', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SecondNavbar />} />
        <Route path="/login" element={<Login />} />
        <Route
             path="/home"
             element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
                      }
        />
      <Route path="/admin/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
