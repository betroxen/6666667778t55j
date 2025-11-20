
import React, { useRef, useLayoutEffect } from 'react';
import { Icons } from './icons';
import { gsap } from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        const el = internalRef.current;
        if(!el) return;

        const ctx = gsap.context(() => {
            gsap.set(el, { willChange: "transform" });

            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(el, { 
                y: -6, 
                scale: 1.04, 
                duration: 0.3, 
                ease: "power4.out", 
                boxShadow: variant === 'primary' ? "0 0 30px rgba(0,255,192,0.4)" : "none"
            });

            el.addEventListener('mouseenter', () => hoverTl.play());
            el.addEventListener('mouseleave', () => hoverTl.reverse());
            
            el.addEventListener('click', () => {
                gsap.fromTo(el, 
                    { scale: 0.95 }, 
                    { scale: 1.04, duration: 0.4, ease: "back.out(2)" } // Punch
                );
                // Glitch effect
                if (variant === 'primary') {
                    gsap.to(el, { x: 2, duration: 0.05, yoyo: true, repeat: 3 });
                }
            });

        }, el);
        return () => ctx.revert();
    }, [variant]);

    // Base Styles
    let baseClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-surge disabled:opacity-50 disabled:pointer-events-none font-orbitron uppercase tracking-wider relative overflow-hidden ";
    
    // Variants
    if (variant === 'primary') baseClass += "bg-neon-surge text-black ";
    else if (variant === 'ghost') baseClass += "bg-transparent hover:bg-white/5 text-text-secondary hover:text-white ";
    else if (variant === 'destructive') baseClass += "bg-warning-high text-white ";

    // Sizes
    if (size === 'default') baseClass += "h-10 py-2 px-4 ";
    else if (size === 'sm') baseClass += "h-9 px-3 ";
    else if (size === 'lg') baseClass += "h-12 px-8 ";

    return (
      <button
        ref={internalRef}
        className={`${baseClass} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Icons.Loader2 className="h-5 w-5 animate-spin" />
            <span>PROCESSING</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
