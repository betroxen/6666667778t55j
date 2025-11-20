
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { CyberScene } from '../components/CyberScene';
import { RevealContainer, RevealItem, CyberCard } from '../components/Motion';
import { TacticalIcon, NeonGlow } from '../components/Effects';

const TechCard = ({ 
    icon: Icon, 
    title, 
    desc, 
    color = "text-neon-surge", 
    borderColor = "group-hover:border-neon-surge/50"
}: { 
    icon: React.FC<any>, 
    title: string, 
    desc: string, 
    color?: string, 
    borderColor?: string 
}) => (
    <CyberCard className="h-full bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col group transition-colors">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
            <Icon className={`w-24 h-24 ${color}`} />
        </div>
        
        <div className="relative z-10">
            <div className={`mb-6 p-3 rounded-xl bg-[#121212] border border-[#2A2A2A] w-fit ${borderColor} transition-colors group-hover:bg-white/5`}>
                <TacticalIcon pulse spinOnHover>
                    <Icon className={`h-8 w-8 ${color}`} />
                </TacticalIcon>
            </div>
            
            <h3 className="font-orbitron text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-shadow-neon transition-all">
                {title}
            </h3>
            
            <p className="font-jetbrains-mono text-xs text-text-secondary leading-relaxed border-l-2 border-[#333] pl-4 group-hover:border-neon-surge/30 transition-colors">
                {desc}
            </p>
        </div>
        
        <div className="mt-auto pt-8 flex justify-between items-end opacity-30 font-mono text-[9px] uppercase">
            <span>SYS_STATUS: ONLINE</span>
            <span className={color}>SECURE</span>
        </div>
    </CyberCard>
);

const ComplianceBadge = ({ icon: Icon, label, sub }: { icon: any, label: string, sub: string }) => (
    <div className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 cursor-default">
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-neon-surge" />
        </div>
        <div>
            <div className="font-orbitron font-bold text-white text-sm uppercase tracking-wider group-hover:text-neon-surge transition-colors">{label}</div>
            <div className="font-jetbrains-mono text-[10px] text-text-tertiary uppercase">{sub}</div>
        </div>
    </div>
);

