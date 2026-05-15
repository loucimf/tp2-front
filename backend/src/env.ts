import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

type Environment = "development" | "production" | "test";

export const ENVIRONMENT: Environment = "development";
export const PORT = Number(process.env.PORT) || 3001;
export const RAWG_API_KEY = process.env.RAWG_API_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS ??
  "http://localhost:5173,http://127.0.0.1:5173,https://tp2-front-git-develop-facundos-projects-140aa994.vercel.app";
