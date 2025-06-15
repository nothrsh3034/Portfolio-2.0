import { useEffect, useRef } from "react";
import "./ProfileOrbit.css";

const ProfileOrbit = ({ profileRef }) => {
  const moonRef = useRef(null);

  // Same values used in animation and ring
  const radiusX = 190;
  const radiusY = 120;

  useEffect(() => {
    if (!profileRef.current) return;

    const moon = moonRef.current;
    let angle = 0;
    const speed = 0.03;

    const animate = () => {
      angle += speed;
      const moonX = Math.cos(angle) * radiusX;
      const moonY = Math.sin(angle) * radiusY;

      moon.style.transform = `translate(${moonX}px, ${moonY}px)`;
      moon.style.zIndex = moonY < 0 ? 3 : 1;

      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, [profileRef]);

  return (
    <div className="profile-orbit-container">
      <div className="orbit-center">
        <div
          className="ring-ellipse"
          style={{
            width: `${2 * radiusX}px`,
            height: `${2 * radiusY}px`,
          }}
        ></div>
        <div ref={moonRef} className="orbit-moon" />
      </div>
    </div>
  );
};

export default ProfileOrbit;
