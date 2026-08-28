import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Low-Poly 3D Robot Buddy
const CuteRobot = ({ position = [0, 0.4, 0], rotation = 0 }) => {
  const robotRef = useRef();

  useFrame((state, delta) => {
    if (robotRef.current) {
      robotRef.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  return (
    <group ref={robotRef} position={position} rotation={[0, rotation, 0]}>
      {/* Robot Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial color="#00bcd4" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Robot Head */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.45]} />
        <meshStandardMaterial color="#0097a7" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.13, 0.9, 0.24]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffeb3b" />
      </mesh>
      <mesh position={[-0.13, 0.9, 0.24]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffeb3b" />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2]} />
        <meshStandardMaterial color="#ffd166" />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ff5252" />
      </mesh>

      {/* Tracks / Wheels */}
      <mesh position={[0.38, 0.15, 0]}>
        <boxGeometry args={[0.15, 0.25, 0.7]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <mesh position={[-0.38, 0.15, 0]}>
        <boxGeometry args={[0.15, 0.25, 0.7]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
    </group>
  );
};

// 3D Star Goal
const StarGoal = ({ position = [2, 0.6, 0] }) => {
  const starRef = useRef();

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <Float speed={3} floatIntensity={0.8}>
      <group ref={starRef} position={position}>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#ffd166"
            emissive="#ffb703"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
        <Sparkles count={20} scale={1.5} size={4} speed={1} color="#ffd166" />
      </group>
    </Float>
  );
};

// Grid Floor Tiles
const GridFloor = () => {
  const tiles = [];
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; z <= 2; z++) {
      const isEven = (x + z) % 2 === 0;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x * 1.2, 0, z * 1.2]} receiveShadow>
          <boxGeometry args={[1.1, 0.15, 1.1]} />
          <meshStandardMaterial
            color={isEven ? '#e0f7fa' : '#b2ebf2'}
            roughness={0.4}
          />
        </mesh>
      );
    }
  }
  return <group>{tiles}</group>;
};

const Robot3DCanvas = ({ robotPos = [0, 0, 0], robotAngle = 0, starPos = [2.4, 0.6, 0] }) => {
  return (
    <div style={{ width: '100%', height: '360px', borderRadius: '24px', overflow: 'hidden', background: '#073b4c' }}>
      <Canvas camera={{ position: [0, 5, 6], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#00e5ff" />

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.3} />

        <GridFloor />
        <CuteRobot position={[robotPos[0] * 1.2, 0.4, robotPos[1] * 1.2]} rotation={robotAngle} />
        <StarGoal position={[starPos[0], starPos[1], starPos[2]]} />
      </Canvas>
    </div>
  );
};

export default Robot3DCanvas;
