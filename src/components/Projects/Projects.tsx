import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProjectCategory } from '../../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'creative', label: 'Creative Web' },
];

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="work" className="relative py-20 sm:py-32 bg-[#08080a]">
      {/* Background radial accent */}
      <div 
        className="absolute top-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1px] bg-amber-400" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-amber-400 uppercase">
                02 // SELECTED WORK
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white uppercase max-w-xl leading-tight">
              Featured Systems & Explorations.
            </h2>
          </div>

          {/* Category Filter Tabs (Horizontal scroll on mobile with hidden scrollbar) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#121218] p-1.5 rounded-xl border border-white/[0.08] max-w-full overflow-x-auto no-scrollbar shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={p => setActiveProject(p)}
            />
          ))}
        </div>

        {/* Project Details Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
};
