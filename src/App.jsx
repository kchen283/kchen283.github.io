import "./app.scss"
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax"
import Portfolio from "./components/portfolio/Portfolio";
import About from "./components/about/About"
import Calculator from './calculator/Calculator';
import Doordash from "./doordash/Doordash";
import Spotify from "./spotify/Spotify";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // This enables smooth scrolling
  });
};

const App = () => {

  return ( 
    <Router>
        <Routes>
        <Route path="https://keri-chen.com/" element= { 
            <div>
              <section id = "Home">
                <Navbar/>
                <Hero/>
              </section>
              <a id="About"> 
                <section id="About"><Parallax type="about"/></section>
                <section>
                  <About/>
                </section>
              </a>
              <a id="Portfolio">
              <section id="Portfolio"><Parallax type="portfolio"/></section>
              </a>
              <Portfolio/>
                <div className="upIcon" onClick={scrollToTop}>
                  <i className="fa-solid fa-arrow-up fa-bounce fa-2xl"></i>
                </div>
              </div>
          }/>
          <Route path="/Calculator App" element={<Calculator/>} />
          <Route path="/Doordash Case Study" element={<Doordash/>}/>
          <Route path="Spotify API" element={<Spotify/>} />
        </Routes>
    </Router>
  )
};

export default App;
