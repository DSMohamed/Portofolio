import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Sparkles,
  Layers,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ExternalLink,
  Terminal,
  Shield,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminAuth } from './AdminAuth';
import { OverviewTab } from './tabs/OverviewTab';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { StatsTab } from './tabs/StatsTab';
import { MessagesTab } from './tabs/MessagesTab';
import { SettingsTab } from './tabs/SettingsTab';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    logoutAdmin,
    projects,
    experience,
    messages,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<string>('overview');

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full h-full max-w-7xl max-h-[100svh] sm:max-h-[92vh] bg-[#08080c] border border-white/10 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-200">
        
        {/* Top App Bar */}
        <header className="px-6 py-4 border-b border-white/[0.08] bg-[#0c0c12] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm flex items-center gap-2">
                <span>PORTFOLIO ADMIN CMS</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  v2.6
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                DYNAMIC CONTENT & SUPABASE SYNC ENGINE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={logoutAdmin}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-400 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            <button
              onClick={() => {
                setIsAdminOpen(false);
                if (window.location.hash === '#admin') {
                  window.history.replaceState(null, '', ' ');
                }
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        {!isAuthenticated ? (
          <div className="flex-grow flex items-center justify-center p-6 overflow-y-auto">
            <AdminAuth />
          </div>
        ) : (
          <div className="flex-grow flex flex-col md:flex-row min-h-0 overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 md:border-r border-white/[0.08] p-4 flex md:flex-col justify-start gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              
              <div className="hidden md:block px-3 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                CMS Content Sections
              </div>

              {[
                { id: 'overview', label: 'Overview & Sync', icon: LayoutDashboard },
                { id: 'personal', label: 'Identity & Bio', icon: User },
                { id: 'projects', label: 'Projects & Work', icon: FolderGit2, badge: projects.length },
                { id: 'experience', label: 'Experience & Career', icon: Briefcase, badge: experience.length },
                { id: 'skills', label: 'Skills Matrix', icon: Sparkles },
                { id: 'services', label: 'Capabilities', icon: Layers },
                { id: 'stats', label: 'Highlight Stats', icon: BarChart3 },
                { id: 'messages', label: 'Contact Inbox', icon: MessageSquare, badge: messages.length },
                { id: 'settings', label: 'Supabase & Security', icon: Settings },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all whitespace-nowrap shrink-0 md:shrink ${
                      isActive
                        ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>

                    {tab.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-black/20 text-black font-bold'
                            : 'bg-white/5 text-zinc-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="mt-auto hidden md:block pt-6 border-t border-white/[0.06] px-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SESSION ENCRYPTED</span>
                </div>
              </div>
            </aside>

            {/* Main Tab View */}
            <main className="flex-grow p-6 sm:p-8 lg:p-10 overflow-y-auto bg-[#08080c]">
              {activeTab === 'overview' && <OverviewTab onNavigateTab={tabId => setActiveTab(tabId)} />}
              {activeTab === 'personal' && <PersonalInfoTab />}
              {activeTab === 'projects' && <ProjectsTab />}
              {activeTab === 'experience' && <ExperienceTab />}
              {activeTab === 'skills' && <SkillsTab />}
              {activeTab === 'services' && <ServicesTab />}
              {activeTab === 'stats' && <StatsTab />}
              {activeTab === 'messages' && <MessagesTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </main>

          </div>
        )}

      </div>
    </div>
  );
};
