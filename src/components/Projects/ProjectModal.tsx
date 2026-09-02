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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0f0f14] border border-white/10 rounded-2xl shadow-2xl shadow-black/90 text-zinc-200">
        
        {/* Header Image with close button */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-black/40" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-zinc-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 sm:left-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase mb-2">
              {project.categoryLabel}
            </span>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Key Metrics if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xl font-bold font-display text-amber-400">{m.value}</div>
                  <div className="text-xs font-mono text-zinc-400 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Architectural Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Engineering Highlights</span>
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2 pt-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-medium text-sm transition-colors shadow-lg shadow-amber-400/20"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-200 text-sm font-medium transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              [ Press ESC or Click Backdrop to Close ]
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
