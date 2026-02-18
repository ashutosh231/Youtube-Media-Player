
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFire, FaUpload, FaUserCircle, FaHistory } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getWatchHistory } from '../utils/history';

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const location = useLocation ? useLocation() : { pathname: '/' };
  const navItems = [
    { name: 'Home', icon: <FaHome size={22} />, to: '/' },
    { name: 'Trending', icon: <FaFire size={22} />, to: '/trending' },
    { name: 'Upload', icon: <FaUpload size={22} />, to: '/upload' },
    { name: 'Profile', icon: <FaUserCircle size={22} />, to: '/profile' },
    { name: 'History', icon: <FaHistory size={22} />, to: '/history' },
  ];

  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(getWatchHistory());
    const onStorage = () => setHistory(getWatchHistory());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const Nav = ({ dense }) => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.name}
            to={item.to}
            onClick={onMobileClose}
            className={[
              'group flex items-center gap-3 rounded-2xl px-3 py-2 transition',
              'border border-transparent hover:border-white/10 hover:bg-white/5',
              isActive ? 'bg-white/10 border-white/10' : '',
            ].join(' ')}
            title={item.name}
          >
            <span
              className={[
                'grid place-items-center w-10 h-10 rounded-2xl transition',
                isActive
                  ? 'bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent-2)] text-white shadow'
                  : 'bg-white/5 text-white/90 group-hover:bg-white/10',
              ].join(' ')}
            >
              {item.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className={['font-semibold', dense ? 'text-sm' : 'text-base'].join(' ')}>
                {item.name}
              </div>
              <div className="text-xs faint -mt-0.5 truncate">
                {item.to === '/trending' ? 'Most popular right now' : item.to === '/history' ? `${history.length} watched` : 'Explore'}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block">
        <div className="card p-3 lg:p-4 sticky top-[84px] h-[calc(100dvh-104px)] overflow-auto scrollbar">
          <div className="px-2 pb-3">
            <div className="text-sm font-semibold tracking-wide text-white/90">Browse</div>
            <div className="text-xs faint">Fast navigation</div>
          </div>
          <Nav />
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={[
          'md:hidden fixed inset-0 z-50 transition',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            'absolute inset-0 bg-black/60 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={onMobileClose}
        />
        <div
          className={[
            'absolute left-0 top-0 h-full w-[86%] max-w-sm',
            'transition-transform duration-300 will-change-transform',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div 
            className="h-full border-l-0 rounded-none p-4 overflow-auto scrollbar"
            style={{
              background: 'var(--app-surface)',
              borderRight: '1px solid var(--app-border)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          >
            <div className="flex items-center justify-between pb-3">
              <div>
                <div className="font-extrabold tracking-tight">Menu</div>
                <div className="text-xs faint">Navigate quickly</div>
              </div>
              <button type="button" className="btn-ghost !px-3 !py-2" onClick={onMobileClose}>
                Close
              </button>
            </div>
            <Nav dense />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;