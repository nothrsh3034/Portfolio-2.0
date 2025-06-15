import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, OrbitControls, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import "./TechLoader.css";

const BinaryParticles = ({ count = 2000 }) => {
  const particlesRef = useRef();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    scales[i] = Math.random() * 0.5 + 0.5;
  }

  useFrame((state) => {
    const { clock } = state;
    particlesRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.05}
        color="#00ffff"
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const CodeTerminal = ({ progress }) => {
  return (
    <group position={[0, -1, 0]}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.4}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {`> LOADING: ${Math.round(progress * 100)}%`}
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
        />
      </Text3D>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 0.2]} />
        <meshBasicMaterial color="#003300" />
      </mesh>
      <mesh
        position={[-1.5 + progress * 3, -0.5, 0.01]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.1, 0.18]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

const TechLoaderScene = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.01;
        if (newProgress >= 1) {
          clearInterval(interval);
          setShowContent(true);
          setTimeout(() => onComplete(), 1500);
          return 1;
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <BinaryParticles />

      {!showContent ? (
        <CodeTerminal progress={progress} />
      ) : (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, 0, 0]}
          >
            HARSH JOSHI
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.1}
            position={[0, -0.5, 0]}
          >
            FULL STACK DEVELOPER
            <meshStandardMaterial color="#00ff88" />
          </Text3D>
        </Float>
      )}
    </>
  );
};

export const TechLoader = ({ onComplete }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loader = new THREE.FileLoader();
    loader.load(
      "/fonts/helvetiker_regular.typeface.json",
      () => setFontLoaded(true),
      undefined,
      (err) => {
        console.error("Error loading font:", err);
        setFontLoaded(true);
      }
    );
  }, []);

  if (!fontLoaded) {
    return (
      <div className="tech-loader-container">
        <div className="fallback-loader">Initializing system...</div>
      </div>
    );
  }

  return (
    <div className="tech-loader-container">
      <Suspense
        fallback={
          <div className="fallback-loader">Loading 3D environment...</div>
        }
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <TechLoaderScene onComplete={onComplete} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
};
