import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isWatchPage = location.pathname.startsWith('/watch/') || location.pathname === '/trending';

  const actions = useMemo(
    () => ({
      openSidebar: () => setMobileSidebarOpen(true),
      closeSidebar: () => setMobileSidebarOpen(false),
      toggleSidebar: () => setMobileSidebarOpen((v) => !v),
    }),
    []
  );

  return (
    <div className="app-shell">
      <Navbar onMenuClick={actions.toggleSidebar} />

      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 lg:gap-6 py-4">
          <Sidebar mobileOpen={mobileSidebarOpen} onMobileClose={actions.closeSidebar} />

          <main className="min-w-0">
            {isWatchPage ? (
              <div className="p-0">{children}</div>
            ) : (
              <div className="card p-4 sm:p-5 lg:p-6">{children}</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;