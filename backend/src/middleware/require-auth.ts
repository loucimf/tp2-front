import type { NextFunction, Request, Response } from "express";
import { supabase } from "../db/supabase.js";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

function getBearerToken(header: string | undefined): string | null {
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token;
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    res.status(401).json({ error: "Missing bearer token." });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Invalid or expired session." });
    return;
  }

  (req as AuthenticatedRequest).userId = data.user.id;
  next();
}
