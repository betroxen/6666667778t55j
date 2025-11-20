
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { CyberCard, RevealContainer, RevealItem, NeonSpring } from '../components/Motion';
import { TacticalIcon, NeonGlow, FrostedGlass, ProgressGlow } from '../components/Effects';
import { gsap } from 'gsap';

// --- TYPES & DATA ---

type PartnerRole = 'OPERATOR' | 'CREATOR';
type FormStep = 1 | 2 | 3;

const CODE_OF_CONDUCT = [
    { title: "1. Integrity & Transparency", text: "Partners shall engage with honesty. No false claims about ZapWay capabilities." },
    { title: "2. Compliance with Laws", text: "Must comply with all AML/KYC obligations. Required licensing must be kept current." },
    { title: "3. Responsible Marketing", text: "No spam or deceptive user acquisition. Promotions must be clear and fair." },
    { title: "4. Confidentiality", text: "Protect confidential info. Respect user privacy and process data strictly under GDPR." },
    { title: "5. Conflict of Interest", text: "Disclose conflicts. Collaboration with fraudulent entities is prohibited." },
    { title: "6. Accountability", text: "Submit truthful reports. Violation results in termination and fund forfeiture." },
    { title: "7. Engagement", text: "Commit to active communication and uphold the mission of integrity-driven gaming." }
];

const REWARD_TIERS = [
    { 
        name: 'RECRUIT', 
        req: '< $10k Vol', 
        share: '25% RevShare', 
        color: 'text-blue-400',
        borderColor: 'border-blue-400/30',
        perks: ['Standard Tracking', 'Monthly Payouts', 'Basic Assets'] 
    },
    { 
        name: 'VANGUARD', 
        req: '$50k+ Vol', 
        share: '35% RevShare', 
        color: 'text-neon-surge',
        borderColor: 'border-neon-surge/30',
        perks: ['+ CPA Bonuses', 'Weekly Payouts', 'Dedicated Account Mgr', 'NFT Badge'] 
    },
    { 
        name: 'LEGEND', 
        req: '$250k+ Vol', 
        share: '45% + Equity', 
        color: 'text-purple-500',
        borderColor: 'border-purple-500/30',
        perks: ['Custom Hybrid Deals', 'Instant Crypto Settle', 'Executive Access', 'Whitelabel Tools'] 
    }
];

// --- COMPONENTS ---

