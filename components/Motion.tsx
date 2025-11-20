
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, useMotionTemplate } from 'framer-motion';

// ELITE PHYSICS PRESETS
// Stiffness 400, Damping 30 = Crisp, zero overshoot, military precision.
const SPRING_ELITE = { type: "spring", stiffness: 400, damping: 30, mass: 1 };
const SPRING_PUNCH = { type: "spring", stiffness: 600, damping: 28, mass: 0.8 };

// 1. CyberCard: "Matte-Dark" Physics with Dynamic Glare
export const CyberCard = ({ children, className = "", glowColor = "rgba(0, 255, 192, 0.3)" }: { children?: React.ReactNode, className?: string, glowColor?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Tighter spring physics for "military" feel
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-300, 300], [12, -12]); // Increased tilt range
  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12]);

  // Glare effect position (opposite to tilt for realism)
  const glareX = useTransform(mouseX, [-300, 300], [0, 100]);
  const glareY = useTransform(mouseY, [-300, 300], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{ perspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative will-change-transform group/card ${className}`}
    >
      {/* Dynamic Glare Overlay */}
      <motion.div
        style={{ background: glareBg }}
        className="absolute inset-0 rounded-xl z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
      />

      {/* Neon Border Pulse on Hover */}
      <div className="absolute inset-0 rounded-xl border border-white/5 group-hover/card:border-[#00FFC0]/50 transition-colors duration-300 pointer-events-none z-20" />

      <div className="relative z-0 h-full transform-style-3d">
        {children}
      </div>
    </motion.div>
  );
};

// 2. ParallaxLayer: Deep Field Depth
export const ParallaxLayer = ({ children, speed = 0.5, className = "" }: { children?: React.ReactNode, speed?: number, className?: string }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-50 * speed}%`]); // Increased range
  return <motion.div style={{ y }} className={`will-change-transform ${className}`}>{children}</motion.div>;
};

// 3. NeonSpring: "Tactical Click"
export const NeonSpring = ({ children, className = "", onClick, ...props }: any) => {
  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    if(onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={SPRING_PUNCH}
      className={`relative overflow-hidden group ${className}`}
      onClick={handleClick}
      {...props}
    >
      {/* Hover Scanline */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {ripples.map(r => (
        <span
            key={r.id}
            className="absolute rounded-full bg-[#00FFC0]/40 animate-ripple pointer-events-none"
            style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// 4. RevealContainer: "Staggered Assault"
export const RevealContainer: React.FC<{ children?: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-10%" }}
    variants={{
      hidden: { opacity: 0 },
      show: {
          opacity: 1,
          transition: {
              staggerChildren: 0.08, // Faster stagger for elite feel
              delayChildren: delay
          }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const RevealItem: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }, // Matte-dark entry
      show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: SPRING_ELITE
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);
