import express from "express";
import { ALLOWED_ORIGINS, ENVIRONMENT } from "./env.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

const allowedOrigins = ALLOWED_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (ENVIRONMENT === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

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

export default app;
