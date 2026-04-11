import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import TourList from './components/TourList';
import CreateTour from './components/CreateTour';
import MyBookings from './components/MyBookings';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated, getUserRole, logoutUser } from './auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [role, setRole] = useState(getUserRole());
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    logoutUser();
    setLoggedIn(false);
    setRole(null);
    navigate('/');
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setRole(getUserRole());
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar loggedIn={loggedIn} role={role} onLogout={logout} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<TourList />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/create-tour"
            element={
              <ProtectedRoute requiredRole="GUIDE">
                <CreateTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute requiredRole="TOURIST">
                <MyBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;