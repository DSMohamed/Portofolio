import React from 'react';
import { Globe, Cpu, Sparkles, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Cpu,
  Sparkles,
  Zap,
};

export const Services: React.FC = () => {
  const { services } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-20 sm:py-32 bg-[#08080a]">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
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
              05 // CAPABILITIES & SERVICES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white uppercase max-w-2xl leading-tight">
            What I Engineer & Deliver.
          </h2>
          <p className="text-sm sm:text-lg text-zinc-400 font-light max-w-2xl mt-3 sm:mt-4">
            End-to-end execution from creative conception to production deployment with relentless attention to speed, stability, and polish.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = ICONS_MAP[service.icon] || Sparkles;

            return (
              <div
                key={service.id}
                className="group relative p-6 sm:p-9 lg:p-10 rounded-2xl bg-[#0c0c11] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-white/[0.06]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-1.5 sm:mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-amber-400/90 mb-3 sm:mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-base text-zinc-400 font-light leading-relaxed mb-6 sm:mb-8">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Deliverables Checklist */}
                  <div className="space-y-2 sm:space-y-2.5 pt-4 border-t border-white/[0.05] mb-5 sm:mb-6">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400/80 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-400 group-hover:text-amber-400 transition-colors py-1"
                  >
                    <span>Discuss A Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
