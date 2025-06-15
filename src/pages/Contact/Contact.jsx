// pages/Contact/Contact.jsx
import { motion } from "framer-motion";
import { useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  const contactInfo = [
    { icon: <FaPhone className="info-icon" />, text: "+91 92655 97820" },
    {
      icon: <FaEnvelope className="info-icon" />,
      text: "hrsh3034@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt className="info-icon" />,
      text: "Anand, Gujarat, India",
    },
  ];

  return (
    <section id="contact" className="contact-section tech-bg">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="info-title">Contact Information</h3>
            <p className="info-subtitle">
              Feel free to reach out through any of these channels
            </p>

            <div className="info-items">
              {contactInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <span className="icon-wrapper">{item.icon}</span>
                  <span className="info-text">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/Harsh Joshi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <FaLinkedin className="social-icon" />
              </a>
              <a
                href="https://github.com/nothrsh3034"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                <FaGithub className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/harshjoshi_30"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="form-group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Enter your message"
                required
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
