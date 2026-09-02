import React, { useState } from 'react';
import { Database, Lock, Download, Upload, RotateCcw, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const SettingsTab: React.FC = () => {
  const {
    supabaseConfig,
    saveSupabaseSettings,
    supabaseStatus,
    changeAdminPasscode,
    personalInfo,
    projects,
    experience,
    skills,
    services,
    stats,
    resetToDefaults,
  } = usePortfolio();

  const [url, setUrl] = useState(supabaseConfig.url);
  const [anonKey, setAnonKey] = useState(supabaseConfig.anonKey);
  const [savingSupabase, setSavingSupabase] = useState(false);

  const [newPass, setNewPass] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  const handleSaveSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSupabase(true);
    await saveSupabaseSettings(url, anonKey);
    setSavingSupabase(false);
  };

  const handleSavePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass.trim()) return;
    await changeAdminPasscode(newPass.trim());
    setPassSaved(true);
    setNewPass('');
    setTimeout(() => setPassSaved(false), 3000);
  };

  const handleExportJSON = () => {
    const backupData = {
      personalInfo,
      projects,
      experience,
      skills,
      services,
      stats,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          if (parsed.personalInfo) localStorage.setItem('portfolio_personal_info', JSON.stringify(parsed.personalInfo));
          if (parsed.projects) localStorage.setItem('portfolio_projects', JSON.stringify(parsed.projects));
          if (parsed.experience) localStorage.setItem('portfolio_timeline', JSON.stringify(parsed.experience));
          if (parsed.skills) localStorage.setItem('portfolio_skills', JSON.stringify(parsed.skills));
          if (parsed.services) localStorage.setItem('portfolio_services', JSON.stringify(parsed.services));
          if (parsed.stats) localStorage.setItem('portfolio_stats', JSON.stringify(parsed.stats));
          alert('Backup data successfully restored! Refreshing page...');
          window.location.reload();
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default initial template state?')) {
      resetToDefaults();
      alert('Data reset to defaults.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-4xl">
      
      {/* 1. Supabase Cloud Database Integration */}
      <div className="p-7 rounded-3xl bg-[#0c0c11] border border-white/[0.08] space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Supabase Database Credentials
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Connect your PostgreSQL Supabase cloud instance for automatic sync.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {supabaseStatus.connected ? (
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Offline / Local Only</span>
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-400 uppercase">Supabase Project URL</label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-400 uppercase">Supabase Anon Public API Key</label>
            <input
              type="password"
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] font-mono text-zinc-500">
              Tip: Run the SQL migration script from `supabase/schema.sql` in your Supabase SQL editor.
            </p>
            <button
              type="submit"
              disabled={savingSupabase}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-colors shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
            >
              {savingSupabase ? <span>Testing...</span> : <span>Save & Connect Supabase</span>}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Admin Security & Passcode */}
      <div className="p-7 rounded-3xl bg-[#0c0c11] border border-white/[0.08] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              Admin Portal Passcode (SHA-256 Encrypted)
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Change the security passcode required to unlock this administration panel. Stored only as a cryptographic hash.
            </p>
          </div>
        </div>

        <form onSubmit={handleSavePasscode} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-400 uppercase">New Passcode</label>
            <input
              type="password"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              placeholder="Enter new admin passcode"
              className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/10 focus:border-amber-400 text-white text-sm outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Hash & Update Passcode</span>
            </button>
            {passSaved && (
              <span className="text-xs font-mono text-emerald-400">Passcode hash updated securely!</span>
            )}
          </div>
        </form>
      </div>

      {/* 3. JSON Backup & Restore Tools */}
      <div className="p-7 rounded-3xl bg-[#0c0c11] border border-white/[0.08] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              JSON Data Backup & Restore
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Export all site data into a local `.json` file, or restore from a previous backup.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Full JSON Backup</span>
          </button>

          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Import / Restore JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-400 hover:text-red-300 transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All to Initial Defaults</span>
          </button>
        </div>
      </div>

    </div>
  );
};
