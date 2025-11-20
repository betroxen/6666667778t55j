
import React, { useContext, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';
import { sidebarNavItems, SidebarItem, SidebarGroup } from '../constants/sidebar';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { ZapLogo } from './ZapLogo';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const appContext = useContext(AppContext);
    const [openGroups, setOpenGroups] = useState<string[]>(['play', 'analyze', 'earn', 'trust', 'command', 'support']);
    
    const sidebarRef = useRef<HTMLElement>(null);
    const mobileDrawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // --- GSAP ANIMATIONS ---

    // 1. Desktop Collapse/Expand
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (window.innerWidth >= 768) {
                gsap.to(sidebarRef.current, {
                    width: isCollapsed ? 72 : 256,
                    duration: 0.5,
                    ease: "power4.out" // Elite spring feel
                });
            }
        }, sidebarRef);
        return () => ctx.revert();
    }, [isCollapsed]);

    // 2. Mobile Drawer Slide
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (isMobileOpen) {
                gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
                gsap.to(mobileDrawerRef.current, { x: 0, duration: 0.4, ease: "power4.out" });
            } else {
                gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
                gsap.to(mobileDrawerRef.current, { x: "-100%", duration: 0.3, ease: "power2.in" });
            }
        });
        return () => ctx.revert();
    }, [isMobileOpen]);

    // --- HANDLERS ---

    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        if (appContext?.setCurrentPage) {
            appContext.setCurrentPage(page);
        }
        setIsMobileOpen(false);
    };

    const toggleGroup = (id: string) => {
        setOpenGroups(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
    };

    // --- RENDER HELPERS ---

    const renderLink = (item: SidebarItem, isMobile = false) => {
        const isActive = appContext?.currentPage === item.title;
        return (
            <a
                key={item.title}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.title)}
                className={`group relative flex items-center gap-3 transition-all duration-200 overflow-hidden rounded-md mb-1
                ${isCollapsed && !isMobile
                    ? 'justify-center w-10 h-10 p-0 mx-auto' 
                    : 'px-3 py-2 w-full'
                }
                ${isActive 
                    ? 'text-white bg-[#00FFC0]/5' 
                    : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
                }`}
                title={isCollapsed && !isMobile ? item.title : undefined}
            >
                {/* Active Cyan Blade */}
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00FFC0] shadow-[0_0_10px_#00FFC0]"></div>
                )}

                <item.icon 
                    className={`flex-shrink-0 transition-transform duration-300 ${isMobile ? 'h-5 w-5' : 'h-4 w-4'} 
                    ${isActive ? 'text-[#00FFC0] scale-110' : 'group-hover:text-white group-hover:scale-110'}`} 
                />

                {(!isCollapsed || isMobile) && (
                    <div className="flex-1 flex justify-between items-center overflow-hidden">
                        <span className={`text-xs font-medium tracking-wide truncate ${isActive ? 'text-white' : ''}`}>
                            {item.title}
                        </span>
                        {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#00FFC0] text-black`}>
                                {item.badge}
                            </span>
                        )}
                    </div>
                )}
            </a>
        );
    };

    const AccordionGroup: React.FC<{ group: SidebarGroup }> = ({ group }) => {
        const isOpen = openGroups.includes(group.id);
        const containerRef = useRef<HTMLDivElement>(null);

        useLayoutEffect(() => {
            if (isCollapsed) return; // No accordion anim in collapsed mode
            gsap.to(containerRef.current, {
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }, [isOpen, isCollapsed]);

        // Collapsed Mode: Just show icons in a stack
        if (isCollapsed) {
             return (
                <div className="mb-4 pb-4 border-b border-[#222] last:border-0">
                     {group.items.map((item: any) => renderLink(item))}
                </div>
            );
        }

        return (
            <div className="mb-2">
                <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex items-center justify-between w-full text-[#666] hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5 group"
                >
                    <span className="font-jetbrains-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-[#00FFC0] transition-colors">
                        {group.label}
                    </span>
                    <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00FFC0]' : ''}`} />
                </button>

                <div ref={containerRef} className="overflow-hidden h-0 opacity-0">
                    <div className="pt-1 pb-2 pl-2">
                        {group.items.map((item: any) => renderLink(item))}
                    </div>
                </div>
            </div>
        );
    };

    return (
    <>
      {/* === MOBILE DRAWER === */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xl opacity-0 pointer-events-none md:hidden" 
        onClick={() => setIsMobileOpen(false)} 
      />

      <div 
        ref={mobileDrawerRef}
        className="fixed left-0 top-16 bottom-0 z-[90] w-[85vw] max-w-[320px] bg-[#050505] border-r border-[#222] md:hidden transform -translate-x-full"
      >
         <div className="h-full flex flex-col">
             {/* Pilot Summary */}
             {appContext?.isLoggedIn && (
                 <div className="p-6 border-b border-[#222] bg-[#0a0a0a]">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <img src="https://placehold.co/56x56/00FFC0/000000?text=DG" className="h-12 w-12 rounded-lg border border-[#333]" alt="User" />
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#00FFC0] rounded-full border border-black animate-pulse"></div>
                        </div>
                        <div>
                            <div className="font-orbitron text-white uppercase text-sm font-bold">DegenGambler</div>
                            <div className="text-[10px] font-mono text-[#00FFC0] mt-1">LVL 42 // VANGUARD</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-[#666]">
                            <span>XP: 4,250</span>
                            <span>TARGET: 5,000</span>
                        </div>
                        <ProgressBar progress={85} className="h-1 bg-[#222]" />
                    </div>
                 </div>
             )}

             {/* Navigation */}
             <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
                {sidebarNavItems.map((group) => (
                    <div key={group.id} className="mb-4">
                        <div className="px-3 mb-2 text-[10px] font-jetbrains-mono text-[#444] uppercase tracking-widest">{group.label}</div>
                        {group.items.map(item => renderLink(item, true))}
                    </div>
                ))}
             </div>

             {/* CTA */}
             <div className="p-4 border-t border-[#222] bg-[#080808]">
                <Button onClick={() => { appContext?.openReviewModal(); setIsMobileOpen(false); }} className="w-full bg-[#00FFC0] text-black font-bold font-orbitron uppercase text-xs shadow-[0_0_20px_rgba(0,255,192,0.3)]">
                    <Icons.Edit className="h-4 w-4 mr-2" /> Submit VPR Report
                </Button>
             </div>
         </div>
      </div>

      {/* === DESKTOP SIDEBAR === */}
      <aside 
        ref={sidebarRef}
        className="hidden md:flex fixed left-0 top-0 bottom-0 flex-col border-r border-[#222] bg-[#050505] z-40 w-64 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 shrink-0 border-b border-[#222] bg-[#080808]">
          <button onClick={() => appContext?.setCurrentPage('Dashboard')} className="flex items-center gap-3 group">
            <ZapLogo iconClassName="h-6 w-6" className="p-1.5 rounded-lg"/>
            <div 
                className="overflow-hidden whitespace-nowrap transition-all duration-300" 
                style={{ width: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
            >
                <span className="font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-[#00FFC0] transition-colors">ZAP</span>
            </div>
          </button>
        </div>

        {/* Nav Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-1">
            {sidebarNavItems.map((group) => (
                <AccordionGroup key={group.id} group={group} />
            ))}
        </div>

        {/* Collapse Toggle */}
        <div className="shrink-0 border-t border-[#222] bg-[#080808] p-4 flex justify-center">
             <button
                className="text-[#666] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#222]"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? <Icons.ChevronRight className="h-5 w-5" /> : <Icons.ChevronLeft className="h-5 w-5" />}
            </button>
        </div>
      </aside>
    </>
  );
};
