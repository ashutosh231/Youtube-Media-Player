import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaYoutube, FaHome, FaUpload, FaUserCircle } from 'react-icons/fa';


const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FaYoutube className="text-white drop-shadow-lg" size={32} />
            <span className="text-2xl font-bold text-white  tracking-tight select-none">Youtube Media</span>
          </Link>
        </div>

        {/* Search Box */}
        <form
          className="flex items-center bg-white rounded-full shadow-md px-3 py-1 w-full max-w-md mx-6"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="flex-1 outline-none bg-transparent px-2 py-1 text-gray-800 placeholder-gray-400"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            aria-label="Search"
            className="text-red-500 hover:text-red-700 transition-colors px-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </form>

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