import { useRef } from "react"
import "./parallax.scss"
import { motion, useScroll, useTransform} from "framer-motion"

const Parallax = ({ type }) => {

    const ref = useRef()

    const {scrollYProgress} = useScroll({
        target:ref,
        offset: ["start start", "end start"]
    });

    const yText=useTransform(scrollYProgress, [0,1], ["0%","150%"]);
    const yBg=useTransform(scrollYProgress, [0,1], ["0%","150%"]);

    return (
        <div 
            className="parallax" 
            ref={ref}
            style = {{
                background:type==="about" 
                ? "linear-gradient(180deg, #283d57, #0d2e3f)" 
                : " linear-gradient(180deg, #0d2e3f, #283d57)"}}>

            <motion.h1 style = {{ y:yText }}> {type ==="about" ? "Who am I?" : "Personal Projects"}</motion.h1>    
            <motion.div style={{y:yBg}} className="skyline"></motion.div>
        </div>
    )
}

export default Parallax