// components/Header/Header.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Force header to stay at top
    const updateHeaderPosition = () => {
      if (headerRef.current) {
        headerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      requestAnimationFrame(updateHeaderPosition);
    };

    const animationId = requestAnimationFrame(updateHeaderPosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "Skills", path: "#skills" },
    { name: "Projects", path: "#projects" },
    { name: "Experience", path: "#experience" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <header
        className={`main-header ${isScrolled ? "scrolled" : ""}`}
        ref={headerRef}
      >
        <div className="container">
          <div className="header-content">
            <a href="#home" className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">Harsh Joshi</span>
              <span className="logo-bracket">/&gt;</span>
            </a>

            <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="nav-link"
                    >
                      {item.name}
                      <span className="nav-link-underline"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
