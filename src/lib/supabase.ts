import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './database.types';

let supabase: SupabaseClient<Database> | undefined;

export function getSupabaseClient() {
  if (supabase) {
    return supabase;
  }

  const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new Error(
      'Configura EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY en .env y reinicia Expo.',
    );
  }

  supabase = createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabase;
}
