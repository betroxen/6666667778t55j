
import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { CyberCard, RevealContainer, RevealItem, NeonSpring } from '../components/Motion';
import { NeonGlow, FrostedGlass, TacticalIcon, ProgressGlow, ParallaxTilt, AnimatedGradient } from '../components/Effects';
import { gsap } from 'gsap';

// --- TYPES & MOCK DATA ---
const ALL_CASINOS = [
    { id: 'duel', name: 'Duel', logo: 'https://files.catbox.moe/p4z3v7.jpg' },
    { id: 'stake', name: 'Stake', logo: 'https://files.catbox.moe/klt24q.jpg' },
    { id: 'bcgame', name: 'BC.GAME', logo: 'https://files.catbox.moe/810c57.jpg' },
];

interface LinkedAccount {
    id: string;
    casinoId: string;
    casinoName: string;
    casinoLogo: string;
    username: string;
    verified: boolean;
}

// --- KINETIC COMPONENTS ---

const NumberTicker = ({ value, className = '' }: { value: number, className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue, value]);

    return <span ref={ref} className={className} />;
};

const StatItem = ({ label, value, sub, color = "neon-surge" }: { label: string, value: React.ReactNode, sub?: string, color?: "neon-surge" | "blood" | "yellow" | "purple" }) => {
    const colorClasses = {
        "neon-surge": "text-[#00FFC0] border-[#00FFC0]/30 bg-[#00FFC0]/5",
        "blood": "text-red-500 border-red-500/30 bg-red-500/5",
        "yellow": "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
        "purple": "text-purple-500 border-purple-500/30 bg-purple-500/5",
    };

    return (
        <RevealItem>
            <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-xl border ${colorClasses[color]} backdrop-blur-sm relative overflow-hidden group`}
            >
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Icons.Activity className="w-8 h-8" />
                </div>
                <p className="text-[9px] font-jetbrains-mono text-white/60 uppercase tracking-widest mb-1">{label}</p>
                <div className="text-2xl font-black font-orbitron text-white">{value}</div>
                {sub && (
                    <p className={`text-[9px] font-bold uppercase mt-1 flex items-center gap-1 opacity-80`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`}></span>
                        {sub}
                    </p>
                )}
            </motion.div>
        </RevealItem>
    );
};

const ProfilePage: React.FC = () => {
    const toastContext = useContext(ToastContext);
    const appContext = useContext(AppContext);
    const showToast = toastContext?.showToast || (() => {});

    // State
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/00FFC0/0A0A0A?text=DG');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [userBio, setUserBio] = useState("Crypto native. Hunting max RTP. Alpha seeker.");
    
    // Linking State
    const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
         { id: '1', casinoId: 'stake', casinoName: 'Stake', casinoLogo: 'https://files.catbox.moe/klt24q.jpg', username: 'DegenG_Official', verified: true }
    ]);
    const [isLinkMode, setIsLinkMode] = useState(false);
    const [linkForm, setLinkForm] = useState({ targetCasinoId: '', username: '' });

    // Modal State
    const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
    const [accountToDisconnect, setAccountToDisconnect] = useState<string | null>(null);

    const heroRef = useRef(null);

    // --- EFFECTS ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-element", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.4)"
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // --- HANDLERS ---

    const handleLinkAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkForm.targetCasinoId) return;
        const casino = ALL_CASINOS.find(c => c.id === linkForm.targetCasinoId);
        if (!casino) return;

        const newAccount: LinkedAccount = {
            id: crypto.randomUUID(),
            casinoId: casino.id,
            casinoName: casino.name,
            casinoLogo: casino.logo,
            username: linkForm.username,
            verified: false
        };
        
        setLinkedAccounts([...linkedAccounts, newAccount]);
        setLinkForm({ targetCasinoId: '', username: '' });
        setIsLinkMode(false);
        
        showToast(`INITIATING HANDSHAKE WITH ${casino.name.toUpperCase()}...`, "info");
        setTimeout(() => {
             setLinkedAccounts(prev => prev.map(acc => acc.id === newAccount.id ? { ...acc, verified: true } : acc));
             showToast(`UPLINK SECURE: ${casino.name.toUpperCase()} VERIFIED`, "success");
        }, 1500);
    };

    const initiateDisconnect = (id: string) => {
        setAccountToDisconnect(id);
        setDisconnectModalOpen(true);
    };

    const confirmDisconnect = () => {
        if (accountToDisconnect) {
            setLinkedAccounts(prev => prev.filter(acc => acc.id !== accountToDisconnect));
            showToast("CONNECTION SEVERED. VPR DATA ARCHIVED.", "warning");
        }
        setDisconnectModalOpen(false);
        setAccountToDisconnect(null);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani relative overflow-x-hidden pb-20 selection:bg-[#00FFC0] selection:text-black" ref={heroRef}>
            <AnimatedGradient dark />
            
            <ConfirmationModal 
                isOpen={disconnectModalOpen}
                title="SEVER UPLINK?"
                body="WARNING: Terminating this connection will halt data synchronization. Historical VPRs will be archived but new activity will not track."
                onConfirm={confirmDisconnect}
                onClose={() => setDisconnectModalOpen(false)}
            />

            <div className="container mx-auto max-w-7xl px-4 pt-12">
                
                {/* 1. DYNAMIC ENTRANCE STRIKE */}
                <div className="mb-16 relative z-10 flex flex-col md:flex-row items-end gap-8">
                    
                    {/* REACTIVE AVATAR COMMAND */}
                    <div className="hero-element">
                        <ParallaxTilt className="rounded-2xl" intensity={20}>
                            <div 
                                className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl border border-white/10 bg-[#0c0c0e] overflow-hidden cursor-pointer group shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-[#00FFC0] transition-colors duration-500"
                                onClick={() => showToast("AVATAR CONFIG LOCKED", "info")}
                            >
                                <img 
                                    src={profileImage} 
                                    alt="Operative" 
                                    className="w-full h-full object-cover filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                />
                                {/* Scanline */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFC0]/30 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 ease-in-out pointer-events-none z-20"></div>
                                {/* Status Dot */}
                                <div className="absolute bottom-3 right-3 z-30">
                                        <NeonGlow color="neon-surge" intensity="md">
                                        <div className="w-3 h-3 bg-[#00FFC0] rounded-full animate-pulse border border-black"></div>
                                        </NeonGlow>
                                </div>
                            </div>
                        </ParallaxTilt>
                    </div>

                    {/* USER IDENTITY BLOCK */}
                    <div className="flex-1 w-full pb-2 hero-element">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="px-2 py-0.5 rounded bg-[#00FFC0]/10 border border-[#00FFC0]/30 text-[#00FFC0] text-[9px] font-bold uppercase tracking-widest font-mono flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#00FFC0] rounded-full animate-pulse"></span>
                                ONLINE
                            </div>
                            <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] font-bold uppercase tracking-widest font-mono">
                                TIER: VANGUARD
                            </div>
                        </div>
                        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-2xl">
                            DEGEN<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC0] to-emerald-600">GAMBLER</span>
                        </h1>
                            
                        <div className="bg-[#111]/50 border-l-2 border-[#00FFC0] pl-4 py-2 max-w-2xl backdrop-blur-sm">
                            {isEditingBio ? (
                                <div className="flex gap-2">
                                    <Input 
                                        value={userBio} 
                                        onChange={(e) => setUserBio(e.target.value)} 
                                        className="h-8 text-xs bg-black/80 border-[#333]"
                                        autoFocus
                                    />
                                    <Button size="sm" onClick={() => setIsEditingBio(false)}>SAVE</Button>
                                </div>
                            ) : (
                                <p className="text-sm text-zinc-400 font-medium font-rajdhani flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingBio(true)}>
                                    "{userBio}" <Icons.Edit className="w-3 h-3 opacity-0 group-hover:opacity-50 text-[#00FFC0]" />
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ACTION ARSENAL */}
                    <div className="flex gap-3 pb-2 self-start md:self-end hero-element">
                            <NeonSpring 
                            onClick={() => { navigator.clipboard.writeText("https://zap.gg/u/degen"); showToast("DOSSIER LINK COPIED", "success"); }} 
                            className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white hover:border-[#00FFC0] hover:text-[#00FFC0]"
                            >
                            <Icons.Share className="w-5 h-5" />
                        </NeonSpring>
                        <NeonSpring onClick={() => appContext?.setCurrentPage('Settings')} className="p-3 rounded-lg bg-[#00FFC0] text-black hover:bg-white">
                            <Icons.Settings className="w-5 h-5" />
                        </NeonSpring>
                    </div>
                </div>

                {/* 2. STATS & ARSENAL GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    
                    {/* PERFORMANCE MATRIX */}
                    <RevealContainer className="lg:col-span-2 h-full" delay={0.1}>
                         <CyberCard className="h-full bg-[#0c0c0e] border border-white/10 p-6 md:p-8 flex flex-col justify-between group">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="font-orbitron text-xl font-black text-white uppercase flex items-center gap-3">
                                        <TacticalIcon pulse><Icons.Zap className="w-5 h-5 text-[#00FFC0]" /></TacticalIcon>
                                        Performance Matrix
                                    </h2>
                                    <p className="text-[10px] text-[#666] font-jetbrains-mono mt-1 tracking-widest">
                                        LIVE TELEMETRY
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-5xl font-black font-orbitron text-white tracking-tighter flex items-center gap-1">
                                        <NumberTicker value={88} /> <span className="text-lg text-[#00FFC0]">/100</span>
                                    </div>
                                    <div className="text-[9px] font-bold text-[#00FFC0] uppercase tracking-widest bg-[#00FFC0]/10 px-2 py-1 rounded">ZAP SCORE</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Skill Bars */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[9px] uppercase font-bold text-zinc-500">
                                        <span>Integrity Audit</span>
                                        <span className="text-[#00FFC0]">95%</span>
                                    </div>
                                    <ProgressGlow progress={95} className="h-1.5 bg-[#1a1a1a]" color="neon-surge" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[9px] uppercase font-bold text-zinc-500">
                                        <span>Activity Volume</span>
                                        <span className="text-blue-400">72%</span>
                                    </div>
                                    <ProgressGlow progress={72} className="h-1.5 bg-[#1a1a1a]" color="purple" />
                                </div>
                            </div>
                         </CyberCard>
                    </RevealContainer>

                    {/* BADGE ARSENAL */}
                    <RevealContainer className="h-full" delay={0.2}>
                        <CyberCard className="h-full bg-[#0c0c0e] border border-white/10 p-6 md:p-8">
                             <h3 className="font-orbitron text-sm font-bold text-white uppercase mb-6 flex items-center gap-2">
                                <Icons.Trophy className="w-4 h-4 text-yellow-500" /> Badge Arsenal
                             </h3>
                             <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((badge) => (
                                    <TacticalIcon key={badge} spinOnHover={true} className="aspect-square">
                                        <div className={`w-full h-full rounded-lg border flex items-center justify-center relative group transition-all duration-300 bg-[#111] border-[#222] hover:border-[#00FFC0] hover:bg-[#00FFC0]/10`}>
                                            <Icons.Shield className={`w-5 h-5 text-zinc-600 group-hover:text-[#00FFC0] transition-colors`} />
                                        </div>
                                    </TacticalIcon>
                                ))}
                             </div>
                             <div className="mt-6 pt-6 border-t border-white/5 text-center">
                                 <button className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">View All Achievements</button>
                             </div>
                        </CyberCard>
                    </RevealContainer>
                </div>

                {/* 3. SECURITY SIGNAL ARSENAL */}
                <RevealContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" delay={0.3}>
                    <StatItem label="MFA Protocol" value="ARMED" sub="2FA ACTIVE" color="neon-surge" />
                    <StatItem label="Wallet Sync" value="LINKED" sub="0x71...9A21" color="neon-surge" />
                    <StatItem label="Risk Level" value="LOW" sub="NO FLAGS" color="purple" />
                    <StatItem label="Net Worth" value="$12.4k" sub="+250 ZP" color="yellow" />
                </RevealContainer>

                {/* 4. ACTIVE UPLINKS (LINKED ACCOUNTS) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <RevealContainer className="xl:col-span-2">
                        <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                            
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-orbitron text-lg font-bold text-white uppercase flex items-center gap-3">
                                        <Icons.Link className="w-5 h-5 text-blue-500" /> Active Uplinks
                                    </h3>
                                    <NeonSpring 
                                        onClick={() => setIsLinkMode(!isLinkMode)} 
                                        className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider border transition-all ${isLinkMode ? 'bg-blue-500 text-white border-blue-500' : 'bg-transparent text-blue-400 border-blue-500/30 hover:border-blue-500'}`}
                                    >
                                        {isLinkMode ? 'CANCEL' : '+ NEW LINK'}
                                    </NeonSpring>
                                </div>

                                {/* Link Form */}
                                <AnimatePresence>
                                    {isLinkMode && (
                                        <motion.form 
                                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
                                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                            onSubmit={handleLinkAccount}
                                            className="bg-[#111] border border-blue-900/30 p-4 rounded-xl overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                 <div className="relative">
                                                     <select 
                                                        className="w-full h-10 bg-black border border-[#333] rounded text-xs text-white px-3 focus:border-blue-500 outline-none appearance-none font-jetbrains-mono uppercase"
                                                        value={linkForm.targetCasinoId}
                                                        onChange={(e) => setLinkForm({...linkForm, targetCasinoId: e.target.value})}
                                                     >
                                                         <option value="">SELECT TARGET...</option>
                                                         {ALL_CASINOS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                     </select>
                                                     <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
                                                 </div>
                                                 <Input 
                                                    placeholder="USERNAME / HANDLE..." 
                                                    value={linkForm.username}
                                                    onChange={(e) => setLinkForm({...linkForm, username: e.target.value})}
                                                    className="h-10 bg-black text-xs font-jetbrains-mono border-[#333] focus:border-blue-500"
                                                 />
                                                 <Button type="submit" className="h-10 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest">
                                                     INITIATE
                                                 </Button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>

                                {/* Account List */}
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {linkedAccounts.map((account) => (
                                            <motion.div 
                                                key={account.id}
                                                layout
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 50 }}
                                                className="group flex items-center justify-between p-4 bg-[#111] border border-[#222] rounded-xl hover:border-blue-500/30 transition-colors relative overflow-hidden"
                                            >
                                                {/* Hover Highlight */}
                                                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <img src={account.casinoLogo} className="w-10 h-10 rounded-lg grayscale group-hover:grayscale-0 transition-all" alt={account.casinoName} />
                                                    <div>
                                                        <div className="font-orbitron font-bold text-sm text-white">{account.casinoName}</div>
                                                        <div className="text-[10px] font-mono text-zinc-500">{account.username}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${account.verified ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${account.verified ? 'bg-[#00FFC0] animate-pulse' : 'bg-yellow-500'}`}></div>
                                                        {account.verified ? 'Verified' : 'Pending'}
                                                    </div>
                                                    <button onClick={() => initiateDisconnect(account.id)} className="text-[#444] hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded">
                                                        <Icons.Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {linkedAccounts.length === 0 && (
                                        <div className="text-center py-8 text-zinc-600 text-xs font-mono uppercase">No active uplinks detected.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </RevealContainer>

                    {/* ACTIVITY FEED ASSAULT */}
                    <RevealContainer delay={0.2}>
                        <FrostedGlass className="h-full flex flex-col border-white/10 min-h-[400px]">
                            <div className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-md flex justify-between items-center">
                                <h3 className="font-orbitron text-sm font-bold text-white uppercase flex items-center gap-2">
                                    <Icons.Activity className="w-4 h-4 text-[#00FFC0]" /> Live Feed
                                </h3>
                                <div className="w-2 h-2 bg-[#00FFC0] rounded-full animate-ping"></div>
                            </div>
                            <div className="flex-1 p-0 relative overflow-hidden custom-scrollbar overflow-y-auto">
                                 <div className="absolute left-8 top-0 bottom-0 w-px bg-[#222] z-0"></div>
                                 <div className="p-6 space-y-6 relative z-10">
                                     {[
                                         { icon: Icons.Target, text: "High-RTP Scan Complete", time: "2m ago", color: "text-[#00FFC0]" },
                                         { icon: Icons.Shield, text: "VPR #402 Verified", time: "1h ago", color: "text-blue-400" },
                                         { icon: Icons.Zap, text: "Rank Up: Vanguard", time: "4h ago", color: "text-yellow-500" },
                                         { icon: Icons.Link, text: "Stake Uplink Established", time: "1d ago", color: "text-purple-500" },
                                     ].map((item, i) => (
                                         <motion.div 
                                            key={i} 
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex gap-4 group"
                                         >
                                             <div className={`w-6 h-6 rounded-full bg-[#0c0c0e] border border-[#333] group-hover:border-white/30 flex items-center justify-center shrink-0 mt-0.5 transition-colors z-10`}>
                                                 <item.icon className={`w-3 h-3 ${item.color}`} />
                                             </div>
                                             <div className="bg-[#111] border border-[#222] p-3 rounded-lg flex-1 group-hover:bg-[#161616] transition-colors">
                                                 <p className="text-xs font-bold text-white font-orbitron uppercase mb-1">{item.text}</p>
                                                 <p className="text-[9px] font-mono text-zinc-500">{item.time}</p>
                                             </div>
                                         </motion.div>
                                     ))}
                                 </div>
                            </div>
                        </FrostedGlass>
                    </RevealContainer>
                </div>

                {/* FOOTER DECORATION */}
                <div className="mt-12 py-8 border-t border-[#222] text-center opacity-50">
                    <p className="font-jetbrains-mono text-[10px] text-white uppercase tracking-[0.3em]">
                        // END OF LINE // SYSTEM SECURE
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
