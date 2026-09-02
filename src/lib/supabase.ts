import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_SUPABASE_URL = 'portfolio_supabase_url';
const STORAGE_KEY_SUPABASE_KEY = 'portfolio_supabase_anon_key';

export function getStoredSupabaseConfig(): { url: string; anonKey: string } {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_SUPABASE_URL) || '' : '';
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_SUPABASE_KEY) || '' : '';

  return {
    url: storedUrl || envUrl,
    anonKey: storedKey || envKey,
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_SUPABASE_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_SUPABASE_KEY, anonKey.trim());
  }
}

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getStoredSupabaseConfig();

  if (!url || !anonKey) {
    return null;
  }

  if (cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: true },
    });
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

export async function checkSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { connected: false, message: 'No Supabase URL or Anon Key configured.' };
  }

  try {
    const { error } = await client.from('site_settings').select('key').limit(1);
    if (error && error.code !== 'PGRST116') {
      // Table might not exist yet, try generic ping
      return { connected: true, message: `Connected to Supabase (${error.message || 'Ready'})` };
    }
    return { connected: true, message: 'Connected to Supabase successfully.' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { connected: false, message: `Connection failed: ${msg}` };
  }
}
