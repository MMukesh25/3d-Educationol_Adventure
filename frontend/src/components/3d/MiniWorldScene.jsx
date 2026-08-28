import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';

const RotatingFeature = ({ theme = 'math' }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const getGeometry = () => {
    switch (theme) {
      case 'math':
        return <torusKnotGeometry args={[1.5, 0.4, 64, 16]} />;
      case 'mystery':
        return <dodecahedronGeometry args={[1.8, 0]} />;
      case 'coding':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'brain':
        return <icosahedronGeometry args={[1.8, 1]} />;
      case 'puzzle':
        return <octahedronGeometry args={[2, 0]} />;
      case 'creative':
      default:
        return <sphereGeometry args={[1.6, 32, 32]} />;
    }
  };

  const getColor = () => {
    switch (theme) {
      case 'math': return '#ff5722';
      case 'mystery': return '#9c27b0';
      case 'coding': return '#00bcd4';
      case 'brain': return '#4caf50';
      case 'puzzle': return '#ff9800';
      case 'creative':
      default: return '#e91e63';
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial
          color={getColor()}
          roughness={0.3}
          metalness={0.7}
          wireframe={false}
        />
      </mesh>
      <Sparkles count={40} scale={5} size={4} speed={0.6} color={getColor()} />
    </Float>
  );
};

const MiniWorldScene = ({ theme = 'math' }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.85 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.8} />
        <RotatingFeature theme={theme} />
      </Canvas>
    </div>
  );
};

export default MiniWorldScene;
