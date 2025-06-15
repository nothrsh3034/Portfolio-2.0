// components/FallingStars/FallingStars.jsx
import { useEffect, useRef } from "react";
import "./FallingStars.css";

const FallingStars = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let animationInterval;

    const createFallingStar = () => {
      if (window.innerWidth < 768 && Math.random() > 0.5) return;
      const star = document.createElement("div");
      star.className = "falling-star";

      // Random position and size
      const left = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 2 + 1;
      const delay = Math.random() * 5;

      // Set star styles
      star.style.left = `${left}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size * 3}px`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      // Random star color (white, blue, or purple)
      const colors = ["#ffffff", "#64b5f6", "#ba68c8"];
      star.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(star);

      // Remove star after animation completes
      setTimeout(() => {
        star.remove();
      }, (duration + delay) * 1000);
    };

    // Create initial stars
    for (let i = 0; i < 3; i++) {
      setTimeout(createFallingStar, i * 1000);
    }

    const initialCount = window.innerWidth < 768 ? 2 : 3;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(createFallingStar, i * 1000);
    }
    const interval = window.innerWidth < 768 ? 8000 : 5000;
    animationInterval = setInterval(createFallingStar, interval);

    // Set up interval for new stars
    animationInterval = setInterval(createFallingStar, 5000);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return <div ref={containerRef} className="falling-stars-container" />;
};

export default FallingStars;
