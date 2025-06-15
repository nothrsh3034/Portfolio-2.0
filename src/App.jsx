import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SmoothScrollProvider } from "./context/SmoothScrollContext";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Skills from "./pages/Skills/Skills";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Projects from "./pages/Projects/Projects";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import MeteoroidShower from "./components/MeteoroidShower/MeteoroidShower";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/styles/global.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-content">
            <h2>⚠️ Application Error</h2>
            <p>We encountered an issue while loading the application.</p>
            <div className="error-actions">
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Reload Application
              </button>
              <button
                className="continue-button"
                onClick={this.props.onContinue}
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const CyberpunkIntro = ({ onComplete }) => {
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
          setTimeout(onComplete, 2000);
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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [appError, setAppError] = useState(null);

  const handleContinue = () => {
    setLoading(false);
    setAppError(null);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary onContinue={handleContinue}>
          {loading ? (
            <CyberpunkIntro onComplete={() => setLoading(false)} />
          ) : (
            <>
              <Header />
              <SmoothScrollProvider>
                <ScrollProgress />
                <div className="app">
                  <div className="space-background" />
                  <MeteoroidShower />
                  <div className="portfolio-content">
                    <ScrollToTop />
                    <main>
                      <Home />
                      <Skills />
                      <Projects />
                      <Experience />
                      <Contact />
                    </main>
                  </div>
                </div>
              </SmoothScrollProvider>
            </>
          )}
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
