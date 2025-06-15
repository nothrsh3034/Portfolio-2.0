// context/SmoothScrollContext.jsx
import { createContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SmoothScrollContext = createContext();

export const SmoothScrollProvider = ({ children }) => {
  const scrollingContainerRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = scrollingContainerRef.current;

    // Set up the smooth scroll container
    gsap.set(container, {
      position: "fixed",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      overflow: "hidden",
    });

    // Create smooth scroll effect
    const scroller = {
      target: document.querySelector("#smooth-content"),
      ease: 0.2,
      endY: 0,
      y: 0,
      resizeRequest: 1,
      scrollRequest: 0,
    };

    let requestId = null;

    const updateScroller = () => {
      const resized = scroller.resizeRequest > 0;

      if (resized) {
        const height = scroller.target.clientHeight;
        document.body.style.height = height + "px";
        scroller.resizeRequest = 0;
      }

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      scroller.endY = scrollY;
      scroller.y += (scrollY - scroller.y) * scroller.ease;

      if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
      }

      // Apply transform only to content
      scroller.target.style.transform = `translate3d(0, -${scroller.y}px, 0)`;

      requestId =
        scroller.scrollRequest > 0
          ? requestAnimationFrame(updateScroller)
          : null;
    };

    const onScroll = () => {
      scroller.scrollRequest++;
      if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
      }
    };

    const onResize = () => {
      scroller.resizeRequest++;
      if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initialize
    updateScroller();

    // Set up ScrollTrigger
    //ScrollTrigger.defaults({
    // scroller: container,
    //});

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollingContainerRef }}>
      <div ref={scrollingContainerRef} className="smooth-scroll-container">
        <div id="smooth-content">{children}</div>
      </div>
    </SmoothScrollContext.Provider>
  );
};
