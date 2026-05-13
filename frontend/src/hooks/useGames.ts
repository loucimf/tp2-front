import { useCallback, useEffect, useState } from "react";
import { GamesAPI } from "../api/games.api";
import { API_URLS } from "../api/global.api";

type RawgGame = {
  id: number;
  name: string;
  background_image: string | null;
  metacritic: number | null;
  rating: number;
  rating_top: number;
  released: string | null;
  slug: string;
};

type GamesCatalogueResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
};

type UseGamesOptions = {
  enabled?: boolean;
  ordering?: string;
  page?: number;
  pageSize?: number;
};

const gamesApi = new GamesAPI(
  import.meta.env.VITE_API_URL || API_URLS.VERCEL_PROD,
);

export const useGames = ({
  enabled = true,
  ordering,
  page = 1,
  pageSize = 20,
}: UseGamesOptions = {}) => {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data: GamesCatalogueResponse = await gamesApi.getGamesCatalogue({
        ordering,
        page,
        pageSize,
      });

      setGames(data.results ?? []);
      setCount(data.count ?? 0);
      setNext(data.next ?? null);
      setPrevious(data.previous ?? null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to fetch games.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [enabled, ordering, page, pageSize]);

  useEffect(() => {
    void fetchGames();
  }, [fetchGames]);

  return {
    count,
    error,
    games,
    isLoading,
    next,
    previous,
    refetch: fetchGames,
  };
};

export type { GamesCatalogueResponse, RawgGame, UseGamesOptions };
