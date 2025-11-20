
import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';
import { CyberScene } from '../components/CyberScene';
import { TacticalIcon } from '../components/Effects';
import { CyberCard, RevealContainer, RevealItem, NeonSpring, ParallaxLayer } from '../components/Motion';

// --- MOCK DATA FOR MARQUEE ---
const MARQUEE_ITEMS = ["STAKE", "ROOBET", "DUEL", "ROLLBIT", "BC.GAME", "GAMDOM", "SHUFFLE", "RAZED", "RAINBET", "METAWIN"];

interface HomePageProps {
  onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRegisterClick }) => {
  const context = useContext(AppContext);

  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden selection:bg-[#00FFC0] selection:text-black font-rajdhani relative">
      
      {/* 1. PERSISTENT 3D BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <CyberScene />
      </div>
      
      {/* === HERO SECTION: KINETIC STRIKE === */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-32 overflow-hidden z-10">
        
        <RevealContainer className="relative z-10 max-w-7xl mx-auto text-center">
           
           {/* Status Badge */}
           <RevealItem className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-black/40 border border-[#00FFC0]/30 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,255,192,0.1)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFC0]"></span>
                  </span>
                  <span className="text-xs font-jetbrains-mono text-[#00FFC0] uppercase tracking-[0.3em] font-bold">
                      System Status: Optimal
                  </span>
              </div>
           </RevealItem>

           {/* Main Title - Aggressive Typography */}
           <RevealItem>
              <h1 className="text-6xl sm:text-8xl md:text-[9rem] font-black font-orbitron text-white uppercase tracking-tighter leading-[0.85] mb-12 drop-shadow-2xl mix-blend-difference">
                TACTICAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00FFC0] to-emerald-700 relative z-10 filter drop-shadow-[0_0_30px_rgba(0,255,192,0.3)]">
                    DOMINATION
                </span>
              </h1>
           </RevealItem>

           {/* Description */}
           <RevealItem>
              <p className="text-lg md:text-2xl text-zinc-400 font-medium max-w-3xl mx-auto mb-16 leading-relaxed border-l-2 border-[#00FFC0] pl-6 text-left md:text-center md:border-none md:pl-0">
                  We don't rely on luck. We rely on <span className="text-white font-bold">cryptographic truth</span>. 
                  The world's first <span className="text-[#00FFC0]">ZK-Rollup</span> gambling protocol designed for verifiable wins.
              </p>
           </RevealItem>

           {/* CTAs - NeonSpring */}
           <RevealItem className="flex flex-col sm:flex-row gap-6 justify-center items-center">
               <NeonSpring 
                  onClick={onRegisterClick}
                  className="h-16 px-12 bg-[#00FFC0] rounded-sm border-none skew-x-[-10deg] hover:skew-x-0 transition-transform"
               >
                  <span className="text-black text-xl font-black font-orbitron uppercase tracking-widest block transform skew-x-[10deg] group-hover:skew-x-0">
                      Initialize
                  </span>
               </NeonSpring>

               <NeonSpring 
                  onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-16 px-12 bg-transparent border border-white/20 rounded-sm hover:bg-white/5"
               >
                   <span className="text-white text-xl font-bold font-orbitron uppercase tracking-widest flex items-center gap-3">
                       <Icons.Terminal className="w-5 h-5" /> Intel
                   </span>
               </NeonSpring>
           </RevealItem>

        </RevealContainer>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
      </section>

      {/* === MARQUEE DRIFT === */}
      <section className="border-y border-white/5 bg-black/60 backdrop-blur-sm py-8 relative overflow-hidden z-20">
         <div className="flex w-max animate-slide gap-24 opacity-50 hover:opacity-80 transition-opacity duration-700">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Icons.Zap className="w-6 h-6 text-[#00FFC0] animate-pulse" />
                    <span className="text-4xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-widest select-none">
                        {item}
                    </span>
                </div>
            ))}
         </div>
      </section>

      {/* === THE STACK (CyberCards) === */}
      <section id="stack" className="py-32 px-6 relative z-10">
          <RevealContainer className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                  <RevealItem>
                      <h2 className="text-4xl md:text-6xl font-black font-orbitron text-white uppercase mb-4">
                          Weaponized <span className="text-[#00FFC0]">Tech Stack</span>
                      </h2>
                      <p className="text-zinc-500 font-jetbrains-mono text-xs uppercase tracking-[0.3em]">
                          // INFRASTRUCTURE CLASS: MILITARY GRADE
                      </p>
                  </RevealItem>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: "ZK-Finality", icon: Icons.Lock, desc: "Mathematical immutability. Every wager hashed and proved on Layer 2. The house cannot cheat physics." },
                      { title: "Chaos Oracle", icon: Icons.RefreshCw, desc: "Entropy sourced from decentralized VRF nodes. True randomness, verifiable on-chain. No server seeds." },
                      { title: "MPC Vault", icon: Icons.Shield, desc: "Multi-Party Computation secures the treasury. No single point of failure. Institutional custody standards." }
                  ].map((feature, i) => (
                      <RevealItem key={i} className="h-full">
                          <CyberCard className="h-full bg-[#0c0c0e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col group hover:border-[#00FFC0]/50 hover:bg-black/80 transition-colors">
                               <div className="mb-8 p-4 rounded-xl bg-[#00FFC0]/5 border border-[#00FFC0]/20 w-fit group-hover:bg-[#00FFC0] group-hover:text-black transition-all duration-500 group-hover:scale-110">
                                   <feature.icon className="w-8 h-8" />
                               </div>
                               <h3 className="text-2xl font-black font-orbitron text-white uppercase mb-4 group-hover:text-[#00FFC0] transition-colors tracking-wide">
                                   {feature.title}
                               </h3>
                               <p className="text-zinc-400 leading-relaxed text-sm font-mono border-l-2 border-[#333] pl-4 group-hover:border-[#00FFC0] transition-colors">
                                   {feature.desc}
                               </p>
                               {/* Tech readout decoration */}
                               <div className="mt-auto pt-6 flex justify-between items-end opacity-30 font-mono text-[10px] uppercase">
                                   <span>SYS_ID: 0{i+1}</span>
                                   <span>STATUS: ACTIVE</span>
                               </div>
                          </CyberCard>
                      </RevealItem>
                  ))}
              </div>
          </RevealContainer>
      </section>

      {/* === CORE PHILOSOPHY (Split View) === */}
      <section className="py-32 relative overflow-hidden z-10 bg-black/20">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00FFC0]/5 to-transparent pointer-events-none"></div>

           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <RevealContainer className="order-2 lg:order-1">
                    <RevealItem>
                        <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded text-[10px] font-mono text-zinc-400">
                            PROTOCOL DIRECTIVE
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black font-orbitron text-white uppercase mb-8 leading-[0.9]">
                            Code Is <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC0] to-white">Law.</span>
                        </h2>
                    </RevealItem>
                    <RevealItem>
                        <p className="text-lg text-zinc-400 leading-relaxed mb-10 font-medium max-w-md">
                             Traditional casinos operate in shadow. We operate in the light of the blockchain. 
                             <strong className="text-white"> Transparency is our weapon</strong>. 
                             By anchoring logic to public ledgers, we strip the house of its ability to manipulate.
                        </p>
                    </RevealItem>
                    <RevealItem>
                        <NeonSpring className="px-8 py-4 border border-[#00FFC0] text-[#00FFC0] rounded-sm font-bold font-orbitron uppercase tracking-widest hover:bg-[#00FFC0] hover:text-black">
                            Inspect Contract
                        </NeonSpring>
                    </RevealItem>
                </RevealContainer>

                <RevealContainer className="order-1 lg:order-2">
                    <RevealItem>
                        <CyberCard className="bg-black border border-white/10 rounded-xl p-1 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                            <div className="bg-[#080808] rounded-lg p-8 overflow-hidden relative">
                                {/* Code Visual */}
                                <div className="flex items-center gap-2 mb-6 opacity-50">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="font-jetbrains-mono text-xs md:text-sm text-zinc-500 leading-loose">
                                    <span className="text-purple-400">contract</span> FairPlay <span className="text-blue-400">is</span> Verifiable &#123;<br/>
                                    &nbsp;&nbsp;<span className="text-zinc-600">// Immutable Logic</span><br/>
                                    &nbsp;&nbsp;<span className="text-purple-400">function</span> resolve(bytes32 seed) <span className="text-blue-400">external</span> &#123;<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#00FFC0]">require</span>(proof.verify(seed), "INVALID");<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;payout = calculate(seed);<br/>
                                    &nbsp;&nbsp;&#125;<br/>
                                    &#125;
                                </div>
                                <div className="absolute bottom-4 right-4 text-[#00FFC0] opacity-20">
                                    <Icons.Code className="w-24 h-24" />
                                </div>
                            </div>
                        </CyberCard>
                    </RevealItem>
                </RevealContainer>
           </div>
      </section>

      {/* === INSTITUTIONAL SECURITY === */}
      <section className="py-32 relative z-10">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <RevealContainer>
                   <RevealItem>
                       <div className="relative">
                           <div className="absolute inset-0 bg-[#00FFC0]/20 blur-[100px] rounded-full"></div>
                           <CyberCard className="aspect-square rounded-full bg-[#050505] border border-white/10 flex items-center justify-center p-12 relative z-10 group">
                               <div className="text-center">
                                   <TacticalIcon pulse spinOnHover className="mb-8 inline-block">
                                       <Icons.Shield className="w-24 h-24 text-[#00FFC0]" />
                                   </TacticalIcon>
                                   <h3 className="text-3xl font-black font-orbitron text-white uppercase tracking-widest mb-2">Fortress Mode</h3>
                                   <div className="inline-block px-4 py-1 rounded-full bg-[#00FFC0]/10 border border-[#00FFC0]/30 text-[#00FFC0] font-mono text-xs">
                                       PENETRATION TESTED
                                   </div>
                               </div>
                           </CyberCard>
                       </div>
                   </RevealItem>
               </RevealContainer>
               
               <RevealContainer>
                    <RevealItem>
                        <h2 className="text-4xl md:text-6xl font-black font-orbitron text-white uppercase mb-12 leading-tight">
                            Institutional <br/> Protection
                        </h2>
                        <div className="space-y-10">
                             <div className="group pl-8 border-l-4 border-white/5 hover:border-[#00FFC0] transition-colors duration-300">
                                 <h4 className="text-2xl font-bold text-white font-orbitron uppercase mb-2 flex items-center gap-4">
                                     <Icons.Cpu className="w-6 h-6 text-[#00FFC0]" /> Explainable AI (XAI)
                                 </h4>
                                 <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                                     Automated risk intervention algorithms protect your bankroll from tilt. Decisions are transparent, auditable, and instant.
                                 </p>
                             </div>
                             <div className="group pl-8 border-l-4 border-white/5 hover:border-[#00FFC0] transition-colors duration-300">
                                 <h4 className="text-2xl font-bold text-white font-orbitron uppercase mb-2 flex items-center gap-4">
                                     <Icons.FileCheck className="w-6 h-6 text-[#00FFC0]" /> VASP Compliance
                                 </h4>
                                 <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                                     We operate under strict AML/CTF frameworks. Verified operators, sanitized liquidity pools, and zero tolerance for illicit actors.
                                 </p>
                             </div>
                        </div>
                    </RevealItem>
               </RevealContainer>
           </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-40 bg-black relative overflow-hidden text-center z-10 border-t border-white/10">
          {/* Grid Floor */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,#222_1px,transparent_1px),linear-gradient(#222_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
          
          <RevealContainer className="relative z-10 max-w-5xl mx-auto px-4">
              <RevealItem>
                  <h2 className="text-6xl md:text-9xl font-black font-orbitron text-white uppercase tracking-tighter leading-[0.85] mb-12">
                      Ready To <br/><span className="text-[#00FFC0] text-glow">Dominate?</span>
                  </h2>
              </RevealItem>
              
              <RevealItem className="flex justify-center">
                  <NeonSpring 
                    onClick={onRegisterClick}
                    className="h-24 px-20 bg-[#00FFC0] rounded-sm shadow-[0_0_60px_rgba(0,255,192,0.4)] hover:shadow-[0_0_100px_rgba(0,255,192,0.6)] hover:scale-105 transition-all"
                  >
                      <span className="text-3xl font-black text-black font-orbitron uppercase tracking-widest">Enter The Grid</span>
                  </NeonSpring>
              </RevealItem>

              <RevealItem className="mt-20 flex flex-wrap justify-center gap-12 text-zinc-500 font-jetbrains-mono text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-3"><Icons.CheckCircle className="w-4 h-4 text-[#00FFC0]" /> Web3 Native</span>
                  <span className="flex items-center gap-3"><Icons.CheckCircle className="w-4 h-4 text-[#00FFC0]" /> No KYC (Crypto)</span>
                  <span className="flex items-center gap-3"><Icons.CheckCircle className="w-4 h-4 text-[#00FFC0]" /> Instant Payouts</span>
              </RevealItem>
          </RevealContainer>
      </section>

    </div>
  );
};

export default HomePage;
