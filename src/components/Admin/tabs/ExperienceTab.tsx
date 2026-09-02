import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { TimelineItem } from '../../../types/portfolio';

export const ExperienceTab: React.FC = () => {
  const { experience, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleCreateNew = () => {
    const newItem: TimelineItem = {
      id: `exp-${Date.now()}`,
      role: '',
      organization: '',
      period: '2025 — PRESENT',
      location: 'Remote',
      description: '',
      technologies: ['React', 'TypeScript', 'Python'],
      badge: 'Current Focus',
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleEdit = (item: TimelineItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleDelete = (id: string, role: string) => {
    if (window.confirm(`Are you sure you want to delete "${role}"?`)) {
      deleteExperience(id);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.role.trim()) return;

    if (isNew) {
      addExperience(editingItem);
    } else {
      updateExperience(editingItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Experience & Milestones Manager
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Manage your career timeline, engineering roles, companies, tech stacks, and highlights.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-lg shadow-amber-400/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#0c0c11] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-400/30 transition-all group"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-bold text-white font-display text-lg">
                  {item.role}
                </h3>
                <span className="text-zinc-500 font-mono text-xs">@</span>
                <span className="text-amber-400 font-mono text-sm font-semibold">
                  {item.organization}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20 uppercase">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {item.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {item.location}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleEdit(item)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                title="Edit Entry"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.role)}
                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                title="Delete Entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#0e0e14] border border-white/10 shadow-2xl text-zinc-200">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-display text-white">
                  {isNew ? 'Add Experience Milestone' : `Edit: ${editingItem.role}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs font-mono">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={e => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="Senior Creative Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase">Organization / Company *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.organization}
                    onChange={e => setEditingItem({ ...editingItem, organization: e.target.value })}
                    placeholder="Autonomous Tech Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase">Period / Dates *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.period}
                    onChange={e => setEditingItem({ ...editingItem, period: e.target.value })}
                    placeholder="2024 — PRESENT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase">Location *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.location}
                    onChange={e => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Cairo / Remote"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Badge / Highlight (Optional)</label>
                <input
                  type="text"
                  value={editingItem.badge || ''}
                  onChange={e => setEditingItem({ ...editingItem, badge: e.target.value || undefined })}
                  placeholder="e.g. Current Focus or Foundation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Description / Deliverables *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Led frontend architecture and autonomous AI integration..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none resize-none font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Technologies Utilized (Comma separated)</label>
                <input
                  type="text"
                  value={editingItem.technologies.join(', ')}
                  onChange={e =>
                    setEditingItem({
                      ...editingItem,
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, FastAPI, WebSockets"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold transition-colors shadow-lg shadow-amber-400/20"
                >
                  {isNew ? 'Create Milestone' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
