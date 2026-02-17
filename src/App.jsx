import React from 'react';
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;