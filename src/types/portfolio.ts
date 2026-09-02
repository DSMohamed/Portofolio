export type ProjectCategory = 'all' | 'ai' | 'fullstack' | 'creative';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Expert' | 'Specialist';
    hot?: boolean;
  }[];
}

export interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}
