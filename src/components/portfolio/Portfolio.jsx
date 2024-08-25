import { useRef } from "react"
import "./portfolio.scss"
import{ motion, useScroll,useSpring, useTransform } from "framer-motion"
import {useNavigate } from 'react-router-dom';

const items = [
    {
        id:1,
        title: "Calculator App",
        img: "src/components/photos/iPhone 8 Plus - 1 — All Hands — Left hand.png",
        desc: "Building a web calculator!",
        navigate: "/Calculator App"
    },
    {
        id:2,
        title: "DoorDash Case Study",
        img: "src/components/photos/prototype.png",
        desc: "Doordash — the food delivery app with the majority US market share at 57% has around 20 million monthly users (including international markets: Australia, Canada, and Japan). With this many users, it becomes hard to cater to everyone, so we wanted to find better ways to cater towards people with dietary restrictions/lifestyles.",
        navigate:"Doordash Case Study"
    },
    {
        id:3,
        title: "Spotify API",
        img: "src/components/photos/spotifylogo.png",
        desc: "Testing the Spotify API",
        navigate:"/Spotify API"
    }
]

const Single = ({item}) => {
    const ref = useRef();

    const navigate = useNavigate(); 

    const{scrollYProgress} = useScroll({target:ref,offset: ["start start","end start"]});

    const y = useTransform(scrollYProgress,[0,1],["0%","-200%"]);

    const handleNavigate = () => {
        navigate(item.navigate);
    };

    return (
        <section ref={ref}>
            <div className="container">
                <div className="wrapper">
                    <div className="imageContainer">
                        <img src={item.img} alt="" />
                    </div>
                    <motion.div className="textContainer" style={{y}}>
                        <h2> {item.title}</h2>
                        <p>{item.desc}</p>
                        <button onClick={handleNavigate}>Learn More</button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}


const Portfolio = () => {

    const ref=useRef()

    const{scrollYProgress} = useScroll({target:ref, offset: ["end end","start start"],});
    
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });
    
    return (
        <div className="portfolio" ref={ref}>
            <div className="progress">
                <h1>Projects</h1>
                <motion.div style={{scaleX}} className="progressBar"></motion.div>
            </div>
            {items.map(item=>(
                <Single item={item} key = {item.id}/>
            ))}
        </div>
    )
}

export default Portfolio