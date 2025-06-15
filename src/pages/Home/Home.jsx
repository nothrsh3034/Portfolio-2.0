// pages/Home/Home.jsx
import { motion } from "framer-motion";
import { useRef } from "react";
import TechSphere from "../../components/TechSphere/TechSphere";
import SpaceTechDecorations from "../../components/SpaceTechDecorations/SpaceTechDecorations";
import ProfileOrbit from "../../components/ProfileOrbit/ProfileOrbit";
import "./Home.css";

const Home = () => {
  const profileRef = useRef(null);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/harsh-joshi-cv.pdf";
    link.download = "Harsh_Joshi_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="home-section">
      <SpaceTechDecorations />
      <div className="container">
        <motion.div
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text */}
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 variants={itemVariants}>HARSH JOSHI</motion.h1>
            <motion.p className="subtitle" variants={itemVariants}>
              Full Stack Developer | ML/DL Enthusiast
            </motion.p>
            <motion.p className="bio" variants={itemVariants}>
              Building innovative solutions at the intersection of web
              development and artificial intelligence.
            </motion.p>
            <motion.div className="cta-buttons" variants={itemVariants}>
              <motion.button
                onClick={downloadCV}
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.button>
              <motion.a
                href="#contact"
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div className="hero-visual" variants={itemVariants}>
            <div className="saturn-profile" style={{ position: "relative" }}>
              <div
                className="profile-image-container"
                ref={profileRef}
                style={{ position: "relative" }}
              >
                <img
                  src="/images/profile.png"
                  alt="Harsh Joshi"
                  className="profile-image"
                />
                <ProfileOrbit profileRef={profileRef} />
              </div>
            </div>
            <TechSphere />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
