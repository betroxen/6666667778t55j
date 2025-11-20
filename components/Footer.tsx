
import React, { useContext, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
    const appContext = useContext(AppContext);
    const footerRef = useRef<HTMLElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
             // Infinite Ticker
            gsap.to(tickerRef.current, {
                xPercent: -50,
                duration: 20,
                repeat: -1,
                ease: "linear"
            });

            // Hover Effects for Links
            const links = footerRef.current?.querySelectorAll('li button');
            links?.forEach(link => {
                link.addEventListener('mouseenter', () => gsap.to(link, { x: 4, color: "#00FFC0", duration: 0.3 }));
                link.addEventListener('mouseleave', () => gsap.to(link, { x: 0, color: "#9ca3af", duration: 0.3 }));
            });

            // Social Icons Hover
            const icons = footerRef.current?.querySelectorAll('.social-icon');
            icons?.forEach(icon => {
                icon.addEventListener('mouseenter', () => gsap.to(icon, { y: -4, color: "#00FFC0", duration: 0.3, ease: "back.out(1.7)" }));
                icon.addEventListener('mouseleave', () => gsap.to(icon, { y: 0, color: "#4b5563", duration: 0.3 }));
            });

        }, footerRef);
        return () => ctx.revert();
    }, []);

    const handleLinkClick = (page: string) => {
        appContext?.setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const FooterLink: React.FC<{ page: string; children: React.ReactNode }> = ({ page, children }) => (
        <li>
            <button onClick={() => handleLinkClick(page)} className="text-left text-sm text-gray-400 transition-colors font-rajdhani">
                {children}
            </button>
        </li>
    );

    return (
        <footer ref={footerRef} className="bg-[#050505] border-t border-[#222] pt-16 pb-8 font-rajdhani relative overflow-hidden">
            {/* Background Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[0] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Top Section: Logo & Mission */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
                    <div className="max-w-xs">
                        <h1 className="text-4xl font-black font-orbitron text-white tracking-tighter mb-4">
                            ZAP<span className="text-[#00FFC0]">WAY</span>
                        </h1>
                        <p className="text-sm text-gray-500 leading-relaxed font-jetbrains-mono">
                            The decentralized brain for crypto gaming. We replace trust with cryptographic proof. 
                            <br/><span className="text-[#00FFC0]">// VERIFY EVERYTHING.</span>
                        </p>
                    </div>
                    <div className="flex gap-4">
                         {[Icons.TwitterX, Icons.Discord, Icons.Telegram, Icons.MessageSquare].map((Icon, i) => (
                             <a key={i} href="#" className="social-icon p-3 bg-[#111] rounded-lg border border-[#333] text-gray-600 transition-colors">
                                 <Icon className="h-5 w-5" />
                             </a>
                         ))}
                    </div>
                </div>

                {/* 5-Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-[#222] py-12">
                    <div>
                        <h3 className="text-xs font-bold text-[#00FFC0] uppercase tracking-widest mb-6 font-orbitron">Intel Core</h3>
                        <ul className="space-y-3">
                            <FooterLink page="Dashboard">Command Dashboard</FooterLink>
                            <FooterLink page="Casino Directory">Operator Recon</FooterLink>
                            <FooterLink page="Live RTP Tracker">RTP Stream</FooterLink>
                            <FooterLink page="Bonus Offers">Active Bounties</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-[#00FFC0] uppercase tracking-widest mb-6 font-orbitron">Protocols</h3>
                        <ul className="space-y-3">
                            <FooterLink page="Review Methodology">Vetting Logic</FooterLink>
                            <FooterLink page="Provably Fair">Verifier Tool</FooterLink>
                            <FooterLink page="Protocol Deep Dive">System Arch</FooterLink>
                            <FooterLink page="Certified Platforms">Safe Zones</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-[#00FFC0] uppercase tracking-widest mb-6 font-orbitron">Field Manuals</h3>
                        <ul className="space-y-3">
                            <FooterLink page="Tactical Guides">Strategy Library</FooterLink>
                            <FooterLink page="About Us">Mission Brief</FooterLink>
                            <FooterLink page="Affiliate Program">Partner Access</FooterLink>
                            <FooterLink page="FAQ">Database</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-[#00FFC0] uppercase tracking-widest mb-6 font-orbitron">Legal Frame</h3>
                        <ul className="space-y-3">
                            <FooterLink page="Terms of Service">Terms of Engagement</FooterLink>
                            <FooterLink page="Privacy Policy">Data Sovereignty</FooterLink>
                            <FooterLink page="Responsible Gaming">Safety Protocols</FooterLink>
                            <FooterLink page="AML & CTF Policy">Compliance</FooterLink>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                         <h3 className="text-xs font-bold text-[#00FFC0] uppercase tracking-widest mb-6 font-orbitron">Net Status</h3>
                         <div className="bg-[#111] border border-[#333] rounded-lg p-4">
                             <div className="flex items-center justify-between mb-2">
                                 <span className="text-[10px] text-gray-500 uppercase">System</span>
                                 <span className="text-[10px] text-[#00FFC0] font-bold uppercase">Optimal</span>
                             </div>
                             <div className="flex items-center justify-between mb-2">
                                 <span className="text-[10px] text-gray-500 uppercase">Latency</span>
                                 <span className="text-[10px] text-white font-bold">12ms</span>
                             </div>
                             <div className="w-full bg-[#222] h-1 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#00FFC0] w-[98%] shadow-[0_0_10px_#00FFC0]"></div>
                             </div>
                         </div>
                         <div className="mt-4 flex items-center gap-2 text-red-500 border border-red-900/30 bg-red-900/10 px-3 py-2 rounded-lg animate-pulse">
                             <Icons.AlertTriangle className="h-4 w-4" />
                             <span className="text-[10px] font-black uppercase tracking-widest">18+ Restricted Zone</span>
                         </div>
                    </div>
                </div>

                {/* Bottom Bar & Ticker */}
                <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 overflow-hidden">
                    <p className="text-xs text-gray-600 font-mono">
                        &copy; {new Date().getFullYear()} ZAPWAY CORP. All rights reserved.
                    </p>
                    
                    {/* Infinite Ticker */}
                    <div className="w-full md:w-1/2 h-6 relative overflow-hidden mask-image-lr">
                        <div ref={tickerRef} className="absolute whitespace-nowrap text-[10px] font-mono text-gray-600 flex gap-8">
                            <span>BTC/USD: $64,230</span>
                            <span>ETH/USD: $3,450</span>
                            <span>SOL/USD: $145</span>
                            <span>ZAP NODE: ONLINE</span>
                            <span>LAST BLOCK: #892104</span>
                            <span>BTC/USD: $64,230</span>
                            <span>ETH/USD: $3,450</span>
                            <span>SOL/USD: $145</span>
                            <span>ZAP NODE: ONLINE</span>
                            <span>LAST BLOCK: #892104</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};
