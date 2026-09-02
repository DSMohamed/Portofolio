import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Project, SkillCategory, TimelineItem, ServiceItem, StatItem } from '../types/portfolio';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  PROJECTS as DEFAULT_PROJECTS,
  TIMELINE as DEFAULT_TIMELINE,
  SKILL_CATEGORIES as DEFAULT_SKILLS,
  SERVICES as DEFAULT_SERVICES,
  STATS as DEFAULT_STATS,
} from '../data/portfolioData';
import { getSupabaseClient, checkSupabaseConnection, saveSupabaseConfig, getStoredSupabaseConfig } from '../lib/supabase';
import { DEFAULT_ADMIN_HASH, hashPassword, verifyPasswordHash } from '../lib/crypto';

const STORAGE_KEYS = {
  PERSONAL_INFO: 'portfolio_personal_info',
  PROJECTS: 'portfolio_projects',
  TIMELINE: 'portfolio_timeline',
  SKILLS: 'portfolio_skills',
  SERVICES: 'portfolio_services',
  STATS: 'portfolio_stats',
  MESSAGES: 'portfolio_messages',
  PASSCODE_HASH: 'portfolio_admin_passcode_hash',
  AUTH_SESSION: 'portfolio_admin_session',
};

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface PortfolioContextType {
  personalInfo: typeof DEFAULT_PERSONAL_INFO;
  projects: Project[];
  experience: TimelineItem[];
  skills: SkillCategory[];
  services: ServiceItem[];
  stats: StatItem[];
  messages: ContactMessage[];
  isAdminOpen: boolean;
  isAuthenticated: boolean;
  isSyncing: boolean;
  supabaseStatus: { connected: boolean; message: string };
  supabaseConfig: { url: string; anonKey: string };
  setIsAdminOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changeAdminPasscode: (newPass: string) => Promise<void>;
  updatePersonalInfo: (info: Partial<typeof DEFAULT_PERSONAL_INFO>) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addExperience: (item: TimelineItem) => void;
  updateExperience: (item: TimelineItem) => void;
  deleteExperience: (id: string) => void;
  updateSkills: (categories: SkillCategory[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateStats: (stats: StatItem[]) => void;
  submitContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
  deleteMessage: (id: string) => void;
  saveSupabaseSettings: (url: string, anonKey: string) => Promise<void>;
  syncFromSupabase: () => Promise<void>;
  pushAllToSupabase: () => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage or defaults
  const [personalInfo, setPersonalInfo] = useState<typeof DEFAULT_PERSONAL_INFO>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      return stored ? { ...DEFAULT_PERSONAL_INFO, ...JSON.parse(stored) } : DEFAULT_PERSONAL_INFO;
    } catch {
      return DEFAULT_PERSONAL_INFO;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [experience, setExperience] = useState<TimelineItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      return stored ? JSON.parse(stored) : DEFAULT_TIMELINE;
    } catch {
      return DEFAULT_TIMELINE;
    }
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return stored ? JSON.parse(stored) : DEFAULT_SKILLS;
    } catch {
      return DEFAULT_SKILLS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return stored ? JSON.parse(stored) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [stats, setStats] = useState<StatItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      return stored ? JSON.parse(stored) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Admin Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
    }
    return false;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Checking...',
  });
  const [supabaseConfig, setSupabaseConfig] = useState(getStoredSupabaseConfig());

  // Check URL Hash for #admin on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }

      const handleHashChange = () => {
        if (window.location.hash === '#admin') {
          setIsAdminOpen(true);
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  // Check Supabase connection on load
  const verifyConnection = useCallback(async () => {
    const res = await checkSupabaseConnection();
    setSupabaseStatus(res);
  }, []);

  useEffect(() => {
    verifyConnection();
  }, [verifyConnection]);

  // Sync with Supabase if configured
  const syncFromSupabase = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) return;

    setIsSyncing(true);
    try {
      // 1. Settings
      const { data: settingsData } = await client.from('site_settings').select('*');
      if (settingsData) {
        const infoObj = settingsData.find(s => s.key === 'personal_info')?.value;
        if (infoObj) {
          setPersonalInfo(prev => ({ ...prev, ...infoObj }));
          localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(infoObj));
        }
        const statsObj = settingsData.find(s => s.key === 'stats')?.value;
        if (statsObj) {
          setStats(statsObj);
          localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(statsObj));
        }
        const authHash = settingsData.find(s => s.key === 'admin_auth_hash')?.value;
        if (authHash && typeof authHash === 'string') {
          localStorage.setItem(STORAGE_KEYS.PASSCODE_HASH, authHash);
        }
      }

      // 2. Projects
      const { data: projData } = await client.from('projects').select('*').order('sort_order', { ascending: true });
      if (projData && projData.length > 0) {
        const formatted: Project[] = projData.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          categoryLabel: p.category_label,
          tagline: p.tagline || '',
          description: p.description,
          longDescription: p.long_description || '',
          image: p.image,
          tags: p.tags || [],
          githubUrl: p.github_url || '',
          liveUrl: p.live_url || '',
          featured: p.featured || false,
          metrics: p.metrics || [],
          highlights: p.highlights || [],
        }));
        setProjects(formatted);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(formatted));
      }

      // 3. Experience
      const { data: expData } = await client.from('experience').select('*').order('sort_order', { ascending: true });
      if (expData && expData.length > 0) {
        const formatted: TimelineItem[] = expData.map(e => ({
          id: e.id,
          role: e.role,
          organization: e.organization,
          period: e.period,
          location: e.location,
          description: e.description,
          technologies: e.technologies || [],
          badge: e.badge || undefined,
        }));
        setExperience(formatted);
        localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(formatted));
      }

      // 4. Skills
      const { data: skillData } = await client.from('skills').select('*').order('sort_order', { ascending: true });
      if (skillData && skillData.length > 0) {
        const formatted: SkillCategory[] = skillData.map(s => ({
          title: s.title,
          iconName: s.icon_name,
          description: s.description,
          skills: s.skills || [],
        }));
        setSkills(formatted);
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(formatted));
      }

      // 5. Messages
      const { data: msgData } = await client.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (msgData) {
        setMessages(msgData);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(msgData));
      }
    } catch (err) {
      console.warn('Supabase sync skipped/failed:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    syncFromSupabase();
  }, [syncFromSupabase]);

  // Auth Functions with Cryptographic Hashing
  const loginAdmin = async (inputPasscode: string): Promise<boolean> => {
    const storedHash = localStorage.getItem(STORAGE_KEYS.PASSCODE_HASH) || DEFAULT_ADMIN_HASH;
    const isValid = await verifyPasswordHash(inputPasscode, storedHash);

    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  };

  const changeAdminPasscode = async (newPass: string): Promise<void> => {
    const newHash = await hashPassword(newPass);
    localStorage.setItem(STORAGE_KEYS.PASSCODE_HASH, newHash);

    // Sync hash to Supabase if connected
    const client = getSupabaseClient();
    if (client) {
      await client.from('site_settings').upsert({
        key: 'admin_auth_hash',
        value: newHash,
        updated_at: new Date().toISOString(),
      });
    }
  };

  // State Updates & Persistence
  const updatePersonalInfo = (info: Partial<typeof DEFAULT_PERSONAL_INFO>) => {
    const updated = { ...personalInfo, ...info };
    setPersonalInfo(updated);
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('site_settings').upsert({
        key: 'personal_info',
        value: updated,
        updated_at: new Date().toISOString(),
      }).then();
    }
  };

  const addProject = (proj: Project) => {
    const updated = [proj, ...projects];
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('projects').insert({
        id: proj.id,
        title: proj.title,
        category: proj.category,
        category_label: proj.categoryLabel,
        tagline: proj.tagline,
        description: proj.description,
        long_description: proj.longDescription,
        image: proj.image,
        tags: proj.tags,
        github_url: proj.githubUrl,
        live_url: proj.liveUrl,
        featured: proj.featured || false,
        metrics: proj.metrics || [],
        highlights: proj.highlights || [],
      }).then();
    }
  };

  const updateProject = (proj: Project) => {
    const updated = projects.map(p => (p.id === proj.id ? proj : p));
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('projects').upsert({
        id: proj.id,
        title: proj.title,
        category: proj.category,
        category_label: proj.categoryLabel,
        tagline: proj.tagline,
        description: proj.description,
        long_description: proj.longDescription,
        image: proj.image,
        tags: proj.tags,
        github_url: proj.githubUrl,
        live_url: proj.liveUrl,
        featured: proj.featured || false,
        metrics: proj.metrics || [],
        highlights: proj.highlights || [],
      }).then();
    }
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('projects').delete().eq('id', id).then();
    }
  };

  const addExperience = (item: TimelineItem) => {
    const updated = [item, ...experience];
    setExperience(updated);
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('experience').insert({
        id: item.id,
        role: item.role,
        organization: item.organization,
        period: item.period,
        location: item.location,
        description: item.description,
        technologies: item.technologies,
        badge: item.badge,
      }).then();
    }
  };

  const updateExperience = (item: TimelineItem) => {
    const updated = experience.map(e => (e.id === item.id ? item : e));
    setExperience(updated);
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('experience').upsert({
        id: item.id,
        role: item.role,
        organization: item.organization,
        period: item.period,
        location: item.location,
        description: item.description,
        technologies: item.technologies,
        badge: item.badge,
      }).then();
    }
  };

  const deleteExperience = (id: string) => {
    const updated = experience.filter(e => e.id !== id);
    setExperience(updated);
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('experience').delete().eq('id', id).then();
    }
  };

  const updateSkills = (newSkills: SkillCategory[]) => {
    setSkills(newSkills);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(newSkills));

    const client = getSupabaseClient();
    if (client) {
      newSkills.forEach((sc, idx) => {
        client.from('skills').upsert({
          id: `skill-cat-${idx}`,
          title: sc.title,
          icon_name: sc.iconName,
          description: sc.description,
          skills: sc.skills,
          sort_order: idx,
        }).then();
      });
    }
  };

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newServices));

    const client = getSupabaseClient();
    if (client) {
      newServices.forEach((s, idx) => {
        client.from('services').upsert({
          id: s.id,
          title: s.title,
          tagline: s.tagline,
          description: s.description,
          icon: s.icon,
          deliverables: s.deliverables,
          sort_order: idx,
        }).then();
      });
    }
  };

  const updateStats = (newStats: StatItem[]) => {
    setStats(newStats);
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));

    const client = getSupabaseClient();
    if (client) {
      client.from('site_settings').upsert({
        key: 'stats',
        value: newStats,
        updated_at: new Date().toISOString(),
      }).then();
    }
  };

  const submitContactMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: String(Date.now()),
      ...msg,
      created_at: new Date().toISOString(),
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_messages').insert(msg);
      } catch (e) {
        console.warn('Could not save message to Supabase:', e);
      }
    }
    return true;
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    const client = getSupabaseClient();
    if (client) {
      client.from('contact_messages').delete().eq('id', id).then();
    }
  };

  const saveSupabaseSettings = async (url: string, anonKey: string) => {
    saveSupabaseConfig(url, anonKey);
    setSupabaseConfig({ url, anonKey });
    const res = await checkSupabaseConnection();
    setSupabaseStatus(res);
    if (res.connected) {
      await syncFromSupabase();
    }
  };

  const pushAllToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    const client = getSupabaseClient();
    if (!client) {
      return { success: false, message: 'Supabase client is not configured.' };
    }

    setIsSyncing(true);
    try {
      // 1. Site Settings
      await client.from('site_settings').upsert({
        key: 'personal_info',
        value: personalInfo,
        updated_at: new Date().toISOString(),
      });

      await client.from('site_settings').upsert({
        key: 'stats',
        value: stats,
        updated_at: new Date().toISOString(),
      });

      const storedHash = localStorage.getItem(STORAGE_KEYS.PASSCODE_HASH) || DEFAULT_ADMIN_HASH;
      await client.from('site_settings').upsert({
        key: 'admin_auth_hash',
        value: storedHash,
        updated_at: new Date().toISOString(),
      });

      // 2. Projects
      for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await client.from('projects').upsert({
          id: p.id,
          title: p.title,
          category: p.category,
          category_label: p.categoryLabel,
          tagline: p.tagline,
          description: p.description,
          long_description: p.longDescription,
          image: p.image,
          tags: p.tags,
          github_url: p.githubUrl,
          live_url: p.liveUrl,
          featured: p.featured || false,
          metrics: p.metrics || [],
          highlights: p.highlights || [],
          sort_order: i,
        });
      }

      // 3. Experience
      for (let i = 0; i < experience.length; i++) {
        const e = experience[i];
        await client.from('experience').upsert({
          id: e.id,
          role: e.role,
          organization: e.organization,
          period: e.period,
          location: e.location,
          description: e.description,
          technologies: e.technologies,
          badge: e.badge,
          sort_order: i,
        });
      }

      // 4. Skills
      for (let i = 0; i < skills.length; i++) {
        const s = skills[i];
        await client.from('skills').upsert({
          id: `skill-cat-${i}`,
          title: s.title,
          icon_name: s.iconName,
          description: s.description,
          skills: s.skills,
          sort_order: i,
        });
      }

      // 5. Services
      for (let i = 0; i < services.length; i++) {
        const s = services[i];
        await client.from('services').upsert({
          id: s.id,
          title: s.title,
          tagline: s.tagline,
          description: s.description,
          icon: s.icon,
          deliverables: s.deliverables,
          sort_order: i,
        });
      }

      return { success: true, message: 'All local data successfully synced & pushed to Supabase!' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Push failed: ${msg}` };
    } finally {
      setIsSyncing(false);
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TIMELINE);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.PASSCODE_HASH);
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    setProjects(DEFAULT_PROJECTS);
    setExperience(DEFAULT_TIMELINE);
    setSkills(DEFAULT_SKILLS);
    setServices(DEFAULT_SERVICES);
    setStats(DEFAULT_STATS);
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        experience,
        skills,
        services,
        stats,
        messages,
        isAdminOpen,
        isAuthenticated,
        isSyncing,
        supabaseStatus,
        supabaseConfig,
        setIsAdminOpen,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        updateSkills,
        updateServices,
        updateStats,
        submitContactMessage,
        deleteMessage,
        saveSupabaseSettings,
        syncFromSupabase,
        pushAllToSupabase,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
