// components/FixedProgressWrapper.jsx
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const FixedProgressWrapper = ({ children }) => {
  const portalRef = useRef(null);

  useEffect(() => {
    // Create a div element for the portal
    const portalDiv = document.createElement("div");
    portalDiv.className = "fixed-progress-portal";
    document.body.appendChild(portalDiv);
    portalRef.current = portalDiv;

    return () => {
      // Clean up on unmount
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  if (!portalRef.current) return null;

  return createPortal(children, portalRef.current);
};

export default FixedProgressWrapper;
