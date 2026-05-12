import express from "express";
import { apiRouter } from "./routes/index.js";

export const app = express();

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ??
  "http://localhost:5173,http://127.0.0.1:5173,https://tp2-front-git-develop-facundos-projects-140aa994.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "backend!",
  });
});

app.use("/api", apiRouter);
