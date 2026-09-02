import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillCategory } from '../../../types/portfolio';

export const SkillsTab: React.FC = () => {
  const { skills, updateSkills } = usePortfolio();
  const [categories, setCategories] = useState<SkillCategory[]>(skills);
  const [saved, setSaved] = useState(false);

  const handleAddSkill = (catIdx: number) => {
    const skillName = prompt('Enter new skill name:');
    if (!skillName || !skillName.trim()) return;

    const updated = [...categories];
    updated[catIdx].skills.push({
      name: skillName.trim(),
      level: 'Advanced',
      hot: false,
    });
    setCategories(updated);
    setSaved(false);
  };

  const handleRemoveSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...categories];
    updated[catIdx].skills.splice(skillIdx, 1);
    setCategories(updated);
    setSaved(false);
  };

  const handleToggleHot = (catIdx: number, skillIdx: number) => {
    const updated = [...categories];
    updated[catIdx].skills[skillIdx].hot = !updated[catIdx].skills[skillIdx].hot;
    setCategories(updated);
    setSaved(false);
  };

  const handleSave = () => {
    updateSkills(categories);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Skills & Competencies Configuration
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Manage frontend, backend, AI, and DevOps technology cards and hot badges.
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
            <span>Save All Skills</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="p-6 rounded-2xl bg-[#0c0c11] border border-white/[0.08] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="font-bold text-white font-display text-base">
                {cat.title}
              </h3>
              <button
                onClick={() => handleAddSkill(catIdx)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-amber-400"
              >
                <Plus className="w-3 h-3" />
                <span>Add Skill</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400 font-light">
              {cat.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {cat.skills.map((s, sIdx) => (
                <div
                  key={sIdx}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border ${
                    s.hot
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                      : 'bg-white/[0.03] border-white/[0.08] text-zinc-300'
                  }`}
                >
                  <button
                    onClick={() => handleToggleHot(catIdx, sIdx)}
                    title={s.hot ? 'Remove Hot highlight' : 'Mark as Hot/Focus skill'}
                    className="focus:outline-none"
                  >
                    <Sparkles className={`w-3 h-3 ${s.hot ? 'text-amber-400' : 'text-zinc-600 hover:text-amber-400'}`} />
                  </button>

                  <span>{s.name}</span>

                  <button
                    onClick={() => handleRemoveSkill(catIdx, sIdx)}
                    className="text-zinc-600 hover:text-red-400 transition-colors ml-1"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
