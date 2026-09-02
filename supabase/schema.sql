-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR MOHAMED PORTFOLIO
-- ====================================================================

-- 1. Site Settings (Stores Personal Info, Stats, Config)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  image TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb NOT NULL,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  metrics JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Experience / Timeline Table
CREATE TABLE IF NOT EXISTS experience (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies JSONB DEFAULT '[]'::jsonb NOT NULL,
  badge TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  description TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);

-- Public Write for Contact Form
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Allow all operations for anon (with anon key in simple mode)
CREATE POLICY "Anon all site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all experience" ON experience FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all skills" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon all contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
