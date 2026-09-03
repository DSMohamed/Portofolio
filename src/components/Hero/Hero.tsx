import React from 'react';
import { ArrowDown, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { LiquidReveal } from './LiquidReveal';
import { usePortfolio } from '../../context/PortfolioContext';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { personalInfo } = usePortfolio();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[650px] overflow-hidden bg-[#08080a] flex items-end justify-start"
      aria-label="Hero Section"
    >
      {/* 1. Liquid Reveal Background Canvas */}
      <div className="absolute inset-0 z-0">
        <LiquidReveal baseImageSrc="/base.png" chromeImageSrc="/chrome.png" />
      </div>

      {/* 2. Ambient Grid & Overlay Pattern */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        aria-hidden="true" 
      />

      {/* 3. Hero Typography & Content Overlay in the Bottom-Left */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24 lg:pb-24 pointer-events-none">
        <div className="max-w-2xl text-left">
          
          {/* Eyebrow badge with status indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md mb-3 sm:mb-4 pointer-events-auto shadow-lg shadow-black/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-300 uppercase">
              {personalInfo.eyebrow}
            </span>
          </div>

          {/* Large Name / Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase leading-[0.98] mb-3 sm:mb-4 drop-shadow-2xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
              {personalInfo.name}
            </span>
          </h1>

          {/* Professional Description */}
          <p className="text-xs sm:text-base lg:text-lg font-light text-zinc-300 leading-relaxed max-w-xl mb-5 sm:mb-6 drop-shadow-md">
            {personalInfo.tagline}
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pointer-events-auto">
            <button
              onClick={() => scrollToSection('work')}
              className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-medium text-xs sm:text-sm text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300 shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-medium text-xs sm:text-sm text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. Bottom HUD Telemetry Status Bar */}
      <div className="absolute bottom-3 sm:bottom-6 inset-x-0 z-20 px-4 sm:px-8 lg:px-16 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 tracking-wider">
          
          <div className="hidden sm:flex items-center gap-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>LOC: {personalInfo.location}</span>
            </span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SYSTEM: ONLINE (v2.6)</span>
            </span>
          </div>

          <div 
            onClick={() => scrollToSection('about')}
            className="pointer-events-auto cursor-pointer ml-auto flex items-center gap-1.5 sm:gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-zinc-400 hover:text-zinc-200 transition-all duration-200 shadow-lg"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
          </div>

        </div>
      </div>
    </section>
  );
};
