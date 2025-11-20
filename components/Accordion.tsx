
import React, { createContext, useContext, useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { Icons } from './icons';
import { gsap } from 'gsap';

interface AccordionContextType {
  openValues: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
    value: string;
    isOpen: boolean;
}
const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

interface AccordionProps {
  children?: ReactNode;
  multiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({ children, multiple = false, defaultOpen = [] }) => {
  const [openValues, setOpenValues] = useState<string[]>(defaultOpen);

  const toggleItem = (value: string) => {
    setOpenValues(prev => {
      if (multiple) {
        return prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      } else {
        return prev.includes(value) ? [] : [value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<{ children?: ReactNode; value: string; className?: string }> = ({ children, value, className }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within an Accordion');
  const isOpen = context.openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div className={className || "border-b border-[#333] last:border-b-0"}>
            {children}
        </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  const context = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  if (!context || !itemContext) throw new Error('Trigger err');
  const { value, isOpen } = itemContext;
  const iconRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
      const ctx = gsap.context(() => {
          gsap.to(iconRef.current, {
              rotation: isOpen ? 180 : 0,
              duration: 0.4,
              ease: "back.out(1.7)"
          });
      });
      return () => ctx.revert();
  }, [isOpen]);

  return (
    <button
      ref={triggerRef}
      className={className || "flex w-full items-center justify-between py-4 text-left group focus:outline-none"}
      onClick={() => context.toggleItem(value)}
      onMouseEnter={() => gsap.to(triggerRef.current, { x: 4, duration: 0.3, ease: "power2.out" })}
      onMouseLeave={() => gsap.to(triggerRef.current, { x: 0, duration: 0.3, ease: "power2.out" })}
    >
      <div className="flex-1">{children}</div>
      <div ref={iconRef}>
        <Icons.ChevronDown className="h-5 w-5 shrink-0 text-neon-surge" />
      </div>
    </button>
  );
};

export const AccordionContent: React.FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  const { isOpen } = useContext(AccordionItemContext)!;
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
        if (isOpen) {
            gsap.set(el, { height: "auto" });
            gsap.from(el, { height: 0, duration: 0.5, ease: "power4.out" });
        } else {
            gsap.to(el, { height: 0, duration: 0.4, ease: "power3.in" });
        }
    });
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div ref={contentRef} className={`overflow-hidden ${className || ''}`} style={{ height: 0 }}>
      {children}
    </div>
  );
};
