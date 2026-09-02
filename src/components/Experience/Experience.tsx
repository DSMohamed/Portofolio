import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const Experience: React.FC = () => {
  const { experience } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#08080a] overflow-hidden">
      {/* Background Accent Line */}
      <div 
        className="absolute top-1/3 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-amber-400" />
            <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
              04 // CAREER & MILESTONES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase max-w-2xl">
            Engineering Journey & Experience.
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Glowing Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#08080a] border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                {idx === 0 && (
                  <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-40 animate-ping" />
                )}
              </div>

              {/* Timeline Content Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0d12] border border-white/[0.07] group-hover:border-amber-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 space-y-4">
                
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.05]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-3 text-sm font-mono text-zinc-400 mt-1">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                        {item.organization}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                        {item.badge}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
