import React, { useState } from 'react';
import axios from 'axios';

function CreateTour() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('No autenticado');
    try {
      await axios.post('http://localhost:8081/tours', { name, location, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Tour creado');
      setName(''); setLocation(''); setPrice('');
    } catch (err) {
      alert('Error: solo guías pueden crear tours');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <h2 className="text-2xl mb-4">Publicar nuevo tour</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Nombre del tour" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Ubicación" value={location} onChange={e => setLocation(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" step="0.01" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Publicar</button>
      </form>
    </div>
  );
}

export default CreateTour;