import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link to="/" className="font-semibold hover:underline">
          Community Boats
        </Link>

        {loggedIn ? (
          <>
            <Link to="/create-tour" className="hover:underline">
              Publicar tour
            </Link>
            <Link to="/my-bookings" className="hover:underline">
              Mis reservas
            </Link>
            <button onClick={onLogout} className="hover:underline">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/auth" className="hover:underline">
            Login / Registro
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;