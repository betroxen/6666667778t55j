
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PHYSICS = {
    ELITE: "power4.out", 
    PUNCH: "back.out(1.7)", 
    BOOM: "elastic.out(1, 0.5)"
};

export const useGSAPContext = (scope: React.RefObject<HTMLElement>) => {
  const ctx = useRef<gsap.Context>();
  return useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current?.revert();
  }, [scope]);
};

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({ children, className = "", glowColor = "#00FFC0", ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (!card) return;
      
      gsap.set(card, { willChange: "transform, opacity, box-shadow", transformStyle: "preserve-3d" });

      const tl = gsap.timeline({ paused: true });
      tl.to(card, { 
          y: -10, 
          scale: 1.03, 
          duration: 0.4, 
          ease: PHYSICS.ELITE,
          boxShadow: `0 20px 40px -10px ${glowColor}20`,
          borderColor: `${glowColor}60`
      })
      .to(contentRef.current, { 
          y: -4, 
          duration: 0.4, 
          ease: PHYSICS.ELITE 
      }, "<");

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());

    }, cardRef);
    return () => ctx.revert();
  }, [glowColor]);

  return (
    <div 
      ref={cardRef} 
      className={`relative rounded-xl bg-[#0c0c0e] border border-white/5 overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none mix-blend-overlay" />
    </div>
  );
};

interface NeonSpringProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NeonSpring: React.FC<NeonSpringProps> = ({ children, className = "", onClick, ...props }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, 
        { scale: 0.92 }, 
        { scale: 1, duration: 0.4, ease: PHYSICS.BOOM }
      );
      gsap.to(btnRef.current, {
          backgroundColor: "#ffffff",
          duration: 0.05,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
      });
    }
    if (onClick) onClick(e);
  };

  useLayoutEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
        gsap.set(btn, { willChange: "transform" });
        
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(btn, { 
            y: -6, 
            scale: 1.04, 
            duration: 0.3, 
            ease: PHYSICS.ELITE,
            boxShadow: "0 10px 20px rgba(0,255,192,0.2)"
        });

        btn.addEventListener('mouseenter', () => hoverTl.play());
        btn.addEventListener('mouseleave', () => hoverTl.reverse());
    }, btnRef);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const RevealContainer: React.FC<{ children?: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.children;
      if (items) {
        gsap.fromTo(items, 
          { y: 40, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.08,
            delay: delay,
            ease: PHYSICS.ELITE,
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

export const RevealItem: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`will-change-transform ${className}`}>
    {children}
  </div>
);

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
    