const RoleSelector = ({ active, onSelect }: { active: PartnerRole, onSelect: (r: PartnerRole) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <CyberCard 
            className={`p-1 cursor-pointer transition-all duration-500 ${active === 'OPERATOR' ? 'ring-1 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'opacity-60 hover:opacity-100'}`}
        >
            <div 
                onClick={() => onSelect('OPERATOR')}
                className="bg-[#0c0c0e] h-full rounded-xl p-8 relative overflow-hidden group"
            >
                 <div className={`absolute top-0 right-0 p-2 rounded-bl-xl border-l border-b text-[10px] font-jetbrains-mono uppercase transition-colors ${active === 'OPERATOR' ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-[#111] border-[#333] text-gray-600'}`}>
                    TYPE: PLATFORM
                </div>
                <div className="relative z-10">
                    <TacticalIcon pulse={active === 'OPERATOR'} className="mb-6">
                        <Icons.Cpu className={`h-12 w-12 ${active === 'OPERATOR' ? 'text-blue-500' : 'text-gray-600 group-hover:text-blue-400'}`} />
                    </TacticalIcon>
                    <h3 className={`font-orbitron text-2xl font-black uppercase mb-2 ${active === 'OPERATOR' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        Protocol Operator
                    </h3>
                    <p className="text-sm font-rajdhani text-text-secondary leading-relaxed">
                        For Casinos, Betting Platforms, and DApps seeking institutional vetting and high-value player liquidity.
                    </p>
                </div>
                {/* Active Bg Flash */}
                {active === 'OPERATOR' && <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>}
            </div>
        </CyberCard>

        <CyberCard 
            className={`p-1 cursor-pointer transition-all duration-500 ${active === 'CREATOR' ? 'ring-1 ring-neon-surge shadow-[0_0_30px_rgba(0,255,192,0.2)]' : 'opacity-60 hover:opacity-100'}`}
        >
            <div 
                onClick={() => onSelect('CREATOR')}
                className="bg-[#0c0c0e] h-full rounded-xl p-8 relative overflow-hidden group"
            >
                <div className={`absolute top-0 right-0 p-2 rounded-bl-xl border-l border-b text-[10px] font-jetbrains-mono uppercase transition-colors ${active === 'CREATOR' ? 'bg-neon-surge/20 border-neon-surge/50 text-neon-surge' : 'bg-[#111] border-[#333] text-gray-600'}`}>
                    TYPE: AMPLIFIER
                </div>
                <div className="relative z-10">
                    <TacticalIcon pulse={active === 'CREATOR'} className="mb-6">
                        <Icons.Share className={`h-12 w-12 ${active === 'CREATOR' ? 'text-neon-surge' : 'text-gray-600 group-hover:text-neon-surge'}`} />
                    </TacticalIcon>
                    <h3 className={`font-orbitron text-2xl font-black uppercase mb-2 ${active === 'CREATOR' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        Signal Relay
                    </h3>
                    <p className="text-sm font-rajdhani text-text-secondary leading-relaxed">
                        For Affiliates, Streamers, and Content Creators verifying the ecosystem and monetizing audience trust.
                    </p>
                </div>
                 {/* Active Bg Flash */}
                 {active === 'CREATOR' && <div className="absolute inset-0 bg-neon-surge/5 pointer-events-none"></div>}
            </div>
        </CyberCard>
    </div>
);

const IntakeTerminal = ({ role }: { role: PartnerRole }) => {
    const [step, setStep] = useState<FormStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        entityName: '',
        website: '',
        contactEmail: '',
        trafficSource: '',
        monthlyVol: '',
        license: '', 
        codeOfConduct: false,
        amlCheck: false,
    });

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Kinetic Delay for "Encryption"
        setTimeout(() => {
            setIsSubmitting(false);
            setIsComplete(true);
        }, 2500);
    };

    if (isComplete) {
        return (
            <RevealContainer>
                <FrostedGlass className="p-12 text-center border-neon-surge/50 shadow-[0_0_50px_rgba(0,255,192,0.1)]">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neon-surge/10 border border-neon-surge mb-8 animate-pulse-glow">
                        <Icons.CheckCircle className="h-12 w-12 text-neon-surge" />
                    </div>
                    <h3 className="font-orbitron text-3xl text-white uppercase mb-4 tracking-wide">Signal Encrypted & Sent</h3>
                    <p className="text-text-secondary font-rajdhani mb-8 max-w-md mx-auto text-lg">
                        Your dossier is now in the secure queue. Compliance officers will initiate the handshake protocol via email within 48 hours.
                    </p>
                    <div className="p-4 bg-black/40 border border-neon-surge/20 rounded-lg max-w-sm mx-auto text-xs font-jetbrains-mono text-text-tertiary">
                        REF ID: <span className="text-neon-surge font-bold">ZAP-{Math.floor(Math.random() * 100000)}</span>
                    </div>
                </FrostedGlass>
            </RevealContainer>
        );
    }

    return (
        <FrostedGlass className="overflow-hidden border-[#333] bg-[#0c0c0e]">
            {/* Header */}
            <div className="bg-[#080808] p-4 border-b border-[#333] flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></div>
                    <span className="font-orbitron text-xs text-white uppercase tracking-widest">INTAKE TERMINAL v4.0</span>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-12 rounded-sm transition-all duration-500 ${step >= i ? 'bg-neon-surge shadow-[0_0_10px_#00FFC0]' : 'bg-[#222]'}`} />
                    ))}
                </div>
            </div>

            <div className="p-8">
                <AnimatePresence mode='wait'>
                    {/* Step 1: Identity */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h3 className="font-orbitron text-xl text-white uppercase mb-6 flex items-center gap-3">
                                <Icons.User className="h-6 w-6 text-neon-surge" />
                                {role === 'OPERATOR' ? 'ENTITY IDENTIFICATION' : 'SOURCE VERIFICATION'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">
                                        {role === 'OPERATOR' ? 'Legal Entity Name' : 'Channel / Brand Name'}
                                    </label>
                                    <Input 
                                        value={formData.entityName}
                                        onChange={e => setFormData({...formData, entityName: e.target.value})}
                                        placeholder={role === 'OPERATOR' ? "e.g. ZapWay Corp LTD" : "e.g. CryptoKing TV"}
                                        className="bg-[#111] border-[#333] focus:border-neon-surge"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Primary URL</label>
                                    <Input 
                                        value={formData.website}
                                        onChange={e => setFormData({...formData, website: e.target.value})}
                                        placeholder="https://..."
                                        className="bg-[#111] border-[#333] focus:border-neon-surge"
                                    />
                                </div>
                                 <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Secure Email</label>
                                    <Input 
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                                        placeholder="partners@domain.com"
                                        className="bg-[#111] border-[#333] focus:border-neon-surge"
                                    />
                                </div>
                                {role === 'OPERATOR' ? (
                                    <div>
                                        <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">License Number</label>
                                        <Input 
                                            value={formData.license}
                                            onChange={e => setFormData({...formData, license: e.target.value})}
                                            placeholder="e.g. Curaçao 365/JAZ"
                                            className="bg-[#111] border-[#333] focus:border-neon-surge"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Traffic Source</label>
                                        <Input 
                                            as="select"
                                            value={formData.trafficSource}
                                            onChange={e => setFormData({...formData, trafficSource: e.target.value})}
                                            className="bg-[#111] border-[#333] focus:border-neon-surge"
                                        >
                                            <option value="">SELECT SOURCE...</option>
                                            <option value="SEO">SEO / Organic</option>
                                            <option value="SOCIAL">Social Media (X, YT)</option>
                                            <option value="EMAIL">Email / Newsletter</option>
                                            <option value="PAID">Paid Media</option>
                                        </Input>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end mt-8">
                                <NeonSpring onClick={() => setStep(2)} disabled={!formData.entityName || !formData.contactEmail} className="px-8 py-3 bg-neon-surge text-black font-bold font-orbitron uppercase tracking-wider rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    Initialize Phase 2 &rarr;
                                </NeonSpring>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Metrics */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                             <h3 className="font-orbitron text-xl text-white uppercase mb-6 flex items-center gap-3">
                                <Icons.Activity className="h-6 w-6 text-neon-surge" />
                                {role === 'OPERATOR' ? 'LIQUIDITY & VOLUME' : 'AUDIENCE & REACH'}
                            </h3>
                            
                            <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-4">
                                    {role === 'OPERATOR' ? 'Monthly GGR (Gross Gaming Revenue)' : 'Monthly Active Users / Views'}
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['< $10k', '$10k - $50k', '$50k - $250k', '$250k+'].map((vol) => (
                                        <button
                                            key={vol}
                                            onClick={() => setFormData({...formData, monthlyVol: vol})}
                                            className={`p-4 rounded-lg border text-xs font-bold font-orbitron uppercase transition-all duration-300 ${formData.monthlyVol === vol ? 'bg-neon-surge text-black border-neon-surge shadow-lg scale-105' : 'bg-[#111] text-text-tertiary border-[#333] hover:border-white hover:text-white'}`}
                                        >
                                            {vol}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-lg flex gap-4 items-start">
                                <Icons.Info className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                                <p className="text-sm text-blue-200 font-rajdhani leading-relaxed">
                                    <strong className="block uppercase mb-1 font-orbitron text-blue-400">VETTING PROTOCOL ACTIVE</strong>
                                    ZapWay does not offer "pay-to-play" listings. All applicants undergo a rigorous manual review of their reputation, solvency, and technical stack. Low-quality applications will be rejected without appeal.
                                </p>
                            </div>

                             <div className="flex justify-between mt-8">
                                <Button variant="ghost" onClick={() => setStep(1)} className="text-text-tertiary hover:text-white">BACK</Button>
                                <NeonSpring onClick={() => setStep(3)} disabled={!formData.monthlyVol} className="px-8 py-3 bg-neon-surge text-black font-bold font-orbitron uppercase tracking-wider rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    Proceed to Compliance &rarr;
                                </NeonSpring>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Code of Conduct */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h3 className="font-orbitron text-xl text-white uppercase mb-6 flex items-center gap-3">
                                <Icons.Shield className="h-6 w-6 text-neon-surge" />
                                BINDING CODE OF CONDUCT
                            </h3>

                            <div className="bg-[#080808] border border-[#333] rounded-lg h-64 overflow-y-auto custom-scrollbar p-6 space-y-4 shadow-inner">
                                {CODE_OF_CONDUCT.map((rule, i) => (
                                    <div key={i} className="pb-4 border-b border-[#222] last:border-0 last:pb-0">
                                        <h4 className="text-neon-surge text-xs font-bold font-orbitron uppercase mb-1">{rule.title}</h4>
                                        <p className="text-text-secondary text-xs font-rajdhani leading-relaxed">{rule.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-2">
                                 <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#111] transition-colors">
                                    <input 
                                        type="checkbox" 
                                        id="coc"
                                        className="mt-1 w-5 h-5 accent-neon-surge cursor-pointer"
                                        checked={formData.codeOfConduct}
                                        onChange={(e) => setFormData({...formData, codeOfConduct: e.target.checked})}
                                    />
                                    <label htmlFor="coc" className="text-xs text-text-tertiary leading-relaxed cursor-pointer">
                                        <strong className="text-white block mb-0.5 font-orbitron uppercase">I ACCEPT THE CODE OF CONDUCT</strong>
                                        I understand that violation of these standards results in immediate termination and forfeiture of rewards.
                                    </label>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#111] transition-colors">
                                    <input 
                                        type="checkbox" 
                                        id="aml"
                                        className="mt-1 w-5 h-5 accent-neon-surge cursor-pointer"
                                        checked={formData.amlCheck}
                                        onChange={(e) => setFormData({...formData, amlCheck: e.target.checked})}
                                    />
                                    <label htmlFor="aml" className="text-xs text-text-tertiary leading-relaxed cursor-pointer">
                                        <strong className="text-white block mb-0.5 font-orbitron uppercase">COMPLIANCE ATTESTATION</strong>
                                        I confirm my operations adhere to all applicable AML/KYC laws and I am not located in a sanctioned jurisdiction.
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button variant="ghost" onClick={() => setStep(2)} disabled={isSubmitting} className="text-text-tertiary hover:text-white">BACK</Button>
                                <NeonSpring 
                                    onClick={handleSubmit} 
                                    disabled={!formData.codeOfConduct || !formData.amlCheck || isSubmitting}
                                    className="px-10 py-4 bg-neon-surge text-black font-black font-orbitron uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(0,255,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2"><Icons.Loader2 className="animate-spin" /> ENCRYPTING...</span>
                                    ) : (
                                        'SIGN & TRANSMIT'
                                    )}
                                </NeonSpring>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </FrostedGlass>
    );
};

const AffiliatePage: React.FC = () => {
    const [role, setRole] = useState<PartnerRole>('CREATOR');
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-el", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-rajdhani animate-fadeIn pb-20 overflow-hidden" ref={headerRef}>
            
            {/* Background Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="max-w-7xl mx-auto px-4 pt-16 relative z-10">
                
                {/* Hero */}
                <header className="text-center mb-20">
                    <div className="hero-el inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-8 backdrop-blur-sm">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
                        </span>
                        <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">Partnership Protocol v3.0</span>
                    </div>
                    
                    <h1 className="hero-el font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-8 leading-none drop-shadow-2xl">
                        ZAPWAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-blue-500 text-glow">ALLIANCE</span>
                    </h1>
                    
                    <p className="hero-el text-text-secondary text-xl leading-relaxed max-w-3xl mx-auto border-l-4 border-neon-surge pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        A market-leading, blockchain-aligned ecosystem. Whether you operate the infrastructure or amplify the signal, we provide the trust anchor to scale your impact.
                    </p>
                </header>

                {/* Role Selection */}
                <RevealContainer>
                    <RoleSelector active={role} onSelect={setRole} />
                </RevealContainer>

                {/* Dynamic Value Props */}
                <RevealContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
                    <AnimatePresence mode='wait'>
                        {[
                            { 
                                icon: Icons.Shield, 
                                title: role === 'OPERATOR' ? 'Premium Vetting Gate' : 'Integrity-Linked Rewards', 
                                text: role === 'OPERATOR' ? "Access strategic high-value players who trust data over marketing. Our seal is a mark of solvency." : "Monetize your reputation without selling out. Earn higher commissions for driving vetted traffic.",
                                color: "text-neon-surge"
                            },
                            { 
                                icon: Icons.Activity, 
                                title: role === 'OPERATOR' ? 'Real-Time Audits' : 'On-Chain Tracking', 
                                text: role === 'OPERATOR' ? "Continuous VPR monitoring validates your platform's performance, turning transparency into a marketing asset." : "Transparent dashboard links and optional wallet-based tracking ensure you never lose credit.",
                                color: "text-blue-500"
                            },
                            { 
                                icon: Icons.Zap, 
                                title: role === 'OPERATOR' ? 'Zero-Knowledge Proof' : 'Gamified Incentives', 
                                text: role === 'OPERATOR' ? "Integration with our ZK-Rollup architecture proves fairness mathematically, reducing user friction." : "Unlock NFT badges, seasonal accelerator bonuses, and token-based kickers as you climb ranks.",
                                color: "text-purple-500"
                            }
                        ].map((item, i) => (
                            <RevealItem key={item.title}>
                                <CyberCard className="h-full bg-[#0c0c0e] border border-[#222] p-8 flex flex-col group hover:border-white/20 transition-colors">
                                    <TacticalIcon pulse className="mb-6 self-start">
                                        <item.icon className={`h-8 w-8 ${item.color}`} />
                                    </TacticalIcon>
                                    <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-4 group-hover:text-shadow-sm transition-all">{item.title}</h3>
                                    <p className="text-sm text-text-secondary font-rajdhani leading-relaxed">{item.text}</p>
                                </CyberCard>
                            </RevealItem>
                        ))}
                    </AnimatePresence>
                </RevealContainer>

                {/* Split Layout: Intake & Rewards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start mb-24">
                    
                    {/* Left: Intake Form */}
                    <RevealContainer>
                        <IntakeTerminal role={role} />
                    </RevealContainer>

                    {/* Right: Rewards & Community */}
                    <div className="space-y-12">
                        <RevealContainer delay={0.2}>
                            <div>
                                <h3 className="font-orbitron text-2xl text-white uppercase mb-8 flex items-center gap-3">
                                    <Icons.TrendingUp className="h-6 w-6 text-neon-surge" /> 
                                    {role === 'OPERATOR' ? 'TRAFFIC TIERS' : 'REWARD STRUCTURE'}
                                </h3>
                                <div className="space-y-4">
                                    {REWARD_TIERS.map((tier, i) => (
                                        <RevealItem key={i}>
                                            <div className={`group relative p-6 bg-[#0c0c0e] border ${tier.borderColor} rounded-xl overflow-hidden hover:bg-[#111] transition-all duration-500`}>
                                                {/* Hover Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                                                
                                                <div className="flex justify-between items-start mb-4 relative z-10">
                                                    <div>
                                                        <h4 className={`font-orbitron font-black text-xl ${tier.color}`}>{tier.name}</h4>
                                                        <span className="text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-wider">{tier.req}</span>
                                                    </div>
                                                    <div className="text-right bg-black/40 px-3 py-1 rounded border border-white/10">
                                                        <div className={`font-bold font-orbitron text-lg text-white`}>{tier.share}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 relative z-10">
                                                    {tier.perks.map(perk => (
                                                        <span key={perk} className="text-[10px] font-bold uppercase px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded text-text-secondary flex items-center gap-1">
                                                            <Icons.Check className="w-3 h-3 text-neon-surge" /> {perk}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </RevealItem>
                                    ))}
                                </div>
                            </div>
                        </RevealContainer>

                        <RevealContainer delay={0.4}>
                            <div className="p-8 bg-gradient-to-br from-[#111] to-black border border-purple-500/30 rounded-2xl relative overflow-hidden group">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
                                
                                <h3 className="font-orbitron text-xl text-white uppercase mb-4 flex items-center gap-3 relative z-10">
                                    <Icons.Users className="h-6 w-6 text-purple-400" /> 
                                    THE SIGNAL GRID
                                </h3>
                                <p className="text-sm text-text-secondary font-rajdhani mb-8 relative z-10 leading-relaxed">
                                    Join our dedicated partner channels on Discord. Access 24/7 account support, marketing assets, and seasonal accelerator campaigns.
                                </p>
                                <div className="flex gap-4 relative z-10">
                                    <NeonSpring className="px-6 py-2 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-orbitron uppercase text-xs rounded-sm font-bold">
                                        <span className="flex items-center gap-2"><Icons.Discord className="h-4 w-4" /> Join Discord</span>
                                    </NeonSpring>
                                    <Button variant="ghost" size="sm" className="border border-[#333] text-text-tertiary hover:text-white font-orbitron uppercase text-xs">
                                        View Media Kit
                                    </Button>
                                </div>
                            </div>
                        </RevealContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AffiliatePage;
