import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Auth from './components/Auth';
import TourList from './components/TourList';
import CreateTour from './components/CreateTour';
import MyBookings from './components/MyBookings';

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
    <div>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        {loggedIn && (
          <>
            <Link to="/create-tour" className="hover:underline">Publicar tour</Link>
            <Link to="/my-bookings" className="hover:underline">Mis reservas</Link>
            <button onClick={logout} className="hover:underline">Cerrar sesión</button>
          </>
        )}
        {!loggedIn && <Link to="/auth" className="hover:underline">Login/Registro</Link>}
      </nav>
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