const AboutUsPage: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani relative overflow-hidden selection:bg-[#00FFC0] selection:text-black">
             {/* 1. REACTIVE BACKGROUND CANVAS */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <CyberScene />
            </div>

            <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* 2. HERO SECTION: KINETIC STRIKE */}
                <RevealContainer className="text-center mb-32">
                    <RevealItem className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-black/60 border border-neon-surge/30 rounded-full backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,192,0.15)]">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                            </span>
                            <span className="text-xs font-jetbrains-mono text-neon-surge uppercase tracking-[0.2em] font-bold">
                                Protocol V4.0 Active
                            </span>
                        </div>
                    </RevealItem>
                    
                    <RevealItem>
                        <h1 className="font-orbitron text-6xl md:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter mix-blend-difference">
                            INTEGRITY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 relative z-10">LOCKED.</span>
                        </h1>
                    </RevealItem>

                    <RevealItem>
                        <p className="text-lg md:text-2xl text-text-secondary font-medium max-w-3xl mx-auto leading-relaxed border-l-2 border-neon-surge pl-6 text-left md:text-center md:border-none md:pl-0">
                            Trust is obsolete. We demand cryptographic proof. <br/>
                            <span className="text-white font-bold">ZapWay</span> is the verifiable defensive architecture for the next era of iGaming.
                        </p>
                    </RevealItem>
                </RevealContainer>

                {/* 3. STACK SECTION: INTERACTIVE CARDS */}
                <div className="mb-32">
                     <RevealContainer className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                        <div>
                            <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">Core Architecture</h2>
                            <p className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-[0.2em]">
                                // Infrastructure Class: Military Grade
                            </p>
                        </div>
                     </RevealContainer>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <RevealItem>
                            <TechCard 
                                icon={Icons.Zap}
                                title="ZK-Rollup Finality"
                                desc="Every wager anchored to Layer 2. Mathematical immutability means the house cannot cheat physics. Verify instantly."
                                color="text-cyan-400"
                                borderColor="group-hover:border-cyan-400/50"
                            />
                        </RevealItem>
                        <RevealItem>
                            <TechCard 
                                icon={Icons.RefreshCw}
                                title="Decentralized VRF"
                                desc="Entropy sourced from Chainlink VRF nodes. True randomness, verifiable on-chain. No black-box server seeds."
                                color="text-purple-400"
                                borderColor="group-hover:border-purple-400/50"
                            />
                        </RevealItem>
                        <RevealItem>
                            <TechCard 
                                icon={Icons.Shield}
                                title="MPC Custody"
                                desc="Treasury protected by Multi-Party Computation. No single point of failure. Institutional-grade asset security."
                                color="text-yellow-400"
                                borderColor="group-hover:border-yellow-400/50"
                            />
                        </RevealItem>
                     </div>
                </div>

                {/* 4. PROTECTION SECTION: INSTITUTIONAL TRUST ARSENAL */}
                <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <RevealContainer>
                        <RevealItem>
                            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-none">
                                COMPLIANCE <br/><span className="text-neon-surge">PROTOCOL</span>
                            </h2>
                            <p className="text-text-secondary text-lg font-medium leading-relaxed mb-8 font-rajdhani">
                                We don't just follow the rules; we code them into the smart contract. Compliance is not a department; it's an immutable function.
                            </p>
                            
                            <div className="grid grid-cols-1 gap-4">
                                <ComplianceBadge 
                                    icon={Icons.Cpu} 
                                    label="Explainable AI (XAI)" 
                                    sub="Automated Risk Intervention & Auditable Logic" 
                                />
                                <ComplianceBadge 
                                    icon={Icons.FileCheck} 
                                    label="VASP-Grade AML" 
                                    sub="Zero Tolerance for Illicit Capital Flows" 
                                />
                                <ComplianceBadge 
                                    icon={Icons.Verified} 
                                    label="Verifiable Player Records" 
                                    sub="Immutable Game History Ledger (VPR)" 
                                />
                            </div>
                        </RevealItem>
                    </RevealContainer>
                    
                    <RevealContainer delay={0.2}>
                        <RevealItem>
                             <div className="relative aspect-square rounded-full bg-gradient-to-br from-[#111] to-black border border-white/5 flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,192,0.1),transparent_70%)] animate-pulse-glow"></div>
                                 <div className="relative z-10 text-center">
                                     <TacticalIcon pulse spinOnHover className="mb-6 inline-block">
                                         <Icons.Shield className="w-32 h-32 text-white" />
                                     </TacticalIcon>
                                     <div className="font-orbitron font-black text-2xl uppercase tracking-widest text-neon-surge">Fortress Mode</div>
                                     <div className="font-mono text-xs text-text-tertiary mt-2">PENETRATION TESTED // SECURE</div>
                                 </div>
                                 
                                 {/* Orbital Rings */}
                                 <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.8] animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                                 <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.6] animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                             </div>
                        </RevealItem>
                    </RevealContainer>
                </div>

                {/* 5. MISSION & DOSSIER: EXPANDABLE */}
                <RevealContainer className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                         <div className="inline-block p-8 bg-[#0A0A0A] border border-[#222] relative overflow-hidden group hover:border-neon-surge/30 transition-colors duration-500">
                             <div className="absolute top-0 left-0 w-full h-1 bg-neon-surge"></div>
                             <h2 className="font-orbitron text-3xl font-black text-white uppercase mb-4">The Directive</h2>
                             <p className="text-xl text-text-secondary font-medium leading-relaxed">
                                 Partner with licensed operators to embed <span className="text-white font-bold">Verifiable Fairness</span> directly into the infrastructure.
                                 <br /><br />
                                 <span className="font-jetbrains-mono text-sm text-neon-surge uppercase tracking-widest">
                                     // We’re not rebuilding iGaming — we’re rewriting its source code.
                                 </span>
                             </p>
                         </div>
                    </div>

                    <RevealItem className="flex justify-center">
                         <Button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            variant="ghost"
                            className="group relative overflow-hidden border border-neon-surge text-neon-surge hover:bg-neon-surge hover:text-black font-orbitron uppercase tracking-[0.2em] py-6 px-12 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-3 font-bold">
                                {isExpanded ? <Icons.X className="h-5 w-5" /> : <Icons.FileText className="h-5 w-5" />}
                                {isExpanded ? "CLOSE DOSSIER" : "ACCESS OPERATIONAL DOSSIER"}
                            </span>
                            {/* Glitch Effect Overlay */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                        </Button>
                    </RevealItem>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                            >
                                <div className="pt-16 pb-8 border-t border-neon-surge/30 mt-12">
                                    <div className="grid grid-cols-1 gap-16 font-rajdhani text-text-secondary relative">
                                        {/* Background Badge */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-neon-surge">
                                            <Icons.Lock className="h-8 w-8" />
                                        </div>

                                        <article>
                                            <h3 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                                <Icons.Terminal className="h-6 w-6 text-neon-surge" />
                                                CORE MANDATE
                                            </h3>
                                            <div className="bg-[#0c0c0e] p-6 border-l-2 border-neon-surge">
                                                <p className="text-lg leading-relaxed">
                                                    <strong className="text-white">Integrity is the Code.</strong><br/>
                                                    Legacy gambling relies on blind trust. ZapWay replaces it with verifiable math. We are the core infrastructure for the next era of on-chain finance.
                                                </p>
                                            </div>
                                        </article>

                                        <article>
                                            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">TECHNICAL DEEP DIVE</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-[#0c0c0e] p-6 border border-[#222] hover:border-cyan-400/30 transition-colors">
                                                    <h4 className="font-bold text-cyan-400 mb-2 uppercase font-orbitron text-sm">ZK-Rollup Finality</h4>
                                                    <p className="text-sm leading-relaxed">
                                                        Outcomes are cryptographically proven and immutably recorded on-chain. Retroactive alteration is mathematically impossible.
                                                    </p>
                                                </div>
                                                <div className="bg-[#0c0c0e] p-6 border border-[#222] hover:border-purple-400/30 transition-colors">
                                                     <h4 className="font-bold text-purple-400 mb-2 uppercase font-orbitron text-sm">Decentralized VRF</h4>
                                                    <p className="text-sm leading-relaxed">
                                                        Verifiable Random Function oracles provide the entropy. Proof of fairness is generated for every single round.
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                        
                                        <div className="text-center pt-8">
                                             <p className="font-jetbrains-mono text-xs text-[#666] uppercase tracking-widest mb-4">
                                                // END OF DOSSIER
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </RevealContainer>

            </div>
        </div>
    );
};

export default AboutUsPage;
