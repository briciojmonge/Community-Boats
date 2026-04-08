import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('TOURIST');
  const [community, setCommunity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:8082/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        const res = await axios.post('http://localhost:8082/auth/register', {
          name, email, password, role, community: role === 'GUIDE' ? community : null
        });
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
    } catch (err) {
      alert('Error de autenticación');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border p-2 rounded">
              <option value="TOURIST">Turista</option>
              <option value="GUIDE">Guía local</option>
            </select>
            {role === 'GUIDE' && (
              <input type="text" placeholder="Comunidad" value={community} onChange={e => setCommunity(e.target.value)} className="w-full border p-2 rounded" required />
            )}
          </>
        )}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isLogin ? 'Ingresar' : 'Registrar'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-blue-500"> {isLogin ? 'Regístrate' : 'Inicia sesión'}</button>
      </p>
    </div>
  );
}

export default Auth;