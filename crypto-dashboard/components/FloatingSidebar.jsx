import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border-2 border-gray-200 p-3 hover:shadow-xl transition-shadow duration-300">
        <button
          onClick={handleHomeClick}
          className={`p-2 rounded-full transition-all duration-200 ${
            location.pathname === '/' 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
          }`}
          title="Go to Dashboard"
        >
          {/* Home Icon SVG */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FloatingSidebar; 