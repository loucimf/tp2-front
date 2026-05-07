import { createClient } from "@supabase/supabase-js";
const RAWG_API_KEY = "fbb18d0389b745c3a56e33b1f5ce6d00"
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

const signUp = async (email: string, password: string) => {
  if (!supabase) { console.log("no supabase signup"); return}
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) console.error("Error al registrar:", error.message);
  return data;
};

const signIn = async (email: string, password: string) => {
  if (!supabase) { console.log("no supabase signin"); return}
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error("Error al entrar:", error.message);
  return data;
};

const signOut = async () => {
  if (!supabase) { console.log("no supabase signout"); return}
  await supabase.auth.signOut();
};
