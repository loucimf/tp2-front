import { Router } from "express";
import { API_KEY } from "../server.js";

export const rawgapi = Router();

const BASE_URL = "https://api.rawg.io/api/games";

rawgapi.get("/", async (req, res) => {

  if (!API_KEY) {
    res.status(500).json({
      error: "RAWG_API_KEY is not configured.",
    });
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      key: API_KEY,
    });

    const page =
      typeof req.query.page === "string" ? req.query.page : undefined;
    const pageSize =
      typeof req.query.page_size === "string" ? req.query.page_size : undefined;
    const ordering =
      typeof req.query.ordering === "string" ? req.query.ordering : undefined;

    if (page) searchParams.set("page", page);
    if (pageSize) searchParams.set("page_size", pageSize);
    if (ordering) searchParams.set("ordering", ordering);
    
    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({
        error: "RAWG request failed.",
        details: data,
      });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch games from RAWG.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
