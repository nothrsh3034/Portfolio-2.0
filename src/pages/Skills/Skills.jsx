// pages/Skills/Skills.jsx
import { motion } from "framer-motion";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import "./Skills.css";

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", level: 90, icon: "/images/skills/html.webp" },
      { name: "CSS", level: 85, icon: "/images/skills/css.webp" },
      { name: "JavaScript", level: 85, icon: "/images/skills/js.webp" },
      { name: "React.js", level: 90, icon: "/images/skills/react.png" },
      { name: "Bootstrap", level: 75, icon: "/images/skills/bootstrap.png" },
      { name: "Tailwind CSS", level: 75, icon: "/images/skills/tailwind.png" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 80, icon: "/images/skills/node.png" },
      { name: "Express.js", level: 70, icon: "/images/skills/express.webp" },
      { name: "PHP", level: 80, icon: "/images/skills/php.png" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", level: 85, icon: "/images/skills/mysql.webp" },
      { name: "MongoDB", level: 75, icon: "/images/skills/mongodb.webp" },
      { name: "Firebase", level: 70, icon: "/images/skills/firebase.svg" },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "Python", level: 85, icon: "/images/skills/python.webp" },
      { name: "Machine Learning", level: 90, icon: "/images/skills/ml.png" },
      { name: "Deep Learning", level: 90, icon: "/images/skills/dl.png" },
      {
        name: "NLP (Text Summarization)",
        level: 75,
        icon: "/images/skills/nlp.png",
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 85, icon: "/images/skills/git.svg" },
      { name: "GitHub", level: 85, icon: "/images/skills/github.webp" },
      { name: "XAMPP", level: 80, icon: "/images/skills/xampp.png" },
      { name: "VS Code", level: 90, icon: "/images/skills/vscode.png" },
      { name: "phpMyAdmin", level: 85, icon: "/images/skills/php.svg" },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Teamwork", level: 90, icon: "/images/skills/teamwork.png" },
      {
        name: "Communication",
        level: 75,
        icon: "/images/skills/com.png",
      },
      {
        name: "Problem-solving",
        level: 80,
        icon: "/images/skills/problem.png",
      },
    ],
  },
];

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>

        <div className="skills-container">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category cosmic-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-card"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="skill-header">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{ width: "48px", height: "48px" }}
                        className="skill-icon"
                      />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
