import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { StatItem } from '../../../types/portfolio';

export const StatsTab: React.FC = () => {
  const { stats, updateStats } = usePortfolio();
  const [items, setItems] = useState<StatItem[]>(stats);
  const [saved, setSaved] = useState(false);

  const handleChange = (idx: number, field: keyof StatItem, val: string) => {
    const updated = [...items];
    updated[idx][field] = val;
    setItems(updated);
    setSaved(false);
  };

  const handleSave = () => {
    updateStats(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Highlight Statistics Configuration
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Customize the 4 prominent stat cards displayed in the About section.
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
            <span>Save Stats</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#0c0c11] border border-white/[0.08] space-y-3"
          >
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400 uppercase">Value / Number</label>
              <input
                type="text"
                value={stat.value}
                onChange={e => handleChange(idx, 'value', e.target.value)}
                placeholder="20+"
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-amber-400 text-2xl font-bold font-display outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400 uppercase">Label Title</label>
              <input
                type="text"
                value={stat.label}
                onChange={e => handleChange(idx, 'label', e.target.value)}
                placeholder="Projects Shipped"
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-xs font-mono font-semibold uppercase outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400 uppercase">Description</label>
              <input
                type="text"
                value={stat.description}
                onChange={e => handleChange(idx, 'description', e.target.value)}
                placeholder="Production web applications & AI models"
                className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-zinc-400 text-xs font-light outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
