import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { api, getAuthHeaders } from '../api';
import { getUserId, getUserRole } from '../auth';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const role = getUserRole();
  const userId = getUserId();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        setError('No se pudo identificar al usuario.');
        setLoading(false);
        return;
      }

      try {
        const res = await api.bookings.get(`/bookings/user/${userId}`, {
          headers: getAuthHeaders(),
        });
        setBookings(res.data);
      } catch (err) {
        setError('No se pudieron cargar las reservas.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (role !== 'TOURIST') {
    return <Navigate to="/" replace />;
  }

  const submitReview = async (bookingId) => {
    setMessage('');
    setError('');

    try {
      await api.reviews.post(
        '/reviews',
        {
          bookingId,
          rating,
          comment: reviewText,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      setMessage('Reseña enviada correctamente.');
      setSelectedBookingId(null);
      setReviewText('');
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar la reseña.');
    }
  };

  const formatDate = (value) => {
    if (!value) return 'Sin fecha';

    if (Array.isArray(value)) {
      const [
        year,
        month,
        day,
        hour = 0,
        minute = 0,
        second = 0,
        nanosecond = 0,
      ] = value;

      const date = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        Math.floor(nanosecond / 1000000)
      );

      return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleString();
    }

    const date = new Date(value);
    return isNaN(date.getTime()) ? String(value) : date.toLocaleString();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mis reservas</h2>

      {message && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {loading && <p>Cargando reservas...</p>}
      {!loading && bookings.length === 0 && <p>No tienes reservas.</p>}

      {bookings.map((b) => (
        <div key={b.id} className="border p-3 mb-2 rounded bg-white">
          <p><strong>Tour:</strong> {b.tourName}</p>
          <p><strong>Fecha:</strong> {formatDate(b.bookingDate)}</p>
          <p><strong>Estado:</strong> {b.status}</p>

          {b.status === 'CONFIRMED' && (
            <button
              onClick={() => setSelectedBookingId(b.id)}
              className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mt-2"
            >
              Dejar reseña
            </button>
          )}

          {selectedBookingId === b.id && (
            <div className="mt-2 border-t pt-2">
              <textarea
                placeholder="Comentario"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="border p-1 w-full rounded"
                rows="2"
              />
              <div className="flex items-center gap-2 mt-2">
                <label>Puntuación:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="border p-1 rounded"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => submitReview(b.id)}
                  className="bg-green-500 text-white p-1 px-3 rounded"
                >
                  Enviar
                </button>
                <button
                  onClick={() => setSelectedBookingId(null)}
                  className="bg-gray-400 text-white p-1 px-3 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;