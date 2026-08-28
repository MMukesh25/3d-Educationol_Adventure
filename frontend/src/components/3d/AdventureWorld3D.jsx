import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import soundService from '../../services/soundService';

// Floating World Portal Arch
const WorldPortal = ({ position, color, title, emoji, route }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    soundService.playPop();
    navigate(route);
  };

  return (
    <group position={position}>
      {/* Floating Rotating Portal Ring */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        scale={hovered ? 1.25 : 1}
      >
        <torusGeometry args={[1.2, 0.22, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Center Emoji Banner */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={handleClick}
        >
          {emoji}
        </Text>
      </Float>

      {/* Floating Label */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.45}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#ffffff"
      >
        {title}
      </Text>

      {/* Light Sparkles around active portals */}
      <Sparkles count={15} scale={2.5} size={3} speed={0.4} color={color} />
    </group>
  );
};

// Floating Low-Poly Cloud
const Cloud = ({ position, scale = 1 }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group position={position} scale={scale}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0.6, -0.1, 0.2]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[-0.6, -0.1, -0.1]}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

// Central Island Hub Base
const CentralIsland = () => {
  return (
    <group position={[0, -2, 0]}>
      {/* Top Grass Deck */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[6.5, 5.5, 1.2, 32]} />
        <meshStandardMaterial color="#78c850" roughness={0.7} />
      </mesh>

      {/* Island Earth Bottom Cone */}
      <mesh receiveShadow position={[0, -2, 0]}>
        <coneGeometry args={[5.5, 3.2, 32]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} />
      </mesh>

      {/* Central Golden Star Monument */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <group position={[0, 2.2, 0]}>
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#ffb703"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <Sparkles count={30} scale={3} size={5} speed={0.8} color="#ffd166" />
        </group>
      </Float>
    </group>
  );
};

const AdventureWorld3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '650px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 5, 14], fov: 50 }}
        style={{ width: '100%', height: '100%', borderRadius: '24px' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffd166" />

        {/* Orbit Camera for full 3D interactive exploration */}
        <OrbitControls
          enableZoom={true}
          maxDistance={22}
          minDistance={8}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={true}
          autoRotateSpeed={0.6}
        />

        {/* 3D Clouds */}
        <Cloud position={[-6, 4, -4]} scale={1.2} />
        <Cloud position={[7, 5, -2]} scale={1} />
        <Cloud position={[0, 6, -7]} scale={1.4} />

        {/* Central Floating Island */}
        <CentralIsland />

        {/* 6 Interactive 3D Educational World Portals */}
        <WorldPortal
          position={[-4.5, 0.5, 2.5]}
          color="#ff5722"
          title="Math Island"
          emoji="🧮"
          route="/math"
        />

        <WorldPortal
          position={[0, 0.5, 4.5]}
          color="#9c27b0"
          title="Mystery House"
          emoji="🔍"
          route="/mystery"
        />

        <WorldPortal
          position={[4.5, 0.5, 2.5]}
          color="#00bcd4"
          title="Coding Lab"
          emoji="💻"
          route="/coding"
        />

        <WorldPortal
          position={[-4.5, 0.5, -2.5]}
          color="#4caf50"
          title="Brain Forest"
          emoji="🧠"
          route="/brain"
        />

        <WorldPortal
          position={[0, 0.5, -4.5]}
          color="#ff9800"
          title="Puzzle Castle"
          emoji="🧩"
          route="/puzzle"
        />

        <WorldPortal
          position={[4.5, 0.5, -2.5]}
          color="#e91e63"
          title="Creativity Zone"
          emoji="🎨"
          route="/creative"
        />
      </Canvas>
    </div>
  );
};

export default AdventureWorld3D;
