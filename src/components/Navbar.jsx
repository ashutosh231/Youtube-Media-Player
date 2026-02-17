import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaHome, FaUpload, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {

  return (
    <nav className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FaYoutube className="text-white drop-shadow-lg" size={32} />
            <span className="text-2xl font-bold text-white tracking-tight select-none">Youtube Media</span>
          </Link>
        </div>

        
          
        

        {/* Navigation Icons */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-gray-200 transition-colors" title="Home">
            <FaHome size={22} />
          </Link>
          <Link to="/upload" className="text-white hover:text-gray-200 transition-colors" title="Upload">
            <FaUpload size={22} />
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200 transition-colors" title="Profile">
            <FaUserCircle size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;