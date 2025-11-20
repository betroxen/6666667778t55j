
import React, { useEffect, useRef } from 'react';
import { Icons } from './icons';
import { gsap } from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
          if (isOpen) {
              // Launch Sequence
              gsap.set(containerRef.current, { display: 'flex' });
              gsap.to(backdropRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
              gsap.fromTo(modalRef.current, 
                  { scale: 0.7, opacity: 0, y: 50 },
                  { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.75)", delay: 0.1 }
              );
          } else {
              // Close Sequence
              gsap.to(modalRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: "power2.in" });
              gsap.to(backdropRef.current, { 
                  opacity: 0, 
                  duration: 0.3, 
                  ease: "power2.in", 
                  onComplete: () => gsap.set(containerRef.current, { display: 'none' }) 
              });
          }
      }, containerRef);

      return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] items-center justify-center hidden"
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={backdropRef} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0 will-change-opacity" 
        onClick={onClose}
      ></div>
      
      <div 
        ref={modalRef} 
        className="relative bg-[#0c0c0e] border border-[#333] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-md m-4 will-change-transform"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#333] bg-[#111] rounded-t-xl">
          <h2 className="font-orbitron text-lg font-bold text-white uppercase tracking-wider">{title}</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-white transition-colors">
            <Icons.X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
