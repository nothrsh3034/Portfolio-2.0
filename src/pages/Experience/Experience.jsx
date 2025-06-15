// pages/Experience/Experience.jsx
import { motion } from "framer-motion";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import "./Experience.css";

const experienceData = [
  {
    id: 1,
    role: "ML/DL Intern",
    company: "The Sparks Foundation",
    period: "2024",
    description:
      "Built ML/DL models for data-driven tasks such as prediction and classification. Gained hands-on experience with model training, evaluation, and deployment.",
    icon: "/images/experience/logo-1.png",
  },
  {
    id: 2,
    role: "AI/ML Intern",
    company: "Codetech IT Solution",
    period: "2024",
    description:
      "Developed AI-based projects such as Text Summarization and Sentiment Analysis using Python and NLP. Implemented and tested models using libraries like NLTK and HuggingFace.",
    icon: "/images/experience/logo-2.png",
  },
  {
    id: 3,
    role: "Full Stack Developer Intern",
    company: "Keryar IT Solutions",
    period: "2024",
    description:
      "Worked on full-stack applications using React, Node.js, and MongoDB. Implemented REST APIs, user authentication, and CRUD operations for web-based systems.",
    icon: "/images/experience/keryar.png",
  },
];

const Experience = () => {
  return (
    <SectionWrapper id="experience">
      <div className="container">
        {/* Increased margin below the heading */}

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: "5rem" }}
        >
          Professional Journey
        </motion.h2>

        <div className="timeline">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content cosmic-card">
                <div className="timeline-icon">
                  <img
                    src={exp.icon}
                    alt={exp.company}
                    style={{ width: "48px", height: "48px" }}
                  />
                </div>
                <div className="timeline-details">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <h4 className="timeline-company">
                    {exp.company} • {exp.period}
                  </h4>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
