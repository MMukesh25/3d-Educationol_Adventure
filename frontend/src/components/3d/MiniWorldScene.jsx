import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MiniWorldScene({ theme = 'math' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Theme Geometry & Color
    let geometry;
    let colorHex;
    switch (theme) {
      case 'math':
        geometry = new THREE.TorusKnotGeometry(1.4, 0.38, 64, 16);
        colorHex = 0xff5e7e;
        break;
      case 'mystery':
        geometry = new THREE.DodecahedronGeometry(1.8, 0);
        colorHex = 0xa55eea;
        break;
      case 'coding':
        geometry = new THREE.BoxGeometry(2, 2, 2);
        colorHex = 0x00d2d3;
        break;
      case 'brain':
        geometry = new THREE.IcosahedronGeometry(1.8, 1);
        colorHex = 0x10ac84;
        break;
      case 'puzzle':
        geometry = new THREE.OctahedronGeometry(2, 0);
        colorHex = 0xff9f43;
        break;
      case 'creative':
      default:
        geometry = new THREE.SphereGeometry(1.6, 32, 32);
        colorHex = 0x54a0ff;
        break;
    }

    const material = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.25,
      roughness: 0.3,
      metalness: 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Floating Sparkles
    const particleCount = 40;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 8;
      pPos[i + 1] = (Math.random() - 0.5) * 8;
      pPos[i + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: colorHex,
      size: 0.25,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mesh.rotation.x = elapsed * 0.4;
      mesh.rotation.y = elapsed * 0.5;
      mesh.position.y = Math.sin(elapsed * 1.5) * 0.3;

      particles.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.85,
        pointerEvents: 'none',
      }}
    />
  );
}
