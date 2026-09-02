import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0c0c10] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121218]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent opacity-80" />
        
        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 uppercase">
            {project.categoryLabel}
          </span>
        </div>

        {/* Hover Quick Action Indicator */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="pt-2 border-t border-white/[0.05]">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 text-[11px] font-mono text-zinc-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Links / Action Bar */}
          <div className="flex items-center justify-between pt-1 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500 group-hover:text-amber-400/90 transition-colors flex items-center gap-1">
              <span>View Specs & Architecture</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>

            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub Repository`}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Live Preview`}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
