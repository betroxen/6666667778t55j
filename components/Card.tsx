
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
      const el = cardRef.current;
      if(!el) return;

      const ctx = gsap.context(() => {
          gsap.set(el, { willChange: "transform, box-shadow" });

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(el, {
              y: -10,
              scale: 1.02,
              borderColor: "rgba(255,255,255,0.2)",
              duration: 0.4,
              ease: "power4.out",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
          });

          el.addEventListener('mouseenter', () => hoverTl.play());
          el.addEventListener('mouseleave', () => hoverTl.reverse());
      }, el);

      return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-foundation-light border border-[#333] rounded-xl relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Active Blade Line (Invisible by default, can be toggled via class if needed) */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon-surge opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      {children}
    </div>
  );
};
