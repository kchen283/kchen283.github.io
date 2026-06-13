import React, { useCallback, useEffect } from "react";
import "./app.scss";

import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About";

import Calculator from "./calculator/Calculator";
import Doordash from "./doordash/Doordash";
import Spotify from "./spotify/Spotify";
import Login from "./spotify/Login";
import UnlockEarth from "./unlock-earth/unlock-earth";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home" className="section hero-section">
          <Hero />
        </section>
        <section id="about" className="section about-section">
          <About />
        </section>
        <section id="portfolio" className="section portfolio-section">
          <Portfolio />
        </section>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unlock-earth" element={<UnlockEarth />} />
        <Route path="/doordash-case-study" element={<Doordash />} />
        <Route path="/spotify-login" element={<Login />} />
        <Route path="/spotify-api" element={<Spotify />} />
      </Routes>
    </Router>
  );
};

export default App;