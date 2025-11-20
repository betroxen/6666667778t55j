
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

export const CyberScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. SETUP ---
    const scene = new THREE.Scene();
    // Dark, dense fog for the "matte-dark" feel
    scene.fog = new THREE.FogExp2(0x050505, 0.025);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // --- 2. GEOMETRY ARSENAL ---

    // Group to hold the core elements
    const tacticalGroup = new THREE.Group();
    scene.add(tacticalGroup);

    // A. The Core (Icosahedron - Wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00FFC0,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    tacticalGroup.add(coreMesh);

    // B. Inner Solid Black Body (Occlusion)
    const solidGeo = new THREE.IcosahedronGeometry(1.48, 1);
    const solidMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const solidMesh = new THREE.Mesh(solidGeo, solidMat);
    tacticalGroup.add(solidMesh);

    // C. Orbital Data Cloud (Points)
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide field
        posArray[i] = (Math.random() - 0.5) * 30;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x8b5cf6, // Violet data points
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // D. Tactical Grid Floor
    const gridHelper = new THREE.GridHelper(60, 60, 0x222222, 0x0a0a0a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // --- 3. ANIMATION & GSAP STRIKES ---

    // Initial Entry Strike
    gsap.from(tacticalGroup.scale, { x: 0, y: 0, z: 0, duration: 1.5, ease: "back.out(1.2)" });
    gsap.from(gridHelper.position, { y: -10, duration: 1.5, ease: "power3.out" }, "-=1");

    // Continuous Core Pulse
    gsap.to(coreMesh.scale, {
        x: 1.05, y: 1.05, z: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // --- 4. INTERACTION LOOP ---
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        // Camera subtle parallax
        gsap.to(camera.position, {
            x: mouseX * 0.5,
            y: 1 + mouseY * 0.2,
            duration: 1.5,
            ease: "power2.out"
        });

        // Grid tilt
        gsap.to(gridHelper.rotation, {
            z: -mouseX * 0.05,
            duration: 1,
            ease: "power2.out"
        });
    };

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // --- 5. RENDER LOOP ---
    const animate = () => {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Constant Tactical Rotation
        tacticalGroup.rotation.y = time * 0.1;
        tacticalGroup.rotation.z = Math.sin(time * 0.2) * 0.1;

        // Particle Drift
        particles.rotation.y = time * 0.05;

        // Grid Forward Movement Simulation
        gridHelper.position.z = (time * 2) % 1;

        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
        // Clean geometries to prevent leaks
        coreGeo.dispose();
        solidGeo.dispose();
        particlesGeo.dispose();
        coreMat.dispose();
        solidMat.dispose();
        particlesMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
