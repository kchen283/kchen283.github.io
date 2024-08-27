import React, { useEffect } from "react";
import "./app.scss";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About";
import Calculator from './calculator/Calculator';
import Doordash from "./doordash/Doordash";
import Spotify from "./spotify/Spotify";
import Login from "./spotify/Login";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { HashRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

const App = () => {
  const code = new URLSearchParams(location.search).get('code');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This enables smooth scrolling
    });
  };

  // Function to remove code from URL
  const cleanUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url);
  };

  // Effect to handle URL cleanup if code is present
  useEffect(() => {
    if (code) {
      cleanUrl();
    }
  }, [code]);

  return (
    <Router>
      <Routes>
        {/* Redirect to Spotify if code exists, otherwise show home page */}
        <Route path="/" element={code ? <Navigate to="/Spotify API" /> : (
          <div>
            <section id="Home">
              <Navbar />
              <Hero />
            </section>
            <section id="About">
              <Parallax type="about" />
              <About />
            </section>
            <section id="Portfolio">
              <Parallax type="portfolio" />
              <Portfolio />
            </section>
            <div className="upIcon" onClick={scrollToTop}>
              <i className="fa-solid fa-arrow-up fa-bounce fa-2xl"></i>
            </div>
          </div>
        )}/>
        <Route path="/Calculator App" element={<Calculator />} />
        <Route path="/Doordash Case Study" element={<Doordash />} />
        <Route path="/Spotify Login" element={<Login />} />
        <Route path="/Spotify API" element={<Spotify />} />
      </Routes>
    </Router>
  );
};

export default App;
