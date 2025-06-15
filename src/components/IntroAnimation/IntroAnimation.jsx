import React, { useState, useEffect, useRef } from "react";
import "./IntroAnimation.css";

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newValue = prev + Math.random() * 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setShowContent(true);
          setTimeout(onComplete, 2000); // Show content before completing
          return 100;
        }
        return newValue;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="cyberpunk-loader" ref={containerRef}>
      <div className="cyber-grid"></div>

      <div className="scanlines"></div>

      <div className="loading-content">
        {!showContent ? (
          <>
            <div className="hologram-circle">
              <div className="inner-circle"></div>
            </div>
            <div className="loading-text">SYSTEM INITIALIZATION</div>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="progress-text">{Math.floor(progress)}%</div>
            </div>
            <div className="status-message">
              {progress < 30 && "> Booting kernel..."}
              {progress >= 30 && progress < 60 && "> Loading modules..."}
              {progress >= 60 && progress < 90 && "> Initializing UI..."}
              {progress >= 90 && "> Ready to connect"}
            </div>
          </>
        ) : (
          <div className="welcome-content">
            <h1 className="neon-text flicker">HARSH JOSHI</h1>
            <h2 className="cyber-subtitle">FULL STACK DEVELOPER</h2>
            <div className="cyber-line"></div>
            <div className="pulse-circle"></div>
          </div>
        )}
      </div>

      <div className="binary-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IntroAnimation;
