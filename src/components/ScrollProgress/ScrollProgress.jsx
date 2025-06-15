import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./ScrollProgress.css";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      // Get all sections
      const homeSection = document.getElementById("home");
      const contactSection = document.getElementById("contact");

      if (!homeSection || !contactSection) return;

      // Get positions
      const homeTop = homeSection.offsetTop;
      const contactBottom =
        contactSection.offsetTop + contactSection.offsetHeight;

      // Viewport height
      const viewportHeight = window.innerHeight;

      // Total scrollable distance
      const totalScrollDistance = contactBottom - homeTop - viewportHeight;

      // Current scroll position
      const currentScroll = window.scrollY;

      // Calculate progress (0-100)
      let calculatedProgress =
        ((currentScroll - homeTop) / totalScrollDistance) * 100;

      // Clamp between 0 and 100
      calculatedProgress = Math.max(0, Math.min(100, calculatedProgress));

      setProgress(calculatedProgress);
      setIsVisible(currentScroll > homeTop);
    };

    // Add event listener
    window.addEventListener("scroll", calculateProgress);
    window.addEventListener("resize", calculateProgress);

    // Initial calculation
    calculateProgress();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Create portal target
  const portalContainer = document.getElementById("progress-portal");
  if (!portalContainer) return null;

  return createPortal(
    <>
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />

      {isVisible && (
        <div
          className="scroll-progress-circle"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            background: `conic-gradient(#6366f1 ${progress}%, transparent ${progress}%)`,
          }}
        >
          <div className="progress-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 4l-8 8h5v8h6v-8h5z" />
            </svg>
          </div>
        </div>
      )}
    </>,
    portalContainer
  );
};

export default ScrollProgress;
