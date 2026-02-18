import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaYoutube, FaHome, FaUpload, FaUserCircle, FaBars } from 'react-icons/fa';


const Navbar = ({ onMenuClick }) => {
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
    <header className="sticky top-0 z-50">
      <div 
        className="w-full border-x-0 border-t-0"
        style={{
          background: 'var(--app-surface)',
          borderBottom: '1px solid var(--app-border)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="app-container">
          <nav className="flex items-center justify-between gap-3 py-3">
        {/* Logo */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={onMenuClick}
                className="md:hidden btn-ghost !px-3 !py-2"
                aria-label="Open menu"
              >
                <FaBars size={20} />
              </button>

              <Link to="/" className="flex items-center gap-2 min-w-0">
                <span className="relative grid place-items-center w-10 h-10 rounded-2xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent-2)] opacity-90" />
                  <FaYoutube className="relative text-white drop-shadow" size={22} />
                </span>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight select-none truncate">
                  AshuTube
                </span>
              </Link>
            </div>

        {/* Search Box */}
        <form
          className="hidden sm:flex items-center gap-2 w-full max-w-2xl"
          onSubmit={handleSearch}
        >
          <div className="relative w-full">
            <input
              type="text"
              className="input pr-12"
              placeholder="Search videos, channels, topics…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 btn-primary !rounded-2xl !px-3 !py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Navigation Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="btn-ghost !px-3 !py-2" title="Home" aria-label="Home">
                <FaHome size={18} />
              </Link>
              <Link to="/upload" className="btn-ghost !px-3 !py-2" title="Upload" aria-label="Upload">
                <FaUpload size={18} />
              </Link>
              <Link to="/profile" className="btn-ghost !px-3 !py-2" title="Profile" aria-label="Profile">
                <FaUserCircle size={18} />
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile search */}
      <div className="sm:hidden app-container pb-3">
        <form className="flex items-center gap-2" onSubmit={handleSearch}>
          <input
            type="text"
            className="input"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn-primary !px-4 !py-2" aria-label="Search">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;