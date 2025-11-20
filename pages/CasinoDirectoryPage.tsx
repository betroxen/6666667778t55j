
import React, { useState, useMemo, useEffect, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
    Search, 
    ShieldCheck, 
    ShieldAlert, 
    Gem, 
    ExternalLink, 
    Globe, 
    Zap, 
    Activity, 
    X,
    CheckCircle2,
    Timer,
    Landmark,
    ArrowLeft,
    Filter,
    SlidersHorizontal,
    ThumbsUp,
    ThumbsDown,
    CreditCard,
    Server,
    Lock,
    Network,
    BarChart,
    Cpu,
    Terminal
} from 'lucide-react';
import { NeonGlow, TacticalIcon, FrostedGlass, ProgressGlow } from '../components/Effects';
import { NeonSpring } from '../components/Motion';

// --- TYPES ---
interface Casino {
    id: string;
    name: string;
    website: string;
    logo: string;
    rating: number;
    status: 'VERIFIED' | 'UNVERIFIED' | 'BLACKLISTED';
    bonus: string;
    established: string;
    withdrawalSpeed: string;
    license: string;
    founder: string;
    companySize: string;
    specialRanking?: 'ETERNAL CROWN' | 'ELITE TIER' | 'VETERAN';
    tags: string[];
    restricted: string[];
    chains: string[];
    languages: string[];
    kycLevel: 'NONE' | 'LOW' | 'HIGH';
    description: string;
    advisory: string;
    zeroEdge: boolean;
    pros: string[];
    cons: string[];
    features: {
        vpnFriendly: boolean;
        fiatOnramp: boolean;
        liveChat: boolean;
        mobileApp: boolean;
        p2pTransfer: boolean;
    };
}

type SortOption = 'RATING_DESC' | 'RATING_ASC' | 'NEWEST' | 'SPEED';

