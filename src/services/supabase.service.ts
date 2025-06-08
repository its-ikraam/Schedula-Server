import { config } from '../config/config';
import { createClient } from '@supabase/supabase-js';

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Supabase configuration is missing');
}

export const supabaseClient = createClient(config.supabase.url, config.supabase.anonKey);
