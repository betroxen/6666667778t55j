
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

export const CyberScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. OPTIMIZED SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02); // Deep atmospheric fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // --- 2. LOW-POLY CORE ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Wireframe Icosahedron (The Brain)
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00FFC0, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.1 
    });
    const sphere = new THREE.Mesh(geometry, material);
    coreGroup.add(sphere);

    // Inner Black Body (Occlusion)
    const blackGeo = new THREE.IcosahedronGeometry(1.75, 1);
    const blackMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const blackSphere = new THREE.Mesh(blackGeo, blackMat);
    coreGroup.add(blackSphere);

    // --- 3. PARTICLE FIELD (Mobile Optimized) ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 600 : 2000;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 25; // Spread
    }
    
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x8b5cf6, // Violet
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // --- 4. TACTICAL GRID FLOOR ---
    const gridHelper = new THREE.GridHelper(50, 50, 0x222222, 0x0a0a0a);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // --- 5. GSAP ANIMATION LOOP ---
    
    // Initial Entrance
    gsap.from(coreGroup.scale, { x: 0, y: 0, z: 0, duration: 2, ease: "elastic.out(1, 0.75)" });
    
    // Breathing Core
    gsap.to(coreGroup.scale, { 
        x: 1.05, y: 1.05, z: 1.05, 
        duration: 3, 
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut" 
    });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Parallax
        gsap.to(camera.position, {
            x: mouseX * 0.5,
            y: 1 + mouseY * 0.3,
            duration: 1,
            ease: "power2.out"
        });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render Loop
    const animate = () => {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.0005;

        coreGroup.rotation.y += 0.002;
        coreGroup.rotation.z = Math.sin(time) * 0.1;
        
        particlesMesh.rotation.y = -time * 0.1;
        
        // Grid Drift
        gridHelper.position.z = (time * 2) % 2;

        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
