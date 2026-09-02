import React, { useState } from 'react';
import { Layout, Server, Cpu, Terminal, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Layout,
  Server,
  Cpu,
  Terminal,
};

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const { elementRef, isVisible } = useIntersectionObserver();
  const [, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-28 sm:py-36 bg-[#08080a]">
      {/* Background Subtle Gradient */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
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
              03 // TECHNICAL MASTERY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white uppercase max-w-2xl">
            Modern Tech Stack & Core Competencies.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mt-4">
            Curated toolkit refined across production web applications, autonomous agentic systems, and real-time interactive interfaces.
          </p>
        </div>

        {/* 4-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((category, catIdx) => {
            const IconComponent = ICONS_MAP[category.iconName] || Terminal;

            return (
              <div
                key={catIdx}
                className="group relative p-7 sm:p-9 rounded-2xl bg-[#0c0c11] border border-white/[0.07] hover:border-amber-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      0{catIdx + 1}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skills Interactive Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill, sIdx) => {
                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`group/skill relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-default ${
                          skill.hot
                            ? 'bg-amber-400/[0.07] border border-amber-400/30 text-amber-200 hover:bg-amber-400/15'
                            : 'bg-white/[0.03] border border-white/[0.07] text-zinc-300 hover:bg-white/[0.08] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {skill.hot && (
                          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                        )}
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-zinc-400 opacity-60 group-hover/skill:opacity-100">
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
