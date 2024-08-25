import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss"
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
<script src="https://kit.fontawesome.com/28ce45e6c4.js" crossorigin="anonymous"></script>
import {useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            {/* Sidebar */ }
           { <Sidebar/>}
            <div className="wrapper">
                <motion.span
                    inital={{
                        opacity: 0,
                        scale: 0.5
                    }}
                    anime={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition = {{
                        duration: 0.5
                    }}>
                </motion.span>
                <div className="social">
                    <a href="https://www.linkedin.com/in/kerichen"         
                        target="_blank" 
                        rel="noopener noreferrer"> 
                        <img src="src/components/photos/linkedinicon.png" alt=""/>
                    </a>
                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <i class="fa-solid fa-house" style={{ color: 'pink' }}></i>                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar