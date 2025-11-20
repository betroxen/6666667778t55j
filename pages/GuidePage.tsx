
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../components/icons';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';
import { RevealContainer, RevealItem, NeonSpring } from '../components/Motion';
import { TacticalIcon, NeonGlow, FrostedGlass, AnimatedGradient } from '../components/Effects';
import { gsap } from 'gsap';

// --- TYPES & DATA ---

type GuideCategory = 'TACTICAL' | 'INTEL' | 'RISK' | 'LEGAL';

interface GuideData {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: GuideCategory;
    icon: React.ElementType;
}

const GUIDES: GuideData[] = [
    {
        id: "G1",
        title: "Protocol Initialization",
        category: "TACTICAL",
        icon: Icons.Terminal,
        summary: "Your first steps in the war against rigged odds. Account hardening and identity masking.",
        content: `## 1. Secure Your Perimeter
Start by forging your account on our hardened platform. Complete KYC verification swiftly to unlock full operational access while maintaining compliance.

## 2. Fortify Access
Activate Multi-Factor Authentication (MFA) immediately. Security is survival. We recommend hardware keys or TOTP apps over SMS.

## 3. Dashboard Mastery
Your command center monitors live ZAP Scores, edge hunting scans, and dispute submissions. Link your blockchain wallet for immutable tracking of your deposits.

**ACTION:** Navigate to Settings > Security Matrix to enable MFA now.`
    },
    {
        id: "G2",
        title: "Mastering the ZAP Score",
        category: "INTEL",
        icon: Icons.Activity,
        summary: "Decipher the 0.0 - 10.0 metric. The only number that matters when assessing operator integrity.",
        content: `## The Metric of Truth
The ZAP Score quantifies casino integrity through data audits, community intel, and regulatory compliance.

*   **9.0 - 10.0 (ELITE):** Trustworthy, low-risk arenas. Extraction probable.
*   **7.0 - 8.9 (STANDARD):** Functional. Minor friction possible.
*   **< 5.0 (TOXIC):** Active crime scenes. Liquidity traps.

## Veto Power
Learn to decipher community veto signals. User-verified proof triggers score freezes. Use ZAP Scores to deploy your bankroll only where victory is mathematically assured.`
    },
    {
        id: "G3",
        title: "Edge Finder: +EV Scanner",
        category: "TACTICAL",
        icon: Icons.Target,
        summary: "Locate positive expected value opportunities hidden in plain sight. Hunt the house edge.",
        content: `## Positive Expected Value (+EV)
+EV means the payout outweighs the odds—a statistical money printer. Our scanner highlights these anomalies in real-time.

## Analysis Vectors
Dial into the interface to survey top edges across 400+ platforms. Compare volatility indexes, Real RTP (vs Theoretical), and Bonus Toxicity side-by-side.

**STRATEGY:** Adapt bet sizes to volatility. High vol requires deeper bankrolls to survive the variance swings.`
    },
    {
        id: "G4",
        title: "XAI: Responsible Enforcement",
        category: "INTEL",
        icon: Icons.Cpu,
        summary: "How our Explainable AI monitors patterns to prevent tilt and protect your bankroll.",
        content: `## Automated Overwatch
Zapway’s Explainable AI (XAI) monitors risk scores based on wager frequency, session length, and loss velocity.

## Mandatory Mitigation
When XAI detects critical risk, it enforces:
1.  Betting Caps
2.  Loss Limits
3.  Cooling-off Cooldowns

All decisions are transparent and auditable. Your edge is the house, not addiction. Stay sharp.`
    },
    {
        id: "G5",
        title: "Smart Contract Hazards",
        category: "RISK",
        icon: Icons.AlertTriangle,
        summary: "Understanding the immutable risks of decentralized finance and non-custodial play.",
        content: `## Code is Law (and Risk)
We operate via autonomous smart contracts. This decentralization eradicates middlemen but carries immutable risks.

**WARNING:** Smart contract faults or bugs cannot be reversed due to blockchain finality.
**DEFENSE:** Guard your private keys zealously. Never interact with unverified contracts.

Playing with knowledge of these perils is part of the degen code. Blind trust is the enemy.`
    },
    {
        id: "G6",
        title: "Data Sovereignty & GDPR",
        category: "LEGAL",
        icon: Icons.Lock,
        summary: "Your data is a weapon. We protect it with institutional-grade encryption and compliance.",
        content: `## Non-Negotiable Privacy
We fully comply with GDPR and global mandates. We collect only essential behavioral and technical data to serve and protect you.

## Your Rights
Access, correction, deletion (when lawful), and portability. Even XAI decisions are transparently governed.

For privacy concerns, contact our Data Protection Officer. Your data sovereignty is a frontline defense.`
    },
    {
        id: "G7",
        title: "Dispute Resolution Protocol",
        category: "LEGAL",
        icon: Icons.FileText,
        summary: "When the enemy cheats, bring receipts. How to submit immutable evidence for swift justice.",
        content: `## Evidence is King
Submit immutable evidence—timestamps, blockchain TX IDs, game logs—via our dispute portal. Vague complaints are ignored.

## Escalation Ladder
1.  **Verification:** We validate the TX ID on-chain.
2.  **Freeze:** Verified disputes trigger score freezes.
3.  **Execution:** Confirmed fraud leads to blacklisting and revenue cuts.

Your validated intel fuels the war machine. Justice is a weapon.`
    }
];

// --- HELPER COMPONENTS ---

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className={`
                relative overflow-hidden px-4 py-2 text-[10px] font-bold font-orbitron uppercase tracking-widest rounded-sm border transition-all duration-300
                ${copied ? 'bg-neon-surge text-black border-neon-surge' : 'bg-transparent text-neon-surge border-neon-surge hover:bg-neon-surge/10'}
            `}
        >
            <span className="relative z-10 flex items-center gap-2">
                {copied ? <Icons.Check className="w-3 h-3" /> : <Icons.Copy className="w-3 h-3" />}
                {copied ? 'INTEL SECURED' : 'COPY DATA'}
            </span>
        </button>
    );
};

const GuidePage: React.FC = () => {
    const headerRef = useRef(null);

    // GSAP Entrance
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-text", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".guide-item", {
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.8,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: ".guide-list",
                    start: "top 80%"
                }
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    const getCategoryColor = (cat: GuideCategory) => {
        switch(cat) {
            case 'TACTICAL': return 'text-neon-surge border-neon-surge/30 bg-neon-surge/5';
            case 'INTEL': return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
            case 'RISK': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5';
            case 'LEGAL': return 'text-purple-500 border-purple-500/30 bg-purple-500/5';
            default: return 'text-white border-white/20 bg-white/5';
        }
    };

    const getBorderHover = (cat: GuideCategory) => {
        switch(cat) {
            case 'TACTICAL': return 'group-hover:border-neon-surge group-hover:shadow-[0_0_30px_rgba(0,255,192,0.1)]';
            case 'INTEL': return 'group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]';
            case 'RISK': return 'group-hover:border-yellow-500 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]';
            case 'LEGAL': return 'group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]';
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani animate-fadeIn relative overflow-hidden" ref={headerRef}>
            
            {/* Tactical Ambience Layer */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
                {/* Drifting Scanline */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-surge/20 to-transparent animate-scanline opacity-30"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 pt-16 pb-24 relative z-10">
                
                {/* Header Strike */}
                <header className="text-center mb-20">
                    <div className="hero-text inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-8 backdrop-blur-sm">
                        <Icons.BookOpen className="h-4 w-4 text-neon-surge" />
                        <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.3em] font-bold">Field Manuals v2.4</span>
                    </div>
                    
                    <h1 className="hero-text font-orbitron text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.85] drop-shadow-2xl">
                        TACTICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-emerald-600 text-glow">OPERATIONS</span>
                    </h1>
                    
                    <p className="hero-text text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed border-l-4 border-neon-surge pl-6 text-left md:text-center md:border-none md:pl-0">
                        Master the protocol. Verification is your weapon. These manuals provide the intelligence needed to navigate the Grid and maximize your edge.
                    </p>
                </header>

                {/* Guide Arsenal (Accordion) */}
                <div className="guide-list space-y-4">
                    <Accordion multiple={true} defaultOpen={["guide-0"]}>
                        {GUIDES.map((guide, index) => (
                            <AccordionItem key={guide.id} value={`guide-${index}`} className="border-none">
                                <div className={`guide-item group relative bg-[#0c0c0e] border border-[#222] rounded-xl overflow-hidden transition-all duration-300 ${getBorderHover(guide.category)}`}>
                                    
                                    {/* Scanline Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                                    <AccordionTrigger className="w-full hover:bg-[#111] transition-colors duration-300">
                                        <div className="flex items-start gap-6 p-6 md:p-8 w-full text-left relative z-10">
                                            {/* ID Marker */}
                                            <div className={`hidden sm:flex shrink-0 w-14 h-14 rounded-lg items-center justify-center border text-xl font-bold font-orbitron shadow-inner transition-colors ${getCategoryColor(guide.category)}`}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${getCategoryColor(guide.category)}`}>
                                                        {guide.category}
                                                    </span>
                                                    {guide.category === 'RISK' && (
                                                        <span className="text-[10px] text-yellow-500 font-bold uppercase flex items-center gap-1 animate-pulse">
                                                            <Icons.AlertTriangle className="w-3 h-3" /> CAUTION
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white uppercase mb-2 truncate group-hover:text-shadow-sm transition-all">
                                                    {guide.title}
                                                </h3>
                                                <p className="text-text-tertiary text-sm font-rajdhani font-medium truncate group-hover:text-text-secondary transition-colors">
                                                    {guide.summary}
                                                </p>
                                            </div>

                                            <div className="hidden sm:flex items-center justify-center h-full">
                                                <div className="p-2 rounded-full border border-[#333] bg-black group-hover:border-neon-surge/50 transition-colors">
                                                    <Icons.ChevronDown className={`h-5 w-5 text-text-tertiary transition-transform duration-300 group-aria-[expanded=true]:rotate-180 group-hover:text-neon-surge`} />
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        <div className="px-6 pb-8 sm:pl-28 sm:pr-8 relative z-10">
                                            <div className="p-6 md:p-8 bg-[#080808] border border-[#222] rounded-lg shadow-inner relative overflow-hidden">
                                                {/* Content Decor */}
                                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>

                                                <div className="flex items-center justify-between mb-6 border-b border-[#222] pb-4">
                                                    <h4 className="font-jetbrains-mono text-xs text-neon-surge uppercase tracking-[0.2em] flex items-center gap-2">
                                                        <guide.icon className="h-4 w-4" /> 
                                                        INTEL_ID: {guide.id}
                                                    </h4>
                                                    <CopyButton text={guide.content} />
                                                </div>
                                                
                                                <div className="prose prose-invert max-w-none font-rajdhani text-text-secondary text-base leading-relaxed whitespace-pre-wrap">
                                                    {guide.content}
                                                </div>

                                                {/* Warning Footer for Risk items */}
                                                {guide.category === 'RISK' && (
                                                    <div className="mt-8 p-4 bg-red-950/20 border-l-4 border-red-500 rounded-r flex gap-4 items-start">
                                                        <Icons.AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
                                                        <div>
                                                            <h5 className="text-red-400 font-bold text-sm uppercase font-orbitron mb-1">Critical Warning</h5>
                                                            <p className="text-red-200/70 text-xs">Failure to adhere to these protocols may result in total loss of funds. Proceed with extreme caution.</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Footer Killshot */}
                <div className="mt-32 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-surge/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
                    
                    <RevealContainer>
                        <RevealItem>
                            <div className="inline-block p-8 border border-neon-surge/30 bg-[#0c0c0e]/80 backdrop-blur-xl rounded-2xl relative overflow-hidden group">
                                {/* Animated Border */}
                                <div className="absolute inset-0 border-2 border-neon-surge/0 group-hover:border-neon-surge/50 rounded-2xl transition-colors duration-500"></div>
                                
                                <TacticalIcon pulse className="mb-6 mx-auto">
                                    <Icons.Zap className="h-12 w-12 text-neon-surge" />
                                </TacticalIcon>
                                
                                <h3 className="text-3xl md:text-5xl font-black font-orbitron text-white mb-4 uppercase tracking-tight">
                                    DEPLOY TO THE <span className="text-neon-surge text-glow">GRID</span>
                                </h3>
                                <p className="text-text-secondary text-sm font-jetbrains-mono mb-8 tracking-widest uppercase opacity-70">
                                    Join 15,000+ Operatives in the Alpha Channel
                                </p>
                                
                                <NeonSpring className="px-10 py-4 bg-neon-surge text-black font-black font-orbitron uppercase tracking-widest rounded-sm shadow-[0_0_30px_rgba(0,255,192,0.4)] hover:scale-105 flex items-center gap-3 mx-auto">
                                    <span>Access Discord</span> <Icons.ArrowRight className="w-5 h-5" />
                                </NeonSpring>
                            </div>
                        </RevealItem>
                    </RevealContainer>
                </div>

            </div>
        </div>
    );
};

export default GuidePage;
