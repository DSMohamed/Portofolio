import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const PersonalInfoTab: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolio();
  const [formData, setFormData] = useState(personalInfo);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            Personal Identity & Bio Configuration
          </h2>
          <p className="text-xs text-zinc-400 font-mono">
            Customize name, hero headlines, bios, contact email, and social profiles.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Changes Saved Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Name / Brand Title
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>

          {/* Eyebrow */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Hero Eyebrow Badge
            </label>
            <input
              type="text"
              name="eyebrow"
              value={formData.eyebrow}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Hero Tagline / Pitch
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
            About Section Narrative Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Availability Status
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Direct Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* LinkedIn URL */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>

          {/* Twitter URL */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              X / Twitter Profile URL
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes Live</span>
        </button>

      </form>
    </div>
  );
};
