import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // Extraer userId del token (decodificación simplificada)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.sub;
    axios.get(`http://localhost:8083/bookings/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data)).catch(err => console.error(err));
  }, []);

  const submitReview = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8084/reviews', {
        bookingId,
        rating,
        comment: reviewText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Reseña enviada');
      setSelectedBookingId(null);
      setReviewText('');
      setRating(5);
    } catch (err) {
      alert('Error al enviar reseña');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mis reservas</h2>
      {bookings.length === 0 && <p>No tienes reservas.</p>}
      {bookings.map(b => (
        <div key={b.id} className="border p-3 mb-2 rounded">
          <p><strong>Tour:</strong> {b.tourName}</p>
          <p><strong>Fecha:</strong> {new Date(b.bookingDate).toLocaleString()}</p>
          <p><strong>Estado:</strong> {b.status}</p>
          {b.status === 'CONFIRMED' && (
            <button onClick={() => setSelectedBookingId(b.id)} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mt-2">
              Dejar reseña
            </button>
          )}
          {selectedBookingId === b.id && (
            <div className="mt-2 border-t pt-2">
              <textarea
                placeholder="Comentario"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className="border p-1 w-full rounded"
                rows="2"
              />
              <div className="flex items-center gap-2 mt-2">
                <label>Puntuación:</label>
                <select value={rating} onChange={e => setRating(parseInt(e.target.value))} className="border p-1 rounded">
                  {[1,2,3,4,5].map(r => <option key={r}>{r}</option>)}
                </select>
                <button onClick={() => submitReview(b.id)} className="bg-green-500 text-white p-1 px-3 rounded">Enviar</button>
                <button onClick={() => setSelectedBookingId(null)} className="bg-gray-400 text-white p-1 px-3 rounded">Cancelar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;