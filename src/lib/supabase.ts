import { createClient } from '@supabase/supabase-js';

// Fallback values from the project dashboard provided in chat
const DEFAULT_URL = "https://obwkuvxxffaigqvkvqbs.supabase.co";
const DEFAULT_KEY = "sb_publishable_AVj3jEh3AS7BT5GL2qB5yQ_DHj3IGYY";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_URL).replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_KEY;

/**
 * Supabase client instance.
 * Initialized with environment variables or fallback credentials.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
