import "./hero.scss"
import { motion } from "framer-motion"

const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("Portfolio");
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
};

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1, 
            staggerChildren: 0.1,
        }
    }
    
}

const sliderVariants = {
    initial: {
        x: 0,
    },
    animate: {
        x: "-220%",
        transition: {
            duration: 20, 
            repeat: Infinity,
            repeatType: "mirror",
        }
    }
};

const Hero = () => {
    return (
        <div className="hero">
            <div className="wrapper" >
                <motion.div 
                    className="textContainer" 
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h2  variants={textVariants}>
                        KERI CHEN
                    </motion.h2>
                    <motion.h1  variants={textVariants}>
                        Software Engineer and Machine Learning Enthusiast 
                    </motion.h1>
                    <motion.div className="buttons"  variants={textVariants}>
                        <motion.button onClick={scrollToPortfolio} variants={textVariants}>Personal Projects</motion.button>
                    </motion.div>
                </motion.div>
            </div>
            <motion.div className="slidingTextContainer" 
                variants={sliderVariants}
                initial="initial"
                animate="animate"
                >
                Welcome  Bonjour  Nǐ Hǎo  Konnichiwa  Anyoung Haseyo  Shalom  Guten Tag
            </motion.div>
        </div> 
    )
}

export default Hero