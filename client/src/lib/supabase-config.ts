import { createClient } from "@supabase/supabase-js";

// import { Database } from "../types/supabase";

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Missing environment variable: VITE_SUPABASE_URL");
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error("Missing environment variable: VITE_SUPABASE_ANON_KEY");
}

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