// --- MOCK DATA ---
const CASINOS: Casino[] = [
    { 
        id: 'duel', 
        name: 'Duel', 
        website: 'https://duel.com', 
        logo: 'https://files.catbox.moe/p4z3v7.jpg', 
        rating: 9.8, 
        status: 'VERIFIED', 
        bonus: '50% Rakeback', 
        established: '2023', 
        withdrawalSpeed: 'Instant (L2)', 
        license: 'Curaçao', 
        founder: 'Unknown (DAO)',
        companySize: '50-100',
        specialRanking: 'ETERNAL CROWN', 
        tags: ['Zero Edge', 'No KYC', 'PVP'], 
        restricted: ['USA', 'France'], 
        chains: ['BTC', 'ETH', 'LTC', 'SOL'],
        languages: ['English', 'Spanish', 'Portuguese', 'Japanese'],
        kycLevel: 'NONE',
        description: 'The new standard for PVP gaming. Built on high-frequency L2 rails for instant settlement. Zero-edge original games and massive rakeback rewards.',
        advisory: 'AUDIT PASSED 10/2025. Zero-Edge protocols verified on-chain.',
        zeroEdge: true,
        pros: ['Zero house edge on originals', 'No KYC required for crypto', 'Instant L2 settlements'],
        cons: ['Limited slot selection', 'No sports betting'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'stake', 
        name: 'Stake', 
        website: 'https://stake.com', 
        logo: 'https://files.catbox.moe/klt24q.jpg', 
        rating: 9.6, 
        status: 'VERIFIED', 
        bonus: '$1000 Monthly', 
        established: '2017', 
        withdrawalSpeed: '< 10 Mins', 
        license: 'Curaçao', 
        founder: 'Eddie Miroslav',
        companySize: '500+',
        specialRanking: 'ELITE TIER', 
        tags: ['Sportsbook', 'Originals', 'High Limit'], 
        restricted: ['USA', 'UK', 'Australia'], 
        chains: ['BTC', 'ETH', 'LTC', 'DOGE', 'EOS'],
        languages: ['English', 'German', 'Spanish', 'French', 'Russian', 'Portuguese'],
        kycLevel: 'LOW',
        description: 'The industry titan. Unmatched liquidity, massive sports betting markets, and the original provably fair games that started the revolution.',
        advisory: 'STABLE OPERATION. High liquidity reserves confirmed.',
        zeroEdge: false,
        pros: ['Massive liquidity for high rollers', 'Industry leading sports odds', 'Top-tier VIP program'],
        cons: ['Strict KYC for large withdrawals', 'Restricted in many regions'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'bcgame', 
        name: 'BC.GAME', 
        website: 'https://bc.game', 
        logo: 'https://files.catbox.moe/810c57.jpg', 
        rating: 9.2, 
        status: 'VERIFIED', 
        bonus: '180% Deposit', 
        established: '2017', 
        withdrawalSpeed: '~1 Hour', 
        license: 'Curaçao', 
        founder: 'BlockDance B.V.',
        companySize: '200-500',
        tags: ['Huge Community', 'Rain', 'DeFi'], 
        restricted: ['USA', 'China'], 
        chains: ['BTC', 'ETH', 'BNB', 'SOL', 'TRX'],
        languages: ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese'],
        kycLevel: 'LOW',
        description: 'A massive ecosystem of proprietary games and community features. BC.Game offers one of the most generous deposit match structures in the sector.',
        advisory: 'BONUS TERMS: Wager requirements apply to unlocked BCD.',
        zeroEdge: false,
        pros: ['Supports 50+ cryptocurrencies', 'Huge community & chat rain', 'Daily free spins'],
        cons: ['Complex bonus unlocking', 'Cluttered interface'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: true, p2pTransfer: true }
    },
    { 
        id: 'rollbit', 
        name: 'Rollbit', 
        website: 'https://rollbit.com', 
        logo: 'https://files.catbox.moe/wpp3nk.jpg', 
        rating: 8.8, 
        status: 'VERIFIED', 
        bonus: 'RLB Airdrop', 
        established: '2020', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Bull Gaming',
        companySize: '50-200',
        tags: ['NFT', 'Crypto Futures', '1000x'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'SOL', 'LTC'],
        languages: ['English'],
        kycLevel: 'LOW',
        description: 'A crypto-native powerhouse blending high-leverage trading, NFT loans, and casino games. High volatility, high reward.',
        advisory: 'FUTURES RISK: 1000x leverage involves extreme liquidation risk.',
        zeroEdge: false,
        pros: ['Crypto futures trading', 'NFT marketplace', 'Innovative features'],
        cons: ['Volatile native token', 'Complex UI for beginners'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'shuffle', 
        name: 'Shuffle', 
        website: 'https://shuffle.com', 
        logo: 'https://files.catbox.moe/pkbfod.png', 
        rating: 8.5, 
        status: 'VERIFIED', 
        bonus: 'SHFL Airdrop', 
        established: '2023', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Noah',
        companySize: '50-100',
        tags: ['Tokenized', 'Airdrop'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'USDC', 'TRX'],
        languages: ['English', 'Japanese'],
        kycLevel: 'LOW',
        description: 'Heavily integrated with its native SHFL token. Offers a sleek UI and aggressive rewards for active token holders.',
        advisory: 'TOKEN VOLATILITY: SHFL price impacts effective rakeback value.',
        zeroEdge: false,
        pros: ['Sleek modern design', 'SHFL token utility', 'Transparent team'],
        cons: ['Token price volatility', 'Limited payment options'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'roobet', 
        name: 'Roobet', 
        website: 'https://roobet.com', 
        logo: 'https://files.catbox.moe/of4dut.jpg', 
        rating: 8.1, 
        status: 'UNVERIFIED', 
        bonus: 'Snoop Dogg', 
        established: '2019', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Raw Entertainment',
        companySize: '200-500',
        tags: ['Brand', 'Slots'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English', 'Spanish', 'Portuguese'],
        kycLevel: 'HIGH',
        description: 'Famous for high-profile partnerships (Snoop Dogg, UFC). Extremely polished but has strict KYC and region blocking.',
        advisory: 'GEO-RESTRICTION: Aggressive VPN detection active. Caution advised.',
        zeroEdge: false,
        pros: ['High-profile partnerships', 'Massive slot library', 'Reliable payouts'],
        cons: ['Strict VPN detection', 'Mandatory KYC'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: false }
    }
];

// --- COMPONENTS ---

const ReconFilterChip = ({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon?: React.ElementType }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all duration-300 border font-orbitron ${active ? 'bg-[#00FFC0] text-black border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.4)]' : 'bg-[#0e0e10] text-zinc-500 border-[#333] hover:border-white/30 hover:text-white'}`}
    >
        {Icon && <Icon className={`w-3 h-3 ${active ? 'text-black' : 'text-zinc-500 group-hover:text-white'}`} />}
        {label}
    </button>
);

const CasinoReconCard = memo(({ casino, onSelect }: { casino: Casino; onSelect: (c: Casino) => void }) => {
    const isVerified = casino.status === 'VERIFIED';
    const isCrown = casino.specialRanking === 'ETERNAL CROWN';
    
    // Trust Color Logic
    const trustColor = isVerified ? 'border-l-[#00FFC0]' : casino.status === 'BLACKLISTED' ? 'border-l-red-600' : 'border-l-yellow-500';
    const glowColor = isVerified ? 'group-hover:shadow-[0_0_30px_rgba(0,255,192,0.1)]' : 'group-hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]';

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => onSelect(casino)}
            className={`group relative rounded-xl bg-[#09090b] border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer transition-all duration-300 active:scale-[0.98] ${glowColor} border-l-[3px] ${trustColor}`}
        >
            {/* Hover Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out pointer-events-none z-10"></div>

            <div className="p-5 relative z-20 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={casino.logo} alt={casino.name} className="w-12 h-12 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500 object-cover shadow-lg border border-white/10" />
                            {isVerified && (
                                <div className="absolute -bottom-1 -right-1 bg-[#00FFC0] rounded-full p-0.5 border border-black">
                                    <CheckCircle2 className="w-3 h-3 text-black" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-orbitron font-black text-white text-lg uppercase tracking-wide group-hover:text-[#00FFC0] transition-colors">{casino.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded text-black ${isVerified ? 'bg-[#00FFC0]' : 'bg-yellow-500'}`}>
                                    {casino.rating.toFixed(1)}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">{casino.withdrawalSpeed}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Rank Badge */}
                    {isCrown && (
                        <div className="bg-purple-900/20 text-purple-400 border border-purple-500/30 p-1.5 rounded-md">
                            <Gem className="w-4 h-4 animate-pulse" />
                        </div>
                    )}
                </div>

                {/* Bonus Intel */}
                <div className="mb-4 bg-white/5 rounded p-2 border border-white/5 group-hover:border-[#00FFC0]/30 transition-colors">
                    <p className="text-[9px] text-zinc-400 uppercase font-jetbrains-mono tracking-wider mb-1">Active Bounty</p>
                    <p className="text-xs font-bold text-white font-orbitron truncate">{casino.bonus}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-auto">
                    {casino.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase px-2 py-1 rounded bg-[#000] border border-[#222] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Hover Reveal Action */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[9px] font-bold uppercase text-[#00FFC0] flex items-center gap-1 tracking-widest bg-black/80 px-2 py-1 rounded border border-[#00FFC0]/30">
                        Initialize <Terminal className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
});

// --- DETAIL MODAL (Tactical Overlay) ---
const TacticalOverlay: React.FC<{ casino: Casino; onClose: () => void }> = ({ casino, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-5xl h-[90vh] bg-[#0c0c0e] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="h-60 relative shrink-0">
                    {/* Dynamic Bg */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale mix-blend-luminosity" style={{ backgroundImage: `url(${casino.logo})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0e]/80 to-[#0c0c0e]"></div>
                    
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/50 border border-white/10 hover:border-white text-white transition-all z-50 group">
                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 rounded-xl border-2 border-[#00FFC0] shadow-[0_0_30px_rgba(0,255,192,0.2)] overflow-hidden bg-black">
                                <img src={casino.logo} className="w-full h-full object-cover" alt="Logo" />
                            </div>
                            <div className="mb-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-4xl font-black font-orbitron text-white uppercase tracking-tighter">{casino.name}</h2>
                                    {casino.status === 'VERIFIED' && <CheckCircle2 className="text-[#00FFC0] w-6 h-6" />}
                                </div>
                                <p className="text-sm font-jetbrains-mono text-zinc-400 uppercase tracking-widest">
                                    EST. {casino.established} // {casino.license}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                             <a 
                                href={`${casino.website}?ref=zapway`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-8 py-4 bg-[#00FFC0] hover:bg-white text-black font-black font-orbitron uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(0,255,192,0.4)] transition-all flex items-center gap-2"
                            >
                                Deploy Uplink <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Stats */}
                    <div className="w-64 border-r border-white/5 bg-[#08080a] p-6 space-y-8 hidden md:block overflow-y-auto custom-scrollbar">
                        <div>
                            <p className="text-[10px] font-jetbrains-mono text-zinc-500 uppercase mb-2">Trust Score</p>
                            <div className="text-5xl font-black text-white font-orbitron mb-2">{casino.rating}</div>
                            <ProgressGlow progress={casino.rating * 10} className="h-1.5" />
                        </div>
                         <div>
                            <p className="text-[10px] font-jetbrains-mono text-zinc-500 uppercase mb-2">Speed</p>
                            <div className="text-lg font-bold text-white font-orbitron flex items-center gap-2">
                                <Timer className="w-4 h-4 text-[#00FFC0]" /> {casino.withdrawalSpeed}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-jetbrains-mono text-zinc-500 uppercase mb-2">KYC Friction</p>
                            <div className={`text-lg font-bold font-orbitron flex items-center gap-2 ${casino.kycLevel === 'NONE' ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                <ShieldCheck className="w-4 h-4" /> {casino.kycLevel}
                            </div>
                        </div>
                         <div>
                            <p className="text-[10px] font-jetbrains-mono text-zinc-500 uppercase mb-3">Capabilities</p>
                            <div className="space-y-2">
                                {Object.entries(casino.features).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center text-xs font-mono text-zinc-400 bg-[#121214] p-2 rounded border border-white/5">
                                        <span className="uppercase">{k.replace(/([A-Z])/g, ' $1')}</span>
                                        {v ? <CheckCircle2 className="w-3 h-3 text-[#00FFC0]" /> : <X className="w-3 h-3 text-zinc-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Tabs */}
                    <div className="flex-1 flex flex-col bg-[#050505] relative">
                        <div className="flex border-b border-white/5">
                            {['TACTICAL ANALYSIS', 'COMPLIANCE', 'COMMUNITY INTEL'].map((tab, i) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex-1 py-5 text-xs font-black uppercase tracking-[0.2em] font-orbitron relative transition-colors ${activeTab === i ? 'text-white bg-[#0c0c0e]' : 'text-zinc-600 hover:text-zinc-300'}`}
                                >
                                    {tab}
                                    {activeTab === i && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00FFC0] shadow-[0_0_10px_#00FFC0]"></div>}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 relative">
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
                             
                             {activeTab === 0 && (
                                 <div className="space-y-8 relative z-10 animate-fade-up">
                                     <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-xl">
                                         <h4 className="text-[#00FFC0] font-bold uppercase text-sm mb-4 font-orbitron flex items-center gap-2">
                                             <Cpu className="w-4 h-4" /> Operator Profile
                                         </h4>
                                         <p className="text-zinc-300 font-rajdhani text-lg leading-relaxed border-l-2 border-[#00FFC0] pl-4">
                                             {casino.description}
                                         </p>
                                     </div>

                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-xl hover:border-[#00FFC0]/30 transition-colors">
                                             <h4 className="text-white font-bold uppercase text-sm mb-4 font-orbitron flex items-center gap-2">
                                                 <ThumbsUp className="w-4 h-4 text-[#00FFC0]" /> Strengths
                                             </h4>
                                             <ul className="space-y-3">
                                                 {casino.pros.map((p, i) => (
                                                     <li key={i} className="flex gap-3 text-xs font-mono text-zinc-400">
                                                         <span className="text-[#00FFC0]">></span> {p}
                                                     </li>
                                                 ))}
                                             </ul>
                                         </div>
                                          <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-xl hover:border-red-500/30 transition-colors">
                                             <h4 className="text-white font-bold uppercase text-sm mb-4 font-orbitron flex items-center gap-2">
                                                 <ThumbsDown className="w-4 h-4 text-red-500" /> Weaknesses
                                             </h4>
                                             <ul className="space-y-3">
                                                 {casino.cons.map((c, i) => (
                                                     <li key={i} className="flex gap-3 text-xs font-mono text-zinc-400">
                                                         <span className="text-red-500">></span> {c}
                                                     </li>
                                                 ))}
                                             </ul>
                                         </div>
                                     </div>

                                     <div className="p-6 bg-yellow-900/10 border border-yellow-600/30 rounded-xl">
                                         <h4 className="text-yellow-500 font-bold uppercase text-sm mb-2 font-orbitron flex items-center gap-2">
                                             <ShieldAlert className="w-4 h-4" /> Tactical Advisory
                                         </h4>
                                         <p className="text-xs font-mono text-yellow-200/80">{casino.advisory}</p>
                                     </div>
                                 </div>
                             )}

                             {activeTab === 1 && (
                                 <div className="space-y-8 relative z-10 animate-fade-up">
                                     <div className="grid grid-cols-2 gap-4">
                                         {casino.chains.map(chain => (
                                             <div key={chain} className="p-4 bg-[#0c0c0e] border border-white/5 rounded flex items-center justify-between">
                                                 <span className="text-xs font-bold font-orbitron text-white">{chain}</span>
                                                 <span className="text-[10px] font-mono text-[#00FFC0]">L2 ACTIVE</span>
                                             </div>
                                         ))}
                                     </div>
                                     <div className="p-6 border border-white/10 rounded bg-[#0c0c0e]">
                                         <h4 className="text-white font-bold uppercase text-sm mb-4 font-orbitron">Restricted Zones</h4>
                                         <div className="flex flex-wrap gap-2">
                                             {casino.restricted.map(r => (
                                                 <span key={r} className="px-3 py-1 bg-red-950/30 border border-red-900/50 text-red-400 text-[10px] font-bold uppercase rounded">
                                                     {r}
                                                 </span>
                                             ))}
                                         </div>
                                     </div>
                                 </div>
                             )}
                             
                             {activeTab === 2 && (
                                 <div className="flex items-center justify-center h-64 text-zinc-600 font-mono text-xs uppercase tracking-widest">
                                     [ CONNECTING TO LIVE FEED... ]
                                 </div>
                             )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- MAIN PAGE ---
const CasinoDirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState<SortOption>('RATING_DESC');
    const [filters, setFilters] = useState({ vpnFriendly: false, fiatOnramp: false, noKyc: false });
    const [selectedCasino, setSelectedCasino] = useState<Casino | null>(null);

    const filteredCasinos = useMemo(() => {
        let c = CASINOS.filter(casino => {
            if (!casino.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (activeCategory === 'VERIFIED' && casino.status !== 'VERIFIED') return false;
            if (activeCategory === 'NO_KYC' && casino.kycLevel !== 'NONE') return false;
            if (activeCategory === 'CRYPTO' && casino.chains.length === 0) return false;
            if (filters.vpnFriendly && !casino.features.vpnFriendly) return false;
            if (filters.fiatOnramp && !casino.features.fiatOnramp) return false;
            if (filters.noKyc && casino.kycLevel !== 'NONE') return false;
            return true;
        });
        
        return c.sort((a, b) => {
            switch (sortBy) {
                case 'RATING_DESC': return b.rating - a.rating;
                case 'RATING_ASC': return a.rating - b.rating;
                case 'NEWEST': return parseInt(b.established) - parseInt(a.established);
                case 'SPEED': return a.withdrawalSpeed.localeCompare(b.withdrawalSpeed); // Simple string sort for now
                default: return 0;
            }
        });
    }, [searchTerm, activeCategory, filters, sortBy]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani pb-20 relative selection:bg-[#00FFC0] selection:text-black">
            
            <AnimatePresence>
                {selectedCasino && <TacticalOverlay casino={selectedCasino} onClose={() => setSelectedCasino(null)} />}
            </AnimatePresence>

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0"></div>

            {/* COMMAND HUD (Sticky) */}
            <div className="sticky top-16 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1900px] mx-auto px-4 lg:px-8 py-3">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                        
                        {/* Live Telemetry */}
                        <div className="flex items-center gap-6 text-[10px] font-jetbrains-mono text-zinc-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#00FFC0] rounded-full animate-pulse"></div>
                                <span className="text-white font-bold">NET: ONLINE</span>
                            </div>
                            <div className="hidden sm:block">
                                NODES: <span className="text-white">{filteredCasinos.length}</span>
                            </div>
                            <div className="hidden sm:block text-[#00FFC0]">
                                SYNC: 12MS
                            </div>
                        </div>

                        {/* Filter Array */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                            {['ALL', 'VERIFIED', 'NO_KYC', 'CRYPTO'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border font-orbitron ${activeCategory === cat ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#111] text-zinc-500 border-white/5 hover:text-white'}`}
                                >
                                    {cat.replace('_', ' ')}
                                </button>
                            ))}
                            <div className="h-4 w-px bg-white/10 mx-2"></div>
                            <ReconFilterChip label="VPN" active={filters.vpnFriendly} onClick={() => setFilters(p => ({...p, vpnFriendly: !p.vpnFriendly}))} icon={Globe} />
                            <ReconFilterChip label="FIAT" active={filters.fiatOnramp} onClick={() => setFilters(p => ({...p, fiatOnramp: !p.fiatOnramp}))} icon={CreditCard} />
                        </div>

                    </div>
                </div>
            </div>

            {/* MAIN GRID CONTAINER */}
            <div className="max-w-[1900px] mx-auto px-4 lg:px-8 py-8 relative z-10">
                
                {/* SEARCH BAR */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-[#00FFC0] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="SCAN OPERATOR DATABASE..." 
                            className="w-full h-14 pl-12 bg-[#0a0a0c] border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 focus:border-[#00FFC0]/50 focus:bg-black transition-all font-orbitron shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-64">
                         <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="w-full h-14 px-4 bg-[#0a0a0c] border border-white/10 rounded-lg text-xs text-zinc-400 font-orbitron uppercase focus:outline-none focus:border-[#00FFC0]/50 font-bold cursor-pointer appearance-none"
                        >
                            <option value="RATING_DESC">Sort: Trust Score</option>
                            <option value="NEWEST">Sort: Newest</option>
                            <option value="SPEED">Sort: Speed</option>
                        </select>
                         <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                    </div>
                </div>

                {/* KINETIC GRID */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    <AnimatePresence>
                        {filteredCasinos.map((casino) => (
                            <CasinoReconCard key={casino.id} casino={casino} onSelect={setSelectedCasino} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCasinos.length === 0 && (
                    <div className="py-32 text-center border border-dashed border-white/10 rounded-xl bg-[#0a0a0c]/50">
                        <Activity className="w-16 h-16 text-zinc-800 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-2xl font-black text-zinc-700 uppercase tracking-widest font-orbitron">Signal Lost</h3>
                        <p className="text-zinc-600 mt-2 font-mono text-xs">Adjust recon filters to re-acquire targets.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CasinoDirectoryPage;
