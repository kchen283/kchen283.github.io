import { useNavigate } from 'react-router-dom';

const variants = {
    open: {
        transition:{
            staggerChildren: 0.1,
        }
    },
    closed: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
    },
    closed: {
        y: 50,
        opacity: 0,
    }
};

import { motion } from "framer-motion"

const Links = () => {
    const items = ["Home", "About" ,"Portfolio"];

    const navigate = useNavigate(); 

    const handleNavigate = () => {
        navigate(item.navigate);
    };

    return (

        <motion.div className="links" variants={variants}>
            {items.map((item) => (
                <motion.a href={`https://keri-chen.com/#${item}`} key = {item} variants={itemVariants} whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
                    {item}
                 </motion.a>
            ))}        
       </motion.div>
    );
};

export default Links