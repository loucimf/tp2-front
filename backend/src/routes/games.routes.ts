import { Router } from "express";
import { RAWG_API_KEY } from "../env.js";

export const gamesRouter = Router();

const BASE_URL = "https://api.rawg.io/api/games";

gamesRouter.get("/:gameId", async (req, res) => {
  if (!RAWG_API_KEY) {
    res.status(500).json({
      error: "RAWG_API_KEY is not configured.",
    });
    return;
  }

  const gameId = Number(req.params.gameId);

  if (!Number.isFinite(gameId)) {
    res.status(400).json({
      error: "gameId must be a valid number.",
    });
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      key: RAWG_API_KEY,
    });
    const response = await fetch(`${BASE_URL}/${gameId}?${searchParams.toString()}`);
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
      error: "Failed to fetch game from RAWG.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

gamesRouter.get("/", async (req, res) => {

  if (!RAWG_API_KEY) {
    res.status(500).json({
      error: "RAWG_API_KEY is not configured.",
    });
    return;
  }

  try {
    const searchParams = new URLSearchParams({
      key: RAWG_API_KEY,
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
