import React, { useState, useEffect } from 'react';
import { api, getAuthHeaders } from '../api';

function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.tours.get('/tours');
      setTours(res.data);
    } catch (err) {
      setError('No se pudieron cargar los tours.');
    } finally {
      setLoading(false);
    }
  };

  const bookTour = async (tourId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setBookingMessage('Debes iniciar sesión para reservar.');
      return;
    }

    try {
      await api.bookings.post(
        '/bookings',
        { tourId },
        { headers: getAuthHeaders() }
      );
      setBookingMessage('Reserva creada correctamente.');
    } catch (err) {
      setBookingMessage(err.response?.data?.message || 'Error al reservar.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Tours en lanchas comunitarias</h1>

      {bookingMessage && (
        <div className="mb-4 rounded border border-blue-300 bg-blue-50 p-3 text-blue-700">
          {bookingMessage}
        </div>
      )}

      {loading && <p>Cargando tours...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && tours.length === 0 && <p>No hay tours disponibles.</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {tours.map((tour) => (
          <div key={tour.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{tour.name}</h2>
            <p>📍 {tour.location}</p>
            <p>💰 ${tour.price}</p>
            <p>
              👤 Guía: {tour.guideName} {tour.guideCommunity ? `(${tour.guideCommunity})` : ''}
            </p>
            <button
              onClick={() => bookTour(tour.id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourList;