
import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';
import {
  FrostedGlass,
  NeonGlow,
  ProgressGlow,
  AnimatedGradient,
  ParallaxTilt,
  TacticalIcon,
} from '../components/Effects';
import { CyberCard, RevealContainer, RevealItem } from '../components/Motion';
import { gsap } from 'gsap';

// --- Types ---
type NotificationType = 'system' | 'warning' | 'error' | 'bonus';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

// --- Mock Data ---
const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'warning', title: 'Volatility Spike', message: 'Market volatility index high. Adjust leverage.', timestamp: '10m ago', read: false },
    { id: 2, type: 'bonus', title: 'Mission Complete', message: 'Weekly wager target hit. +500 ZP credited.', timestamp: '1h ago', read: false },
    { id: 3, type: 'system', title: 'System Update v4.2', message: 'ZK-Rollup verifier patch deployed.', timestamp: '3h ago', read: true },
];

// --- Kinetic Components ---

const NumberTicker = ({ value, prefix = '', suffix = '', className = '' }: { value: number, prefix?: string, suffix?: string, className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix;
            }
        });
    }, [springValue, prefix, suffix]);

    return <span ref={ref} className={className} />;
};

const NotificationItem: React.FC<{ note: Notification }> = ({ note }) => {
    const iconMap = {
        system: { icon: Icons.Terminal, color: 'text-neon-surge', border: 'border-neon-surge/20', bg: 'bg-neon-surge/5' },
        warning: { icon: Icons.AlertTriangle, color: 'text-warning-low', border: 'border-warning-low/20', bg: 'bg-warning-low/5' },
        error: { icon: Icons.Activity, color: 'text-warning-high', border: 'border-warning-high/20', bg: 'bg-warning-high/5' },
        bonus: { icon: Icons.Gift, color: 'text-purple-400', border: 'border-purple-400/20', bg: 'bg-purple-400/5' },
    };

    const style = iconMap[note.type];
    const Icon = style.icon;

    return (
        <motion.div 
            layout
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className={`relative flex gap-4 p-3 rounded border ${style.border} bg-black/60 mb-2 group overflow-hidden hover:bg-white/5 transition-colors`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${note.read ? 'bg-transparent' : 'bg-neon-surge group-hover:w-1'}`}></div>
            
            <div className={`mt-0.5 shrink-0 ${style.color}`}>
                <TacticalIcon pulse={!note.read} spinOnHover={true}>
                    <Icon className="w-4 h-4" />
                </TacticalIcon>
            </div>
            <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-start">
                    <h4 className={`text-[10px] font-bold uppercase font-orbitron ${style.color} tracking-widest`}>{note.title}</h4>
                    <span className="text-[9px] font-mono text-text-tertiary opacity-70">{note.timestamp}</span>
                </div>
                <p className="text-[10px] text-text-secondary font-jetbrains-mono leading-tight mt-1 truncate group-hover:whitespace-normal transition-all">{note.message}</p>
            </div>
        </motion.div>
    );
};

const StatWidget = ({ title, value, subtext, icon: Icon, trend, color = "#00FFC0" }: { title: string, value: number, subtext?: string, icon: React.ElementType, trend?: 'up' | 'down' | 'neutral', color?: string }) => (
    <CyberCard className="h-full bg-[#0c0c0e]/90 border border-white/5 p-5 flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors">
        <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
                <h3 className="text-[10px] font-jetbrains-mono text-[#666] uppercase tracking-widest mb-1 group-hover:text-[#888] transition-colors">{title}</h3>
                <div className="flex items-baseline gap-1">
                     <span className="text-2xl lg:text-3xl font-orbitron font-black text-white tracking-tight group-hover:text-shadow-neon transition-all">
                        <NumberTicker value={value} prefix={title.includes('Balance') ? '$' : ''} />
                     </span>
                </div>
            </div>
            <div className={`p-2 rounded-lg bg-white/5 border border-white/10 text-[${color}] group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10`}>
                <Icon className="h-5 w-5" style={{ color }} />
            </div>
        </div>

        {subtext && (
            <div className="relative z-10 flex items-center gap-2 mt-2">
                {trend === 'up' && <Icons.TrendingUp className="w-3 h-3" style={{ color }} />}
                <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">
                    <span style={{ color }}>{subtext}</span>
                </p>
            </div>
        )}
        
        {/* Scanline Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
    </CyberCard>
);

const GameLauncher = ({ title, subtitle, icon: Icon, color, onClick }: { title: string, subtitle: string, icon: React.ElementType, color: string, onClick: () => void }) => (
    <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`group relative h-32 w-full rounded-xl overflow-hidden border border-white/5 bg-black hover:border-${color === 'neon-surge' ? 'neon-surge' : 'purple-500'} transition-colors duration-300`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-black z-0"></div>
        {/* Scanning Grid */}
        <div className={`absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_25%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_26%,transparent_27%,transparent_74%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_75%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_25%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_26%,transparent_27%,transparent_74%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_75%,rgba(${color === 'neon-surge' ? '0,255,192' : '168,85,247'},0.05)_76%,transparent_77%,transparent)] bg-[size:30px_30px] group-hover:opacity-100 opacity-20 transition-opacity z-0 pointer-events-none`}></div>
        
        <div className="relative z-10 h-full flex items-center justify-between p-6">
            <div className="text-left">
                <span className={`font-orbitron font-black text-white uppercase tracking-[0.2em] text-lg group-hover:text-${color === 'neon-surge' ? 'neon-surge' : 'purple-500'} transition-colors block`}>{title}</span>
                <span className="text-[9px] text-[#666] font-jetbrains-mono mt-1 block flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${color === 'neon-surge' ? 'bg-neon-surge' : 'bg-purple-500'} animate-pulse`}></span>
                    {subtitle}
                </span>
            </div>
            <div className={`p-3 rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-${color === 'neon-surge' ? 'neon-surge' : 'purple-500'}/10 transition-all duration-300`}>
                <Icon className={`h-6 w-6 text-gray-400 group-hover:text-${color === 'neon-surge' ? 'neon-surge' : 'purple-500'} transition-colors`} />
            </div>
        </div>
    </motion.button>
);

const DashboardPage: React.FC = () => {
    const appContext = useContext(AppContext);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".header-char", {
                y: 40,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="animate-fadeIn min-h-screen pb-20 relative font-rajdhani bg-[#050505] text-white overflow-hidden" ref={headerRef}>
            
             <AnimatedGradient />
             
             <div className="relative z-10 max-w-[1600px] mx-auto px-4 pt-4 lg:pt-8">
                
                {/* COMMAND HEADER */}
                <RevealContainer className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
                    <RevealItem>
                        <NeonGlow intensity="sm" color="neon-surge">
                            <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-surge/20 bg-neon-surge/5 rounded text-neon-surge text-[9px] font-bold font-jetbrains-mono uppercase tracking-widest mb-2 backdrop-blur-md header-char">
                                <span className="w-1.5 h-1.5 bg-neon-surge rounded-full animate-pulse"></span>
                                Command Center Online
                            </div>
                        </NeonGlow>
                        <h1 className="text-4xl md:text-6xl font-black font-orbitron text-white uppercase tracking-tighter leading-none">
                            <span className="header-char inline-block">Tactical</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-emerald-400 header-char inline-block">Ops</span>
                        </h1>
                    </RevealItem>
                    <RevealItem>
                         <FrostedGlass blur="md" opacity={60} className="px-4 py-2 rounded border-white/10 flex items-center gap-4 header-char">
                             <div>
                                <p className="text-[9px] font-jetbrains-mono text-[#666] uppercase text-right">Net Status</p>
                                <p className="text-xs font-bold text-neon-surge font-orbitron flex items-center justify-end gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-surge animate-pulse"></span> OPTIMAL
                                </p>
                             </div>
                         </FrostedGlass>
                    </RevealItem>
                </RevealContainer>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* --- MAIN INTELLIGENCE COLUMN (8) --- */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* 1. STATS KILLSHOTS */}
                        <RevealContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             <RevealItem>
                                <StatWidget 
                                    title="Balance USD" 
                                    value={12450} 
                                    subtext="0.4200 BTC" 
                                    icon={Icons.Wallet} 
                                    trend="up" 
                                    color="#00FFC0"
                                />
                            </RevealItem>
                            <RevealItem>
                                <StatWidget 
                                    title="Zap Points" 
                                    value={4250} 
                                    subtext="Next Reward: 5k" 
                                    icon={Icons.Zap} 
                                    trend="up" 
                                    color="#EAB308"
                                />
                            </RevealItem>
                            <RevealItem>
                                <StatWidget 
                                    title="ZAP Score" 
                                    value={92} 
                                    subtext="Elite Operator" 
                                    icon={Icons.Shield} 
                                    trend="neutral" 
                                    color="#a855f7"
                                />
                            </RevealItem>
                        </RevealContainer>

                        {/* 2. LIVE INTEL HUB & LAUNCHERS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Live RTP */}
                             <RevealContainer className="h-full">
                                 <RevealItem className="h-full">
                                    <FrostedGlass blur="lg" opacity={80} className="p-0 relative group h-full flex flex-col border-white/10 overflow-hidden min-h-[200px]">
                                        <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                                            <h3 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                <TacticalIcon pulse>
                                                    <Icons.Activity className="w-3 h-3 text-neon-surge" />
                                                </TacticalIcon> 
                                                Live RTP Feed
                                            </h3>
                                            <span className="text-[9px] font-mono text-[#666] uppercase">2s AGO</span>
                                        </div>
                                        <div className="p-5 space-y-5 flex-1 bg-[#050505]/30 relative">
                                            <div className="space-y-1 relative z-10">
                                                <div className="flex justify-between text-[10px] font-jetbrains-mono uppercase">
                                                    <span className="text-white font-bold">PLINKO</span>
                                                    <span className="text-neon-surge font-bold">99.2%</span>
                                                </div>
                                                <ProgressGlow progress={99.2} color="neon-surge" className="h-1.5" />
                                            </div>
                                            <div className="space-y-1 relative z-10">
                                                <div className="flex justify-between text-[10px] font-jetbrains-mono uppercase">
                                                    <span className="text-white font-bold">MINES</span>
                                                    <span className="text-yellow-500 font-bold">98.5%</span>
                                                </div>
                                                <ProgressGlow progress={98.5} color="yellow" className="h-1.5" />
                                            </div>
                                        </div>
                                    </FrostedGlass>
                                 </RevealItem>
                             </RevealContainer>

                             {/* Launchers */}
                            <RevealContainer className="space-y-4">
                                <RevealItem>
                                    <GameLauncher 
                                        title="Mines" 
                                        subtitle="PROVABLY FAIR" 
                                        icon={Icons.Mine} 
                                        color="neon-surge" 
                                        onClick={() => appContext?.setCurrentPage('Mines Game')} 
                                    />
                                </RevealItem>
                                <RevealItem>
                                    <GameLauncher 
                                        title="Plinko" 
                                        subtitle="HIGH VARIANCE" 
                                        icon={Icons.Gem} 
                                        color="purple-500" 
                                        onClick={() => appContext?.setCurrentPage('Plinko Game')} 
                                    />
                                </RevealItem>
                            </RevealContainer>
                        </div>

                         {/* 3. ACTIVITY LOG */}
                         <RevealContainer>
                             <RevealItem>
                                <FrostedGlass blur="md" opacity={60} className="p-0 overflow-hidden border-white/5">
                                    <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                                        <h3 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Icons.FileText className="w-3 h-3 text-[#888]" /> Tactical Ledger
                                        </h3>
                                        <span className="text-[9px] font-jetbrains-mono text-[#666] uppercase">LAST 24H</span>
                                    </div>
                                    <div className="font-jetbrains-mono bg-black/20 p-4 text-center text-[#444] text-xs italic">
                                        [ CONNECTING TO BLOCKCHAIN NODE... ]
                                    </div>
                                </FrostedGlass>
                             </RevealItem>
                        </RevealContainer>
                    </div>

                    {/* --- SIDEBAR OPS COLUMN (4) --- */}
                    <div className="lg:col-span-4 space-y-6 flex flex-col">
                        
                         {/* 1. XAI GUARDIAN */}
                         <RevealContainer>
                            <RevealItem>
                                <FrostedGlass blur="xl" opacity={70} className="p-5 relative overflow-hidden group hover:border-neon-surge/30 transition-colors border-white/10">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-surge/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-neon-surge/10 transition-all"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <TacticalIcon pulse spinOnHover>
                                                    <Icons.Shield className="h-4 w-4 text-neon-surge" />
                                                </TacticalIcon>
                                                <h4 className="font-orbitron text-xs font-bold text-white uppercase tracking-wider">XAI Guardian</h4>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-1 h-1 rounded-full bg-neon-surge animate-pulse"></div>
                                                <div className="w-1 h-1 rounded-full bg-neon-surge"></div>
                                                <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-black/60 rounded-lg p-3 border border-white/5 mb-3">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[9px] font-jetbrains-mono text-[#666] uppercase">Threat Level</span>
                                                <span className="text-neon-surge font-bold font-mono text-xs">LOW</span>
                                            </div>
                                            <div className="flex gap-0.5 h-1">
                                                <div className="flex-1 bg-neon-surge rounded-l-full shadow-[0_0_5px_#00FFC0]"></div>
                                                <div className="flex-1 bg-[#222]"></div>
                                                <div className="flex-1 bg-[#222]"></div>
                                                <div className="flex-1 bg-[#222] rounded-r-full"></div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-[9px] text-[#888] leading-relaxed font-jetbrains-mono mb-3 border-l-2 border-neon-surge pl-2">
                                            // MONITORING ACTIVE: Play patterns stable. No intervention required.
                                        </p>
                                        <button className="w-full border border-white/10 hover:border-neon-surge hover:text-white text-[#666] text-[9px] h-8 uppercase font-orbitron tracking-widest rounded hover:bg-neon-surge/10 transition-all">
                                            Manage Limits
                                        </button>
                                    </div>
                                </FrostedGlass>
                            </RevealItem>
                        </RevealContainer>

                        {/* 2. NOTIFICATION FEED */}
                        <RevealContainer className="flex-1">
                            <RevealItem className="h-full">
                                <FrostedGlass blur="md" opacity={60} className="h-full flex flex-col p-0 border-white/5 min-h-[300px]">
                                    <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <TacticalIcon ping>
                                                <Icons.Bell className="w-4 h-4 text-neon-surge" />
                                            </TacticalIcon>
                                            <h3 className="font-orbitron text-xs font-bold text-white uppercase tracking-widest">Intel Stream</h3>
                                        </div>
                                        <button onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))} className="text-[9px] font-jetbrains-mono text-text-tertiary hover:text-white uppercase border border-[#333] px-2 py-0.5 rounded hover:border-neon-surge transition-all">
                                            [ CLEAR ]
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 bg-black/20">
                                        <AnimatePresence initial={false}>
                                            {notifications.map(note => <NotificationItem key={note.id} note={note} />)}
                                        </AnimatePresence>
                                        {notifications.length === 0 && (
                                            <div className="text-center py-10 text-[#444] text-[10px] font-mono">NO NEW SIGNALS</div>
                                        )}
                                    </div>
                                </FrostedGlass>
                            </RevealItem>
                        </RevealContainer>

                    </div>
                </div>
             </div>
        </div>
    );
};

export default DashboardPage;
