import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import "./portfolio.scss";

const items = [
  {
    id: 1,
    title: "Unlock Earth",
    category: "Travel Platform",
    tech: ["React", "TypeScript", "ios", "Node.js"],
    img: "/images/unlock-earth.png",
    desc:
      "Track countries, states, and cities you've explored. Unlock achievements, complete travel \"quests\" , and discover the world in a fun new way.",
    navigate: "/unlock-earth",
    featured: true
  },
  {
    id: 2,
    title: "Realtor Website",
    category: "Full Stack",
    tech: ["Next.js", "Tailwind", "VPS", "Nginx"],
    img: "/photos/realestate.png",
    desc:
      "Production real estate website integrated with MLS data, reviews, and neighborhood insights.",
    navigate: "https://kchenrealtor.com",
  },
  {
    id: 3,
    title: "DoorDash Case Study",
    category: "Product Design",
    tech: ["UX Research", "Figma"],
    img: "/photos/Group 1.png",
    desc:
      "A redesign focused on improving food discovery and reducing checkout friction.",
    navigate: "/doordash-case-study",
  },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const code = new URLSearchParams(window.location.search).get("code");

  const handleNavigate = (itemNavigate) => {
    if (itemNavigate === "/Spotify Login" && code) {
      navigate("/Spotify API", { state: { code } });
    } else if (itemNavigate.startsWith("http")) {
      window.open(itemNavigate, "_blank", "noopener,noreferrer");
      return;
    }

    navigate(itemNavigate);
  };

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <motion.div style={{ scaleX }} className="progressBar" />
      </div>

      {/* 🔥 NEW SECTION HEADER */}
      <div className="portfolioHeader">
        <h1 className="portfolioTitle">Projects</h1>
        <p className="portfolioSubtitle">
          A collection of products, case studies, and experiments I've built.
        </p>
      </div>
      
      {/* 🔥 SKILLS SECTION */}
      <div className="skillsSection">
        <div className="skillsGrid">
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Next.js",
            "Framer Motion",
            "Tailwind",
            "MongoDB",
            "Java",
            "Figma",
            "Python",
            "TensorFlow"
          ].map((skill) => (
            <span key={skill} className="skillChip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {items.map((item) => (
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
  return (
    <motion.section
      className={`projectCard ${item.featured ? "featured" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="projectImage">
        <img src={item.img} alt={item.title} />
      </div>

      <div className="projectContent">
        <span className="projectCategory">{item.category}</span>

        <h2>{item.title}</h2>

        <p>{item.desc}</p>

        <div className="techStack">
          {item.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <button
          disabled={item.status === "Coming Soon"}
          onClick={handleNavigate}
        >
          {item.status === "Coming Soon" ? "Coming Soon" : "View Project"}
        </button>
      </div>
    </motion.section>
  );
};

export default Portfolio;