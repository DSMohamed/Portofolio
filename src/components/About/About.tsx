import React from 'react';
import { Cpu, Terminal, Sparkles, Shield, Layers, Code2, Globe, Compass } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const About: React.FC = () => {
  const { personalInfo, stats } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="about" className="relative py-20 sm:py-32 bg-[#08080a] overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      
      <div 
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[1px] bg-amber-400" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-amber-400 uppercase">
              01 // PROFILE & BACKGROUND
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white uppercase max-w-2xl leading-tight">
            Engineering at the edge of design and intelligence.
          </h2>
        </div>

        {/* Two-Column Grid: Narrative & Holographic Cyber HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-14 sm:mb-20">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="text-sm sm:text-lg text-zinc-400 leading-relaxed font-light">
              I specialize in bridging sophisticated frontend aesthetics with cutting-edge backend systems and autonomous AI agent pipelines. Every project is crafted with deep reverence for 60fps responsiveness, semantic accessibility, and clean architectural foundations.
            </p>

            {/* Specialization Pills */}
            <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-2.5">
              {[
                { label: 'Creative Web & Shaders', icon: Sparkles },
                { label: 'Autonomous AI Agents', icon: Cpu },
                { label: 'Full-Stack Architecture', icon: Layers },
                { label: 'High-Performance APIs', icon: Terminal },
                { label: 'Design Systems', icon: Code2 },
                { label: 'Distributed Pipelines', icon: Globe },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-amber-400/[0.04] transition-all duration-200 text-[11px] sm:text-xs font-mono text-zinc-300"
                  >
                    <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Holographic Cyber HUD Element */}
          <div className="lg:col-span-5">
            <div className="relative group p-5 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131318] to-[#0a0a0e] border border-white/10 hover:border-amber-500/30 transition-all duration-500 shadow-2xl shadow-black/80 overflow-hidden">
              
              {/* Scanline & ambient overlay */}
              <div 
                className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] opacity-30 pointer-events-none" 
                aria-hidden="true" 
              />
              <div 
                className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" 
                aria-hidden="true" 
              />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-white/[0.08] font-mono text-[11px] sm:text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 shrink-0" />
                  <span className="text-white font-semibold truncate">NEURAL CORE ARCHITECTURE</span>
                </div>
                <span className="text-emerald-400 flex items-center gap-1.5 shrink-0 text-[10px] sm:text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* HUD Telemetry Visual */}
              <div className="space-y-3.5 sm:space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center text-zinc-400 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>SPATIAL COMPUTING</span>
                  </span>
                  <span className="text-zinc-200">GLSL / THREE.JS</span>
                </div>
                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[94%] rounded-full" />
                </div>

                <div className="flex justify-between items-center text-zinc-400 pt-1 sm:pt-2 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>VECTOR & LLM PIPELINE</span>
                  </span>
                  <span className="text-zinc-200">RAG / AGENTS</span>
                </div>
                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[96%] rounded-full" />
                </div>

                <div className="flex justify-between items-center text-zinc-400 pt-1 sm:pt-2 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>FRONTEND RENDERING</span>
                  </span>
                  <span className="text-zinc-200">60 FPS / ZERO-JANK</span>
                </div>
                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[99%] rounded-full" />
                </div>
              </div>

              {/* HUD Footer Status */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500">
                <span className="truncate mr-2">ID: {personalInfo.name}</span>
                <span className="text-amber-400/80 shrink-0">LATENCY: &lt;16.6ms</span>
              </div>
            </div>
          </div>

        </div>

        {/* Statistics / Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group p-4 sm:p-7 lg:p-8 rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white group-hover:text-amber-400 transition-colors mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-300 uppercase mb-1 sm:mb-2">
                  {stat.label}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-light leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
