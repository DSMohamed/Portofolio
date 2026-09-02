import React from 'react';
import { Sparkles, ExternalLink, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const FeaturedProject: React.FC = () => {
  const { projects } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();

  const featured = projects.find(p => p.featured) || projects[0];
  if (!featured) return null;

  return (
    <section className="relative py-20 bg-[#08080a] overflow-hidden">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Editorial Section Ribbon */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-12">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>IMMERSIVE SHOWCASE // FEATURED LAB</span>
          </div>
          <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
            FEATURED BUILD
          </span>
        </div>

        {/* Cinematic Featured Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#111117] via-[#0d0d12] to-[#07070a] border border-white/[0.1] hover:border-amber-400/40 transition-all duration-700 overflow-hidden shadow-2xl shadow-black/90 group">
          
          {/* Subtle Ambient Light Cone */}
          <div 
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all duration-700" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-14">
            
            {/* Left Narrative & Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 z-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-mono text-xs tracking-wider uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>{featured.categoryLabel}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-tight">
                {featured.title}
              </h3>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {featured.longDescription || featured.description}
              </p>

              {/* Highlights Checklist */}
              {featured.highlights && featured.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-zinc-300">
                  {featured.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.05]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tags.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-300 shadow-lg shadow-amber-400/20 active:scale-95"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-zinc-200 text-sm font-medium transition-all duration-300 active:scale-95"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Source</span>
                  </a>
                )}
              </div>

            </div>

            {/* Right Interactive Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group/img">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />

                {/* HUD Overlay On Top of Preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 tracking-wider">
                    <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-amber-300">
                      LIVE SPECIFICATION
                    </span>
                    <span>ACTIVE</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono text-white flex items-center justify-between">
                      <span>STATUS</span>
                      <span className="text-emerald-400">OPTIMAL</span>
                    </div>
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-4/5 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Corner accent glyph */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
