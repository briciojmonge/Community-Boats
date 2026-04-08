import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import TourList from './components/TourList';
import CreateTour from './components/CreateTour';
import MyBookings from './components/MyBookings';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<TourList />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-tour" element={<CreateTour />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}

export default App;