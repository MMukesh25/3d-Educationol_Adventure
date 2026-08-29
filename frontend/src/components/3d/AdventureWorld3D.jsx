import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import soundService from '../../services/soundService';

const WORLDS = [
  { id: 'math', title: 'Math Island', emoji: '🍎', color: '#ff5e7e', route: '/math', pos: [-5, 1.5, 2] },
  { id: 'detective', title: 'Mystery House', emoji: '🔍', color: '#a55eea', route: '/detective', pos: [-3, 2.5, -4] },
  { id: 'coding', title: 'Coding Lab', emoji: '💻', color: '#00d2d3', route: '/coding', pos: [0, 2, 5] },
  { id: 'memory', title: 'Brain Forest', emoji: '🌳', color: '#10ac84', route: '/memory', pos: [3, 2.2, -4] },
  { id: 'puzzle', title: 'Puzzle Castle', emoji: '🏰', color: '#ff9f43', route: '/puzzle', pos: [5, 1.8, 2] },
  { id: 'creative', title: 'Creativity Zone', emoji: '🎨', color: '#54a0ff', route: '/creative', pos: [0, 3.5, -6] },
];

export default function AdventureWorld3D({ onSelectWorld }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#70a1ff');
    scene.fog = new THREE.FogExp2('#70a1ff', 0.035);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 10, 16);
    camera.lookAt(0, 1, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, 0.4);
    scene.add(hemiLight);

    // 4. Central Floating Island
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);

    // Grass Top
    const grassGeo = new THREE.CylinderGeometry(8, 7.5, 1.2, 32);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2ed573,
      roughness: 0.8,
    });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.receiveShadow = true;
    islandGroup.add(grassMesh);

    // Rock Underneath
    const rockGeo = new THREE.ConeGeometry(7.5, 5, 32);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x8854d0,
      roughness: 0.9,
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.y = -3;
    rockMesh.rotation.x = Math.PI;
    islandGroup.add(rockMesh);

    // Center Gold Star Monument
    const starGeo = new THREE.OctahedronGeometry(1.4, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffd32a,
      emissive: 0xffa801,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const starMonument = new THREE.Mesh(starGeo, starMat);
    starMonument.position.set(0, 3, 0);
    starMonument.castShadow = true;
    islandGroup.add(starMonument);

    // 5. Interactive World Portals
    const portalMeshes = [];
    WORLDS.forEach((w) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(...w.pos);
      pGroup.userData = { world: w };

      // Rotating Torus Ring
      const ringGeo = new THREE.TorusGeometry(1.1, 0.2, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(w.color),
        emissive: new THREE.Color(w.color),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.castShadow = true;
      pGroup.add(ringMesh);

      // Inner Core Orb
      const orbGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(w.color),
        emissiveIntensity: 0.8,
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      pGroup.add(orbMesh);

      islandGroup.add(pGroup);
      portalMeshes.push({ group: pGroup, ring: ringMesh, orb: orbMesh, data: w });
    });

    // 6. Floating Clouds
    const clouds = [];
    const cloudGeo = new THREE.DodecahedronGeometry(1.5, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < 7; i++) {
      const c = new THREE.Mesh(cloudGeo, cloudMat);
      const angle = (i / 7) * Math.PI * 2;
      const dist = 12 + Math.random() * 4;
      c.position.set(Math.cos(angle) * dist, 2 + Math.random() * 4, Math.sin(angle) * dist);
      c.scale.set(1.5 + Math.random(), 0.8 + Math.random() * 0.4, 1.2 + Math.random());
      scene.add(c);
      clouds.push({ mesh: c, angle, dist, speed: 0.002 + Math.random() * 0.003, y: c.position.y });
    }

    // 7. Twinkling Sparkles / Stars
    const starCount = 80;
    const starParticlesGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 30;
      starPos[i + 1] = Math.random() * 15;
      starPos[i + 2] = (Math.random() - 0.5) * 30;
    }
    starParticlesGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starParticlesMat = new THREE.PointsMaterial({
      color: 0xfffa65,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
    });
    const starParticles = new THREE.Points(starParticlesGeo, starParticlesMat);
    scene.add(starParticles);

    // 8. Raycasting for Click & Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredPortal = null;

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const clickableObjects = portalMeshes.map((p) => p.ring);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        const hitRing = intersects[0].object;
        const matched = portalMeshes.find((p) => p.ring === hitRing);
        hoveredPortal = matched;
      } else {
        container.style.cursor = 'default';
        hoveredPortal = null;
      }
    };

    const onClick = (e) => {
      if (hoveredPortal) {
        soundService.playPop();
        if (onSelectWorld) {
          onSelectWorld(hoveredPortal.data);
        }
        navigate(hoveredPortal.data.route);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);

    // Mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onDragMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        targetRotationY += deltaX * 0.006;
        prevMouseX = e.clientX;
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDragMove);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Island Rotation
      islandGroup.rotation.y += (targetRotationY - islandGroup.rotation.y) * 0.05;
      targetRotationY += 0.001; // gentle continuous rotation

      // Floating Star Monument
      starMonument.rotation.y = elapsed * 0.8;
      starMonument.rotation.x = Math.sin(elapsed * 1.2) * 0.2;
      starMonument.position.y = 3 + Math.sin(elapsed * 2) * 0.3;

      // Portals Animation
      portalMeshes.forEach((p, idx) => {
        p.ring.rotation.y = elapsed * 0.9 + idx;
        p.ring.rotation.x = Math.sin(elapsed * 0.6 + idx) * 0.3;

        const isHovered = hoveredPortal === p;
        const targetScale = isHovered ? 1.35 : 1.0;
        p.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        p.ring.material.emissiveIntensity = isHovered ? 0.9 : 0.4;
      });

      // Orbiting Clouds
      clouds.forEach((c) => {
        c.angle += c.speed;
        c.mesh.position.x = Math.cos(c.angle) * c.dist;
        c.mesh.position.z = Math.sin(c.angle) * c.dist;
        c.mesh.position.y = c.y + Math.sin(elapsed + c.angle) * 0.4;
      });

      // Floating Stars Sparkle
      starParticles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onClick);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [navigate, onSelectWorld]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '8px 24px',
        borderRadius: '999px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#475569',
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        ✨ Click any glowing portal or drag to explore the 3D World!
      </div>
    </div>
  );
}
