import { createClient } from '@supabase/supabase-js';
import {
  PERSONAL_INFO,
  PROJECTS,
  TIMELINE,
  SKILL_CATEGORIES,
  SERVICES,
  STATS,
} from './src/data/portfolioData';

const SUPABASE_URL = 'https://selyovpetsjmnfuwatfq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbHlvdnBldHNqbW5mdXdhdGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjU0MDgsImV4cCI6MjEwMzk0MTQwOH0.dmPCsuXe3-Tpp6YbuQdqFxP0mCSvct7rMT32Y0mKEWo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function syncToSupabase() {
  console.log('🚀 Syncing MohamedWorks projects & data to Supabase...');

  // 1. Site Settings
  await supabase.from('site_settings').upsert({
    key: 'personal_info',
    value: PERSONAL_INFO,
    updated_at: new Date().toISOString(),
  });

  await supabase.from('site_settings').upsert({
    key: 'stats',
    value: STATS,
    updated_at: new Date().toISOString(),
  });

  console.log('✓ Site settings updated');

  // 2. Clear out older template projects
  await supabase.from('projects').delete().neq('id', 'placeholder_never_matches');

  // 3. Insert real projects
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    const { error } = await supabase.from('projects').upsert({
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
    if (error) {
      console.error(`Error syncing project ${p.title}:`, error);
    } else {
      console.log(`✓ Project synced: ${p.title}`);
    }
  }

  // 4. Experience
  await supabase.from('experience').delete().neq('id', 'placeholder_never_matches');
  for (let i = 0; i < TIMELINE.length; i++) {
    const e = TIMELINE[i];
    const { error } = await supabase.from('experience').upsert({
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
    if (error) console.error(`Error syncing experience ${e.role}:`, error);
  }
  console.log('✓ Experience synced');

  // 5. Skills
  await supabase.from('skills').delete().neq('id', 'placeholder_never_matches');
  for (let i = 0; i < SKILL_CATEGORIES.length; i++) {
    const s = SKILL_CATEGORIES[i];
    const { error } = await supabase.from('skills').upsert({
      id: `skill-cat-${i}`,
      title: s.title,
      icon_name: s.iconName,
      description: s.description,
      skills: s.skills,
      sort_order: i,
    });
    if (error) console.error(`Error syncing skill category ${s.title}:`, error);
  }
  console.log('✓ Skills synced');

  // 6. Services
  await supabase.from('services').delete().neq('id', 'placeholder_never_matches');
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    const { error } = await supabase.from('services').upsert({
      id: s.id,
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      icon: s.icon,
      deliverables: s.deliverables,
      sort_order: i,
    });
    if (error) console.error(`Error syncing service ${s.title}:`, error);
  }
  console.log('✓ Services synced');

  console.log('🎉 All MohamedWorks projects & data successfully synced to Supabase!');
}

syncToSupabase().catch(console.error);
