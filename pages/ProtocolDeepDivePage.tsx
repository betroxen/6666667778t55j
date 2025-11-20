
import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProtocolDeepDivePage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([
    "[INIT] PROTOCOL HANDSHAKE ESTABLISHED...",
    "[SECURE] CONNECTION ENCRYPTED (AES-256)",
    "[SYNC] FETCHING L2 BATCH HEADERS..."
  ]);

  // --- KINETIC ENTRANCE & NODE ROLLOUT ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Stagger
      gsap.from(".hero-char", {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // 2. Node Rollout Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".architecture-grid",
          start: "top 70%",
        }
      });

      tl.from(".node-card", {
        y: 50,
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out"
      })
      .from(".connector-line", {
        scaleX: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2,
        transformOrigin: "left center"
      }, "-=1")
      .to(".node-icon", {
        color: "#00FFC0",
        textShadow: "0 0 20px #00FFC0",
        stagger: 0.2,
        duration: 0.2
      }, "-=0.8");

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // --- TERMINAL LIVE FIRE ---
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        "[VRF] ORACLE REQUEST: SENT (ID: 0x4a...91)",
        "[VRF] ENTROPY RECEIVED: VERIFIED",
        "[L2] ZK-PROOF GENERATED: VALID",
        "[L2] BATCH COMMITTED: BLOCK 1948210",
        "[AUDIT] RTP CHECK: PASS (99.02%)",
        "[NET] LATENCY: 12ms // OPTIMAL"
      ];
      const newLog = actions[Math.floor(Math.random() * actions.length)];
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={mainRef} className="animate-fadeIn min-h-screen bg-[#050505] text-white font-rajdhani relative overflow-hidden">
      
      {/* Deep Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-surge/5 blur-[150px] rounded-full mix-blend-screen animate-pulse-glow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* HERO */}
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-neon-surge/30 rounded-full bg-neon-surge/5 mb-8 backdrop-blur-sm hero-char">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-surge opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-surge"></span>
            </span>
            <span className="text-xs font-orbitron text-neon-surge uppercase tracking-[0.2em] font-bold">System Architecture v4.0</span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            <div className="hero-char inline-block">THE</div> <div className="hero-char inline-block">TRUSTLESS</div> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-surge to-emerald-400 text-glow hero-char inline-block">ENGINE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto hero-char">
            Legacy "Provably Fair" is a half-measure. We replaced server seeds with <strong className="text-white">Verifiable Random Functions (VRF)</strong> and anchored every outcome to a <strong className="text-white">ZK-Rollup</strong>. 
          </p>
        </header>

        {/* ARCHITECTURE VISUALIZATION (NODE ROLLOUT) */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8 hero-char">
                <Icons.Cpu className="h-6 w-6 text-neon-surge" />
                <h2 className="font-orbitron text-2xl font-bold text-white uppercase tracking-widest">Transaction Lifecycle</h2>
            </div>
            
            <div className="relative bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden architecture-grid shadow-2xl">
                
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative z-10 items-center">
                    
                    {/* Node 1 */}
                    <div className="flex flex-col items-center text-center group node-card col-span-1">
                        <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-neon-surge transition-all duration-500 relative z-10 shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                            <Icons.User className="h-8 w-8 text-text-secondary node-icon transition-colors" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">1. User Signal</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Signed Request</p>
                    </div>

                    {/* Connector */}
                    <div className="hidden md:flex items-center justify-center col-span-1 connector-line">
                        <div className="w-full h-0.5 bg-gradient-to-r from-[#333] to-neon-surge relative">
                            <div className="absolute right-0 -top-1 w-2 h-2 bg-neon-surge rounded-full animate-ping"></div>
                        </div>
                    </div>

                     {/* Node 2 */}
                    <div className="flex flex-col items-center text-center group node-card col-span-1">
                        <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-neon-surge transition-all duration-500 relative z-10 shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                            <Icons.FileText className="h-8 w-8 text-text-secondary node-icon transition-colors" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">2. Contract</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Logic Execution</p>
                    </div>

                     {/* Connector */}
                     <div className="hidden md:flex items-center justify-center col-span-1 connector-line">
                        <div className="w-full h-0.5 bg-gradient-to-r from-[#333] to-neon-surge"></div>
                    </div>

                    {/* Node 3 */}
                     <div className="flex flex-col items-center text-center group node-card col-span-1">
                        <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-neon-surge transition-all duration-500 shadow-lg relative z-10 group-hover:shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                            <Icons.RefreshCw className="h-8 w-8 text-text-secondary node-icon animate-spin-slow transition-colors" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">3. VRF Oracle</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">True Entropy</p>
                    </div>

                     {/* Connector */}
                     <div className="hidden md:flex items-center justify-center col-span-1 connector-line">
                        <div className="w-full h-0.5 bg-gradient-to-r from-[#333] to-neon-surge"></div>
                    </div>

                    {/* Node 4 */}
                    <div className="flex flex-col items-center text-center group node-card col-span-1">
                        <div className="w-20 h-20 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-neon-surge transition-all duration-500 relative z-10 shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                            <Icons.Database className="h-8 w-8 text-text-secondary node-icon transition-colors" />
                        </div>
                        <h3 className="font-orbitron font-bold text-sm text-white uppercase mb-1">4. L2 Finality</h3>
                        <p className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase">Immutable Proof</p>
                    </div>
                </div>
            </div>
        </section>

        {/* COMPARATIVE ASSAULT */}
        <section className="mb-24">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Legacy Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2 hero-char">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                            <Icons.AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold text-text-secondary uppercase">The Legacy Standard</h2>
                    </div>
                    <p className="text-text-tertiary text-sm leading-relaxed border-l-2 border-[#333] pl-4">
                        Used by 99% of crypto casinos. It relies on a "Server Seed" generated by the house. While auditable *post-facto*, it allows for "God Mode" visibility.
                    </p>

                    <div className="space-y-4">
                        <Card className="p-4 bg-[#0c0c0e] border-[#333] opacity-80 hover:opacity-100 transition-opacity duration-300 hover:border-yellow-500/30 group">
                            <h4 className="font-bold text-white text-sm uppercase mb-2 font-orbitron group-hover:text-yellow-500 transition-colors">Server Seed Vulnerability</h4>
                            <p className="text-xs text-text-tertiary">The operator knows the result before you bet. They promise not to change it, but the information asymmetry exists.</p>
                        </Card>
                        <Card className="p-4 bg-[#0c0c0e] border-[#333] opacity-80 hover:opacity-100 transition-opacity duration-300 hover:border-yellow-500/30 group">
                            <h4 className="font-bold text-white text-sm uppercase mb-2 font-orbitron group-hover:text-yellow-500 transition-colors">Single-Round Audit</h4>
                            <p className="text-xs text-text-tertiary">Verifying one round doesn't prove the system isn't rigging specific high-value bets or altering RTP over millions of spins.</p>
                        </Card>
                    </div>
                </div>

                 {/* ZapWay Column */}
                 <div className="space-y-6 relative">
                    <div className="absolute -inset-4 bg-neon-surge/5 rounded-3xl blur-xl pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10 hero-char">
                        <div className="p-2 bg-neon-surge/10 rounded-lg border border-neon-surge/30">
                            <Icons.Zap className="h-5 w-5 text-neon-surge" />
                        </div>
                        <h2 className="font-orbitron text-2xl font-bold text-white uppercase text-glow">The ZapWay Protocol</h2>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-neon-surge pl-4 relative z-10">
                        A decentralized architecture where the house cannot know or influence the outcome. Randomness is generated externally via VRF.
                    </p>

                    <div className="space-y-4 relative z-10">
                        <Card className="p-5 bg-[#111] border-neon-surge/30 shadow-[0_0_30px_rgba(0,255,192,0.1)] hover:border-neon-surge transition-all duration-300 group hover:-translate-y-1">
                            <h4 className="font-bold text-neon-surge text-sm uppercase mb-2 font-orbitron flex items-center gap-2">
                                <Icons.Lock className="h-3 w-3 group-hover:animate-pulse" /> VRF Autonomy
                            </h4>
                            <p className="text-xs text-text-secondary">Entropy is sourced from a verifiable, tamper-proof oracle. Neither the player nor the house can predict the result.</p>
                        </Card>
                         <Card className="p-5 bg-[#111] border-neon-surge/30 shadow-[0_0_30px_rgba(0,255,192,0.1)] hover:border-neon-surge transition-all duration-300 group hover:-translate-y-1">
                            <h4 className="font-bold text-neon-surge text-sm uppercase mb-2 font-orbitron flex items-center gap-2">
                                <Icons.Database className="h-3 w-3 group-hover:animate-pulse" /> Immutable History
                            </h4>
                            <p className="text-xs text-text-secondary">Every bet is hashed and batched into a ZK-Proof. Once submitted to L1, the history is mathematically impossible to alter.</p>
                        </Card>
                    </div>
                </div>

             </div>
        </section>

        {/* TERMINAL LIVE FIRE */}
        <section className="max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-4 px-2 hero-char">
                <h2 className="font-orbitron text-lg font-bold text-white uppercase tracking-wider flex items-center gap-3">
                    <Icons.Terminal className="h-5 w-5 text-neon-surge animate-pulse" /> Live Verification Log
                </h2>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>

             <div className="bg-[#08080a] rounded-lg border border-[#333] p-6 font-jetbrains-mono text-xs overflow-hidden shadow-2xl relative h-80 group hover:border-neon-surge/30 transition-colors">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,192,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                 
                 <div className="space-y-2 relative z-10 h-full overflow-y-hidden flex flex-col justify-end">
                     {logs.map((log, i) => (
                         <div key={i} className={`flex gap-4 transition-all duration-300 ${i === 0 ? 'text-white scale-100 opacity-100' : 'text-text-tertiary scale-95 opacity-60'}`}>
                             <span className="text-neon-surge w-20 shrink-0">{new Date().toLocaleTimeString()}</span>
                             <span className={log.includes('ERROR') ? 'text-red-500' : log.includes('VALID') || log.includes('OPTIMAL') ? 'text-green-400' : 'text-white'}>{log}</span>
                         </div>
                     ))}
                      <div className="animate-pulse text-neon-surge mt-2">_</div>
                 </div>
             </div>
             
             <div className="mt-8 text-center hero-char">
                 <Button className="bg-white text-black font-orbitron font-black uppercase tracking-widest px-8 hover:scale-105 shadow-neon-glow-md hover:bg-neon-surge transition-all">
                     View Contract Source
                 </Button>
             </div>
        </section>

      </div>
    </div>
  );
};

export default ProtocolDeepDivePage;
