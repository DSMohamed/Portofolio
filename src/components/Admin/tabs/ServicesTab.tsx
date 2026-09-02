import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ServiceItem } from '../../../types/portfolio';

export const ServicesTab: React.FC = () => {
  const { services, updateServices } = usePortfolio();
  const [items, setItems] = useState<ServiceItem[]>(services);
  const [saved, setSaved] = useState(false);

  const handleTextChange = (idx: number, field: keyof ServiceItem, val: string) => {
    const updated = [...items];
    (updated[idx] as unknown as Record<string, unknown>)[field] = val;
    setItems(updated);
    setSaved(false);
  };

  const handleDeliverablesChange = (idx: number, text: string) => {
    const updated = [...items];
    updated[idx].deliverables = text.split('\n').filter(Boolean);
    setItems(updated);
    setSaved(false);
  };

  const handleSave = () => {
    updateServices(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Capabilities & Services Configuration
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Customize the 4 core service cards, taglines, and deliverable checklists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all shadow-lg shadow-amber-400/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Services</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((service, idx) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-[#0c0c11] border border-white/[0.08] space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">Service Title</label>
              <input
                type="text"
                value={service.title}
                onChange={e => handleTextChange(idx, 'title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none font-bold font-display"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">Tagline</label>
              <input
                type="text"
                value={service.tagline}
                onChange={e => handleTextChange(idx, 'tagline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-amber-300 text-xs font-mono outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">Description</label>
              <textarea
                rows={2}
                value={service.description}
                onChange={e => handleTextChange(idx, 'description', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-zinc-300 text-xs font-sans outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase">Deliverables (One per line)</label>
              <textarea
                rows={3}
                value={service.deliverables.join('\n')}
                onChange={e => handleDeliverablesChange(idx, e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-zinc-300 text-xs font-mono outline-none resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
