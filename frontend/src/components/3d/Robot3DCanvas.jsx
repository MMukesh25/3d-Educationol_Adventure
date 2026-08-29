import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Robot3DCanvas({
  robotPos = { x: 0, y: 0 },
  robotDir = 0,
  gridSize = 4,
  stars = [{ x: 3, y: 3 }],
  obstacles = [{ x: 1, y: 1 }, { x: 2, y: 2 }]
}) {
  const containerRef = useRef(null);
  const robotGroupRef = useRef(null);
  const starsGroupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1e293b');

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(2, 7, 7);
    camera.lookAt(1.5, 0, 1.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Floor Grid Tiles
    const offset = gridSize / 2 - 0.5;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const isObstacle = obstacles.some((o) => o.x === c && o.y === r);
        const tileGeo = new THREE.BoxGeometry(0.9, 0.15, 0.9);
        const tileMat = new THREE.MeshStandardMaterial({
          color: isObstacle ? 0xef4444 : (r + c) % 2 === 0 ? 0x334155 : 0x475569,
          roughness: 0.5,
        });
        const tileMesh = new THREE.Mesh(tileGeo, tileMat);
        tileMesh.position.set(c, 0, r);
        tileMesh.receiveShadow = true;
        scene.add(tileMesh);

        if (isObstacle) {
          const obsGeo = new THREE.BoxGeometry(0.7, 0.8, 0.7);
          const obsMat = new THREE.MeshStandardMaterial({
            color: 0x991b1b,
            roughness: 0.6,
          });
          const obsMesh = new THREE.Mesh(obsGeo, obsMat);
          obsMesh.position.set(c, 0.45, r);
          obsMesh.castShadow = true;
          scene.add(obsMesh);
        }
      }
    }

    // Star Collectibles
    const starsGroup = new THREE.Group();
    scene.add(starsGroup);
    starsGroupRef.current = starsGroup;

    stars.forEach((s) => {
      const starGeo = new THREE.OctahedronGeometry(0.35, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xeab308,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      starMesh.position.set(s.x, 0.6, s.y);
      starMesh.castShadow = true;
      starsGroup.add(starMesh);
    });

    // 3D Robot
    const robotGroup = new THREE.Group();
    robotGroupRef.current = robotGroup;
    scene.add(robotGroup);

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.65, 0.55, 0.55);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.7,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.45;
    body.castShadow = true;
    robotGroup.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.45, 0.35, 0.4);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      metalness: 0.7,
      roughness: 0.3,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.85;
    head.castShadow = true;
    robotGroup.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.12, 0.88, 0.21);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.12, 0.88, 0.21);
    robotGroup.add(rightEye);

    // Antenna
    const antStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.18);
    const antStemMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
    const antStem = new THREE.Mesh(antStemGeo, antStemMat);
    antStem.position.y = 1.1;
    robotGroup.add(antStem);

    const antTipGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const antTipMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const antTip = new THREE.Mesh(antTipGeo, antTipMat);
    antTip.position.y = 1.22;
    robotGroup.add(antTip);

    // Wheels / Tracks
    const wheelGeo = new THREE.BoxGeometry(0.12, 0.2, 0.65);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const leftWheel = new THREE.Mesh(wheelGeo, wheelMat);
    leftWheel.position.set(0.35, 0.15, 0);
    robotGroup.add(leftWheel);

    const rightWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rightWheel.position.set(-0.35, 0.15, 0);
    robotGroup.add(rightWheel);

    // Initial position
    robotGroup.position.set(robotPos.x, 0, robotPos.y);
    robotGroup.rotation.y = (robotDir * Math.PI) / 2;

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

      // Star rotation & bounce
      if (starsGroupRef.current) {
        starsGroupRef.current.children.forEach((st, idx) => {
          st.rotation.y = elapsed * 1.5 + idx;
          st.position.y = 0.6 + Math.sin(elapsed * 2 + idx) * 0.1;
        });
      }

      // Robot gentle hover bounce
      if (robotGroupRef.current) {
        robotGroupRef.current.position.y = Math.sin(elapsed * 4) * 0.03;
      }

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
  }, [gridSize, obstacles]);

  // Update robot position and direction on state change
  useEffect(() => {
    if (robotGroupRef.current) {
      robotGroupRef.current.position.x = robotPos.x;
      robotGroupRef.current.position.z = robotPos.y;
      robotGroupRef.current.rotation.y = -(robotDir * Math.PI) / 2;
    }
  }, [robotPos, robotDir]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '360px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
      }}
    />
  );
}
