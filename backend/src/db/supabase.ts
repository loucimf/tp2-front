import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "../env.js";

function requireEnv(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`${name} is not configured.`);
    }

    return value;
}

export const supabase = createClient(
    requireEnv(SUPABASE_URL, "SUPABASE_URL"),
    requireEnv(SUPABASE_SECRET_KEY, "SUPABASE_SECRET_KEY"),
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    },
);
