// components/TechSphere/TechSphere.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./TechSphere.css";

const TechSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Skill icons
    const skillIcons = [
      { name: "HTML", position: new THREE.Vector3(0, 6, 0), size: 1.2 },
      { name: "React", position: new THREE.Vector3(4, 4, 0), size: 1 },
      // Add other skills...
    ];

    skillIcons.forEach((skill) => {
      const texture = new THREE.TextureLoader().load(
        `/images/skills/${skill.name.toLowerCase()}.png`
      );
      const iconMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(iconMaterial);
      sprite.position.copy(skill.position);
      sprite.scale.set(skill.size, skill.size, skill.size);
      scene.add(sprite);
    });

    // Camera position
    camera.position.z = 10;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="tech-sphere-container" ref={mountRef} />;
};

export default TechSphere;
