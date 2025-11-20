
import React, { useContext, useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from './Button';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';
import { ZapLogo } from './ZapLogo';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenReview?: () => void;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn, onLogout, onOpenReview, onToggleMobileNav }) => {
  const appContext = useContext(AppContext);
  const headerRef = useRef<HTMLElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const sidebarWidth = appContext?.isCollapsed ? '72px' : '256px';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Pulse Bar
      gsap.to(pulseRef.current, {
        backgroundPosition: "200% 0",
        duration: 4,
        repeat: -1,
        ease: "linear"
      });

      // 2. ZP Ticker Animation (if logged in)
      if (isLoggedIn && tickerRef.current) {
        gsap.fromTo(tickerRef.current, 
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
        );
      }
    }, headerRef);
    return () => ctx.revert();
  }, [isLoggedIn]);

  const handleLogoClick = () => {
    if (isLoggedIn && appContext) {
        appContext.setCurrentPage('Dashboard');
    } else if (appContext) {
        appContext.setCurrentPage('Home');
    }
  };

  return (
    <header 
        ref={headerRef}
        className={`fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-[#050505]/90 backdrop-blur-md border-b border-[#222] px-4 py-3 md:px-6 transition-all duration-500 ease-out shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${isLoggedIn ? 'md:left-[var(--sidebar-width)] md:w-[calc(100%_-_var(--sidebar-width))]' : 'left-0'}`}
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
    >
      {/* Kinetic Cyan Pulse Bar */}
      <div 
        ref={pulseRef}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFC0] to-transparent opacity-80 bg-[length:200%_100%]"
      ></div>

      {/* Left: Brand & Trigger */}
      <div className="flex items-center gap-4">
         {isLoggedIn && (
             <button 
                className="text-[#8d8c9e] hover:text-[#00FFC0] transition-colors md:hidden focus:outline-none active:scale-90 transform duration-150" 
                onClick={onToggleMobileNav} 
                aria-label="Open Menu"
             >
                 <Icons.Menu className="h-6 w-6" />
             </button>
         )}

         <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={handleLogoClick}
            role="button" 
            tabIndex={0} 
        >
             <ZapLogo className="p-1.5 rounded-lg" iconClassName="h-5 w-5" />
             <span className={`font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-[#00FFC0] transition-colors ${isLoggedIn ? 'hidden sm:block' : 'block'}`}>ZAP</span>
         </div>
      </div>

      {/* Right: Ops Center */}
      <div className="flex items-center gap-3">
        {isLoggedIn && (
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-orbitron uppercase border border-[#00FFC0]/20 hover:border-[#00FFC0]" onClick={onOpenReview}>
                <Icons.Edit className="h-4 w-4" /> Write Review
            </Button>
        )}

        {!isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onOpenLogin} className="hidden sm:flex font-orbitron uppercase hover:text-white">
              LOG IN
            </Button>
            <Button size="sm" onClick={onOpenRegister} className="bg-[#00FFC0] text-black font-bold hover:bg-white font-orbitron uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.3)]">
              JOIN CIRCUIT
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            
            {/* Quick Actions */}
            <button 
                className="text-[#8d8c9e] hover:text-white transition-colors relative hover:scale-110 duration-200 focus:outline-none group" 
                onClick={() => appContext?.setCurrentPage('Messages')}
                title="Encrypted Comms"
            >
               <Icons.Mail className="h-5 w-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
               <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#00FFC0] rounded-full border border-[#0c0c0e]"></span>
            </button>

            {/* Live ZP Ticker */}
            <div ref={tickerRef} className="hidden md:flex items-center gap-2 bg-[#111] rounded-full px-4 py-1.5 border border-[#333] hover:border-[#00FFC0]/50 transition-colors cursor-default group">
                <Icons.Zap className="h-3 w-3 text-[#00FFC0] group-hover:animate-pulse" />
                <span className="text-xs font-bold text-white font-jetbrains-mono tracking-wide">1,240 ZP</span>
            </div>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="relative flex items-center justify-center w-9 h-9 rounded-md hover:opacity-80 transition-opacity active:scale-95 focus:outline-none border border-[#333]"
              >
                <img
                  src="https://placehold.co/32x32/00FFC0/000000?text=DG"
                  alt="Profile"
                  className="h-full w-full rounded-md object-cover"
                />
                {/* Orbit Ring */}
                {isProfileDropdownOpen && (
                    <div className="absolute inset-[-4px] rounded-lg border border-[#00FFC0] animate-ping opacity-20"></div>
                )}
              </button>

              {isProfileDropdownOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-64 rounded-xl bg-[#0c0c0e] border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-2 z-40 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-5 py-3 border-b border-[#222] bg-[#111]/50">
                            <p className="text-sm font-black text-white font-orbitron uppercase tracking-wide">DegenGambler</p>
                            <p className="text-[10px] text-[#00FFC0] font-jetbrains-mono flex items-center gap-1 mt-1">
                                <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                            </p>
                        </div>
                        <div className="p-2 space-y-1">
                            <button onClick={() => { appContext?.setCurrentPage('Profile'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2.5 text-xs text-[#aaa] hover:bg-[#1a1a1a] hover:text-white transition-colors font-orbitron uppercase rounded-lg group">
                                <Icons.User className="h-4 w-4 group-hover:text-[#00FFC0]" /> Profile Blueprint
                            </button>
                            <button onClick={() => { appContext?.setCurrentPage('Settings'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2.5 text-xs text-[#aaa] hover:bg-[#1a1a1a] hover:text-white transition-colors font-orbitron uppercase rounded-lg group">
                                <Icons.Settings className="h-4 w-4 group-hover:text-[#00FFC0]" /> Command Console
                            </button>
                            <button onClick={() => { onOpenReview && onOpenReview(); setIsProfileDropdownOpen(false); }} className="flex w-full md:hidden items-center gap-3 px-3 py-2.5 text-xs text-[#aaa] hover:bg-[#1a1a1a] hover:text-white transition-colors font-orbitron uppercase rounded-lg group">
                                <Icons.Edit className="h-4 w-4 group-hover:text-[#00FFC0]" /> Write Review
                            </button>
                        </div>
                        <div className="border-t border-[#222] p-2">
                             <button onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors font-orbitron uppercase rounded-lg group">
                                <Icons.LogOut className="h-4 w-4 group-hover:rotate-90 transition-transform" /> Terminate Session
                            </button>
                        </div>
                    </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
