import { createClient } from "@supabase/supabase-js";

type Environment = "development" | "test" | "production"
export const ENVIRONMENT: Environment = "development";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
