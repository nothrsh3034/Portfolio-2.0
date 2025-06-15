// pages/Projects/Projects.jsx
import { motion } from "framer-motion";
import "./Projects.css";

const projectsData = [
  {
    id: 1,
    title: "Real Estate Website",
    description:
      "A full-stack real estate platform with searchable listings and agent contact forms built using React, PHP, and MySQL.",
    tags: ["React", "PHP", "MySQL", "Tailwind"],
    image: "/images/projects/realestate.png",
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Full Stack E-Commerce Website",
    description:
      "An e-commerce platform with product listing, shopping cart, user authentication, and admin dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "/images/projects/ecommerce.png",
    github: "#",
    live: "https://petpalace-two.vercel.app/",
  },
  {
    id: 3,
    title: "Diabetes Detection System",
    description:
      "A machine learning model that predicts the risk of diabetes using health parameters and classification algorithms.",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    image: "/images/projects/DBS.png",
    github: "#",
    live: "#",
  },
  {
    id: 5,
    title: "Real-Time Sign Language Translator",
    description:
      "An AI-powered webcam-based application that recognizes sign language gestures and translates them to text.",
    tags: ["Python", "OpenCV", "ML", "Tkinter"],
    image: "/images/projects/RTS.png",
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "MarvelVerse – Marvel Comic Website",
    description:
      "A visually engaging frontend website for Marvel fans, showcasing comic characters, storylines, and interactive UI using modern web design.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/marvelverse.png",
    github: "#",
    live: "https://marvelverse-theta.vercel.app/",
  },
  {
    id: 6,
    title: "AI Text Summarizer",
    description:
      "A natural language processing project that generates summaries of large text content using NLP techniques.",
    tags: ["Python", "NLP", "TextRank", "HuggingFace"],
    image: "/images/projects/text-summarizer.jpg",
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section tech-bg">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.live} className="project-link">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
