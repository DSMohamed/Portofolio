import React from 'react';
import { Database, FolderGit2, Briefcase, Sparkles, MessageSquare, RefreshCw, UploadCloud, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const OverviewTab: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const {
    projects,
    experience,
    skills,
    messages,
    supabaseStatus,
    syncFromSupabase,
    pushAllToSupabase,
    isSyncing,
    setIsAdminOpen,
  } = usePortfolio();

  const handlePush = async () => {
    const res = await pushAllToSupabase();
    alert(res.message);
  };

  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner / Welcome */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#12121a] to-[#0c0c11] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold font-display text-white mb-1">
            System Telemetry & CMS Overview
          </h2>
          <p className="text-sm text-zinc-400 font-light">
            Manage your dynamic portfolio content, experience history, projects, and Supabase cloud synchronization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => syncFromSupabase()}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Fetch from Supabase</span>
          </button>

          <button
            onClick={handlePush}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-colors shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Push All to Supabase</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className="p-5 rounded-xl bg-[#0e0e14] border border-white/[0.08] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-400">SUPABASE DATABASE STATUS</div>
            <div className="text-sm font-medium text-white flex items-center gap-2">
              {supabaseStatus.connected ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{supabaseStatus.message}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">{supabaseStatus.message} (Using local cache)</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('settings')}
          className="text-xs font-mono text-amber-400 hover:underline"
        >
          Configure Credentials →
        </button>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div 
          onClick={() => onNavigateTab('projects')}
          className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/40 cursor-pointer transition-all hover:-translate-y-0.5 space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Selected Projects</span>
            <FolderGit2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
            {projects.length}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">Click to manage projects & specs →</div>
        </div>

        <div 
          onClick={() => onNavigateTab('experience')}
          className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/40 cursor-pointer transition-all hover:-translate-y-0.5 space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Experience Milestones</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
            {experience.length}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">Click to add/edit work history →</div>
        </div>

        <div 
          onClick={() => onNavigateTab('skills')}
          className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/40 cursor-pointer transition-all hover:-translate-y-0.5 space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Skills & Tech Stack</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
            {totalSkillsCount}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">Across {skills.length} categories →</div>
        </div>

        <div 
          onClick={() => onNavigateTab('messages')}
          className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.06] hover:border-amber-400/40 cursor-pointer transition-all hover:-translate-y-0.5 space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase">Contact Inquiries</span>
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
            {messages.length}
          </div>
          <div className="text-[11px] font-mono text-zinc-400">View received payloads →</div>
        </div>

      </div>

    </div>
  );
};
