// components/SectionWrapper/SectionWrapper.jsx
import { motion } from "framer-motion";
import "./SectionWrapper.css";

const SectionWrapper = ({ children, id }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="content-section"
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
