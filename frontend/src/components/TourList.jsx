import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourList() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const res = await axios.get('http://localhost:8081/tours');
    setTours(res.data);
  };

  const bookTour = async (tourId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Debes iniciar sesión');
    try {
      await axios.post('http://localhost:8083/bookings', { tourId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Reserva creada');
    } catch (err) {
      alert('Error al reservar');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Tours en lanchas comunitarias</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {tours.map(tour => (
          <div key={tour.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{tour.name}</h2>
            <p>📍 {tour.location}</p>
            <p>💰 ${tour.price}</p>
            <p>👤 Guía: {tour.guideName} ({tour.guideCommunity})</p>
            <button onClick={() => bookTour(tour.id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourList;