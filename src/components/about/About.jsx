import "./about.scss";
import { motion } from "framer-motion";

const variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const stats = [
  {
    value: "2+",
    label: "Years Experience",
  },
  {
    value: "20+",
    label: "Projects Built",
  },
  {
    value: "15+",
    label: "Countries Visited",
  },
  {
    value: "∞",
    label: "Things To Learn",
  },
];

const About = () => {
  return (
    <motion.section
      className="about"
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="aboutLeft" variants={variants}>
        <motion.div
          className="profileImage"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/IMG_8408.JPG"
            alt="Keri Chen"
          />
        </motion.div>
      </motion.div>

      <motion.div className="aboutRight" variants={variants}>
        <motion.span className="sectionTag" variants={variants}>
          ABOUT ME
        </motion.span>

        <motion.h1 variants={variants}>
          Building software that makes life simpler.
        </motion.h1>

        <motion.p variants={variants}>
          Hi, I'm Keri 👋
        </motion.p>

        <motion.p variants={variants}>
          I'm a Software Engineer from the San Francisco Bay Area and a
          graduate of UC San Diego with dual degrees in Math–Computer
          Science and Cognitive Science specializing in Machine Learning.
        </motion.p>

        <motion.p variants={variants}>
          I enjoy building products that solve real problems, whether
          through intuitive user experiences, scalable backend services,
          or data-driven solutions. My passion lies in creating technology
          that improves everyday workflows and delivers meaningful value.
        </motion.p>

        <motion.p variants={variants}>
          Outside of work, you'll usually find me hiking, playing
          badminton or pickleball, training for a run, traveling,
          discovering new coffee shops, or spending time with friends
          and family.
        </motion.p>

        <motion.div className="currentlyCard" variants={variants}>
          <h3>Currently</h3>

          <div className="currentItem">
            💻 Software Engineer
          </div>

          <div className="currentItem">
            📍 Charlotte, NC
          </div>

          <div className="currentItem">
            🏃 Staying active through running
          </div>

          <div className="currentItem">
            ✈️ Exploring new destinations
          </div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
};

export default About;