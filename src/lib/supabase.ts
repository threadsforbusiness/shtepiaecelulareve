import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export const WHATSAPP_NUMBER = '355686005554';
export const PHONE_DISPLAY = '068 600 5554';
export const PHONE_TEL = '+355686005554';
