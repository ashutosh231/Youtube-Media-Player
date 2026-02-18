import React from 'react';
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Watch from "./pages/Watch";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import History from './pages/History';

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
  );
};

export default App;