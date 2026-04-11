import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('TOURIST');
  const [community, setCommunity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;

      if (isLogin) {
        res = await api.auth.post('/auth/login', { email, password });
      } else {
        res = await api.auth.post('/auth/register', {
          name,
          email,
          password,
          role,
          community: role === 'GUIDE' ? community : '',
        });
      }

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?._embedded?.errors?.[0]?.message ||
        err.response?.data?.message ||
        'Error de autenticación'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="TOURIST">Turista</option>
              <option value="GUIDE">Guía local</option>
            </select>

            {role === 'GUIDE' && (
              <input
                type="text"
                placeholder="Comunidad"
                value={community}
                onChange={e => setCommunity(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            )}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Registrar'}
        </button>
      </form>

      <p className="mt-4 text-center">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 text-blue-500"
          type="button"
        >
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </div>
  );
}

export default Auth;