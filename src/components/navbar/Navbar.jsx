import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Function to remove 'code' from URL and navigate
    const handleHomeClick = () => {
        try {
            // Clean the current URL
            const url = new URL(window.location.href);
            console.log(url);
    
            // Remove 'code' query parameter
            url.searchParams.delete('code');
    
            // Remove hash fragment
            url.hash = '';
    
            // Update the URL without reloading the page
            window.history.replaceState({}, '', url.toString());
    
            // Navigate to the specified URL
            window.location.href = 'https://keri-chen.com';
        } catch (error) {
            console.error("Error handling home click:", error);
        }
    };

    return (
        <div className="navbar">
            {/* Sidebar */}
            {/* <Sidebar /> */}
            <div className="wrapper">
                <motion.span
                    initial={{
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.5
                    }}
                >
                </motion.span>
                <div className="social">
                    <a href="https://www.linkedin.com/in/kerichen" target="_blank" rel="noopener noreferrer">
                        <img src="photos/linkedinicon.png" alt="LinkedIn Icon" />
                    </a>
                    <div onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-house" style={{ color: 'pink' }}></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
