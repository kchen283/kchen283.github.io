import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./portfolio.scss";

const items = [
    {
        id: 1,
        title: "Calculator App",
        img: "photos/iPhone 8 Plus - 1 — All Hands — Left hand.png",
        desc: "Building a web calculator!",
        navigate: "/Calculator App"
    },
    {
        id: 2,
        title: "DoorDash Case Study",
        img: "photos/prototype.png",
        desc: "Doordash — the food delivery app with the majority US market share at 57% has around 20 million monthly users...",
        navigate: "/Doordash Case Study"
    },
    {
        id: 3,
        title: "Spotify Color",
        img: "photos/spotifylogo.png",
        desc: "Check what your Spotify Color is based on your recent songs and find your top artists based on hashing values.",
        navigate: "/Spotify Login" // Default to login
    }
];

const Portfolio = () => {
    const navigate = useNavigate();
    const ref = useRef();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Get the authorization code from URL if available
    const code = new URLSearchParams(window.location.search).get('code');

    const handleNavigate = (itemNavigate) => {
        if (itemNavigate === "/Spotify Login" && code) {
            navigate("/Spotify API", { state: { code } }); // Navigate to Spotify App with code
        } else {
            navigate(itemNavigate); // Navigate to the specified page
        }
    };

    return (
        <div className="portfolio" ref={ref}>
            <div className="progress">
                <h1>Projects</h1>
                <motion.div style={{ scaleX }} className="progressBar"></motion.div>
            </div>
            {items.map(item => (
                <Single 
                    item={item} 
                    key={item.id} 
                    handleNavigate={() => handleNavigate(item.navigate)} 
                />
            ))}
        </div>
    );
};

const Single = ({ item, handleNavigate }) => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

    return (
        <section ref={ref}>
            <div className="container">
                <div className="wrapper">
                    <div className="imageContainer">
                        <img src={item.img} alt="" />
                    </div>
                    <motion.div className="textContainer" style={{ y }}>
                        <h2>{item.title}</h2>
                        <p>{item.desc}</p>
                        <button onClick={handleNavigate}>Learn More</button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
