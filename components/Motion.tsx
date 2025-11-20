
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- PHYSICS PRESETS (GSAP MAPPING) ---
// Elite: Crisp, no overshoot, mechanical precision.
const EASE_ELITE = "power4.out"; 
// Punch: Sharp impact, slight overshoot.
const EASE_PUNCH = "back.out(1.7)";
// Boom: Heavy, satisfying bounce.
const EASE_BOOM = "elastic.out(1, 0.5)";

export const useGSAPContext = (scope: React.RefObject<HTMLElement>) => {
  const ctx = useRef<gsap.Context>();
  return useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current?.revert();
  }, [scope]);
};

// 1. CyberCard: Matte-Dark Physics
interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({ children, className = "", glowColor = "#00FFC0", ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hover Physics
      const card = cardRef.current;
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: EASE_ELITE, boxShadow: `0 10px 30px -10px ${glowColor}40` });
        gsap.to(contentRef.current, { y: -2, duration: 0.4, ease: EASE_ELITE });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.6, ease: EASE_ELITE, boxShadow: 'none' });
        gsap.to(contentRef.current, { y: 0, duration: 0.6, ease: EASE_ELITE });
      });
    }, cardRef);
    return () => ctx.revert();
  }, [glowColor]);

  return (
    <div 
      ref={cardRef} 
      className={`relative rounded-xl bg-[#0c0c0e] border border-white/5 will-change-transform overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300 mix-blend-overlay" />
    </div>
  );
};

// 2. NeonSpring: Tactical Click Button
interface NeonSpringProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NeonSpring: React.FC<NeonSpringProps> = ({ children, className = "", onClick, ...props }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      // Punch Effect
      gsap.fromTo(btnRef.current, 
        { scale: 0.95 }, 
        { scale: 1, duration: 0.4, ease: EASE_BOOM }
      );
      
      // Ripple Logic could go here via DOM append, keeping it lightweight for now
    }
    if (onClick) onClick(e);
  };

  useLayoutEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: EASE_PUNCH });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: EASE_ELITE });
      });
    }, btnRef);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 3. RevealContainer: Staggered Assault
export const RevealContainer: React.FC<{ children?: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.children;
      if (items) {
        gsap.fromTo(items, 
          { y: 20, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.08,
            delay: delay,
            ease: EASE_ELITE,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// 4. RevealItem: Wrapper for individual items if needed manually
export const RevealItem: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`will-change-transform ${className}`}>
    {children}
  </div>
);

// 5. ParallaxLayer: Deep Field
export const ParallaxLayer: React.FC<{ children?: React.ReactNode, speed?: number, className?: string }> = ({ children, speed = 0.5, className = "" }) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        y: () => -(document.documentElement.scrollHeight - window.innerHeight) * speed * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0
        }
      });
    }, layerRef);
    return () => ctx.revert();
  }, [speed]);

  return <div ref={layerRef} className={`will-change-transform ${className}`}>{children}</div>;
};
