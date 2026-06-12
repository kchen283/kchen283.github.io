import React, { useCallback } from "react";
import "./app.scss";

import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About";

import Calculator from "./calculator/Calculator";
import Doordash from "./doordash/Doordash";
import Spotify from "./spotify/Spotify";
import Login from "./spotify/Login";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const Home = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/doordash-case-study" element={<Doordash />} />
        <Route path="/spotify-login" element={<Login />} />
        <Route path="/spotify-api" element={<Spotify />} />
        <Route path="/calculator-app" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

export default App;