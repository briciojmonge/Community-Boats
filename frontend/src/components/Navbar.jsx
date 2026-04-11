import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn, role, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link to="/" className="font-semibold hover:underline">
          Community Boats
        </Link>

        {loggedIn ? (
          <>
            {role === 'GUIDE' && (
              <Link to="/create-tour" className="hover:underline">
                Publicar tour
              </Link>
            )}

            {role === 'TOURIST' && (
              <Link to="/my-bookings" className="hover:underline">
                Mis reservas
              </Link>
            )}

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