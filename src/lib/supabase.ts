import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export const WHATSAPP_NUMBER = '355682555999';
export const PHONE_DISPLAY = '+355 68 255 5999';
export const PHONE_TEL = '+355682555999';
