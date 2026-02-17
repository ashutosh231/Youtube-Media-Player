
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFire, FaUpload, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation ? useLocation() : { pathname: '/' };
  const navItems = [
    { name: 'Home', icon: <FaHome size={22} />, to: '/' },
    { name: 'Trending', icon: <FaFire size={22} />, to: '/trending' },
    { name: 'Upload', icon: <FaUpload size={22} />, to: '/upload' },
    { name: 'Profile', icon: <FaUserCircle size={22} />, to: '/profile' },
  ];

  return (
    <aside className="h-full min-h-screen w-20 bg-gradient-to-b from-red-600 via-red-500 to-red-400 shadow-lg flex flex-col items-center py-6 gap-4 sticky top-0 z-40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.name}
            to={item.to}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl mb-2 transition-all duration-200 group ${
              isActive ? 'bg-white text-red-600 shadow-lg scale-105' : 'text-white hover:bg-white/20 hover:scale-105'
            }`}
            title={item.name}
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-xs font-medium group-hover:text-white/90 select-none">
              {item.name}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;