import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import TourList from './components/TourList';
import CreateTour from './components/CreateTour';
import MyBookings from './components/MyBookings';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar loggedIn={loggedIn} onLogout={logout} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<TourList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-tour" element={<CreateTour />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;