import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { Project } from '../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0f0f14] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/90 text-zinc-200">
        
        {/* Header Image with close button */}
        <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-black/30 to-black/40" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/10 text-zinc-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-8 right-4">
            <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase mb-1.5 sm:mb-2">
              {project.categoryLabel}
            </span>
            <h3 id="modal-title" className="text-xl sm:text-3xl font-bold font-display text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <p className="text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Key Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-lg sm:text-xl font-bold font-display text-amber-400">{m.value}</div>
                  <div className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Architectural Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              <h4 className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-400 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Key Engineering Highlights</span>
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2 pt-1 sm:pt-2">
            <h4 className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-200 text-xs sm:text-sm font-medium transition-colors active:scale-95"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-center text-[11px] font-mono text-zinc-400 hover:text-white transition-colors py-1"
            >
              [ Close Details ]
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
