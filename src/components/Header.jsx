import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <img 
              src="/logo.png" 
              alt="Linkplus Logo" 
              className="h-12 md:h-14 transition-transform group-hover:scale-105 duration-200"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <nav className="flex items-center gap-3">
            {location.pathname !== '/' && (
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-primary-600 font-semibold text-base transition-colors px-3 py-1.5"
              >
                ← Back
              </button>
            )}
            {location.pathname === '/' && (
              <button
                onClick={() => navigate('/add-user')}
                className="btn-primary text-base"
              >
                + Add User
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

