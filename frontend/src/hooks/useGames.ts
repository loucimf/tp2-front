import { useCallback, useEffect, useState } from "react";
import { GamesAPI } from "../api/games.api";
import { API_URLS } from "../api/global.api";

type RawgGame = {
	id: number;
	name: string;
	background_image: string | null;
	genres: Array<{
		id: number;
		name: string;
		slug: string;
	}>;
	metacritic: number | null;
	parent_platforms: Array<{
		platform: {
			id: number;
			name: string;
			slug: string;
		};
	}>;
	rating: number;
	ratings_count: number;
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

const baseUrl = import.meta.env.VITE_API_URL
	|| (import.meta.env.DEV ? API_URLS.DEV : API_URLS.VERCEL_PROD);
const gamesApi = new GamesAPI(baseUrl);

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
			if (!baseUrl) {
				throw new Error("VITE_API_URL is not configured.");
			}

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
