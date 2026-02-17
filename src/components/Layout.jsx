import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-4">
      <Sidebar />
      <div className="ml-64 p-4">
        {children}
      </div>
    </div>
    </div>
  );
};

export default Layout;