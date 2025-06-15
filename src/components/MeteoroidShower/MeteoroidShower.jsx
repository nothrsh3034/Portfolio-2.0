// components/MeteoroidShower/MeteoroidShower.jsx
import { useEffect, useRef } from "react";
import "./MeteoroidShower.css";

const MeteoroidShower = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let meteoroidInterval;

    const createMeteoroid = () => {
      if (window.innerWidth < 768 && Math.random() > 0.3) return;

      const meteoroid = document.createElement("div");
      meteoroid.className = "meteoroid";

      // Random properties
      const startX = Math.random() * 80 - 20; // -20% to 100%
      const startY = Math.random() * -100 - 100; // Above viewport
      const angle = Math.random() * 30 + 100; //  degree angle
      const duration = Math.random() * 0 + 1.5; // 1.5-2.5 seconds
      const size = Math.random() * 5 + 10;
      const tailLength = size * 15; // Tail length proportional to size

      // Set meteoroid styles
      meteoroid.style.setProperty("--start-x", `${startX}%`);
      meteoroid.style.setProperty("--start-y", `${startY}px`);
      meteoroid.style.setProperty("--angle", `${angle}deg`);
      meteoroid.style.setProperty("--duration", `${duration}s`);
      meteoroid.style.setProperty("--size", `${size}px`);
      meteoroid.style.setProperty("--tail-length", `${tailLength}px`);

      // Color variations (white, blue, yellow)
      const colors = [
        { head: "#ffffff", tail: "rgba(255, 255, 255, 0.2)" },
        { head: "yellow", tail: "rgba(178, 210, 0, 0.2)" },
        { head: "#ffeb3b", tail: "rgba(255, 235, 59, 0.2)" },
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      meteoroid.style.setProperty("--head-color", color.head);
      meteoroid.style.setProperty("--tail-color", color.tail);

      container.appendChild(meteoroid);

      // Remove meteoroid after animation completes
      setTimeout(() => {
        meteoroid.remove();
      }, duration * 1000);

      // Create occasional flash effect (30% chance)
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const flash = document.createElement("div");
          flash.className = "meteoroid-flash";
          flash.style.left = `${startX + 5}%`;
          flash.style.top = `${startY + 50}px`;
          meteoroid.appendChild(flash);

          setTimeout(() => flash.remove(), 300);
        }, duration * 500);
      }
    };
    const initialCount = window.innerWidth < 768 ? 1 : 2;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(createMeteoroid, i * 800);
    }

    // Initial meteoroids
    for (let i = 0; i < 2; i++) {
      setTimeout(createMeteoroid, i * 800);
    }

    // Set up interval for new meteoroids (every 3 seconds)
    meteoroidInterval = setInterval(createMeteoroid, 3000);
    const interval = window.innerWidth < 768 ? 5000 : 3000;
    meteoroidInterval = setInterval(createMeteoroid, interval);

    return () => {
      clearInterval(meteoroidInterval);
    };
  }, []);

  return <div ref={containerRef} className="meteoroid-shower-container" />;
};

export default MeteoroidShower;
