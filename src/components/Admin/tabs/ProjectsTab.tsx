import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, FolderGit2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Project, ProjectCategory } from '../../../types/portfolio';

export const ProjectsTab: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      category: 'ai',
      categoryLabel: 'AI & Agents',
      tagline: '',
      description: '',
      longDescription: '',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: '',
      liveUrl: '',
      featured: false,
      highlights: [],
      metrics: [],
    };
    setEditingProject(newProj);
    setIsNew(true);
  };

  const handleEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsNew(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;

    if (isNew) {
      addProject(editingProject);
    } else {
      updateProject(editingProject);
    }
    setEditingProject(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-display text-white">
            Projects & Work Manager
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">
            Add, update, or remove portfolio projects, categories, image links, and specs.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-lg shadow-amber-400/20 active:scale-95 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {projects.map(p => (
          <div
            key={p.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#0c0c11] border border-white/[0.08] flex flex-col justify-between space-y-3 sm:space-y-4 group hover:border-amber-400/30 transition-all"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10 shrink-0 bg-black"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20 uppercase">
                    {p.categoryLabel}
                  </span>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      FEATURED
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white font-display text-sm sm:text-base truncate">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 font-light">
                  {p.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-xs font-mono">
              <div className="flex flex-wrap gap-1">
                {p.tags.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 text-[9px] sm:text-[10px]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0e0e14] border border-white/10 shadow-2xl text-zinc-200">
            
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  {isNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5 sm:space-y-4 text-xs font-mono">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                  />
                </div>

                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Category *</label>
                  <select
                    value={editingProject.category}
                    onChange={e => {
                      const cat = e.target.value as ProjectCategory;
                      const labels: Record<string, string> = {
                        ai: 'AI & Agents',
                        fullstack: 'Full Stack',
                        creative: 'Creative Web',
                      };
                      setEditingProject({
                        ...editingProject,
                        category: cat,
                        categoryLabel: labels[cat] || 'Project',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                  >
                    <option value="ai">AI & Agents</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="creative">Creative Web</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  placeholder="e.g. Real-time GPU particle dynamics"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Short Description (Card) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none resize-none font-sans"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Long Architectural Description (Modal)</label>
                <textarea
                  rows={3}
                  value={editingProject.longDescription || ''}
                  onChange={e => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none resize-none font-sans"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingProject.image}
                  onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Tech Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, WebGL, Python"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                  />
                </div>

                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] sm:text-xs">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-base sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={editingProject.featured || false}
                  onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-[#14141c] border-white/20"
                />
                <label htmlFor="featuredCheck" className="text-zinc-300 cursor-pointer text-xs">
                  Mark as Featured Editorial Project
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
                >
                  {isNew ? 'Create Project' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
