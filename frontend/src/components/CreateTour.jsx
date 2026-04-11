import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, getAuthHeaders } from '../api';
import { getUserRole } from '../auth';

function CreateTour() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const role = getUserRole();

  if (role !== 'GUIDE') {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await api.tours.post(
        '/tours',
        {
          name,
          location,
          price: Number(price),
        },
        {
          headers: getAuthHeaders(),
        }
      );

      setMessage('Tour creado correctamente.');
      setName('');
      setLocation('');
      setPrice('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el tour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded bg-white">
      <h2 className="text-2xl mb-4">Publicar nuevo tour</h2>

      {message && (
        <div className="mb-3 rounded border border-green-300 bg-green-50 p-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-3 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nombre del tour"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Precio"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}

export default CreateTour;