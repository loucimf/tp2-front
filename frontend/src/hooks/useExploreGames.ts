import { useMemo, useState } from "react";
import { RawgGame, useGames } from "./useGames";

export const orderingByOption = {
    newest: "-released",
    popular: "-rating",
    score: "-metacritic",
} as const;

export type ExploreSortOption = keyof typeof orderingByOption;

export type UseExploreGamesResult = {
    availableGenres: string[];
    error: string | null;
    featuredGame?: RawgGame;
    games: RawgGame[];
    isLoading: boolean;
    page: number;
    searchTerm: string;
    selectedGenre: string;
    setPage: (page: number) => void;
    setSearchTerm: (value: string) => void;
    setSelectedGenre: (value: string) => void;
    setSortOption: (value: ExploreSortOption) => void;
    sortOption: ExploreSortOption;
    totalPages: number;
    visibleGames: RawgGame[];
};

export const useExploreGames = (): UseExploreGamesResult => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortOption, setSortOption] = useState<ExploreSortOption>("popular");

    const { count, error, games, isLoading } = useGames({
        ordering: orderingByOption[sortOption],
        page,
        pageSize: 9,
    });

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const availableGenres = useMemo(
        () => [
            "All",
            ...Array.from(
                new Set(
                    games.flatMap((game) =>
                        game.genres.map((genre) => genre.name),
                    ),
                ),
            ).slice(0, 4),
        ],
        [games],
    );

    const filteredGames = useMemo(
        () =>
            games.filter((game) => {
                const matchesGenre =
                    selectedGenre === "All"
                    || game.genres.some((genre) => genre.name === selectedGenre);

                const matchesSearch =
                    !normalizedSearch
                    || game.name.toLowerCase().includes(normalizedSearch)
                    || game.slug.toLowerCase().includes(normalizedSearch)
                    || game.genres.some((genre) =>
                        genre.name.toLowerCase().includes(normalizedSearch),
                    );

                return matchesGenre && matchesSearch;
            }),
        [games, normalizedSearch, selectedGenre],
    );

    const featuredGame = filteredGames[0] ?? games[0];

    const visibleGames = (filteredGames[0] ? filteredGames : games)
        .filter((game) => game.id !== featuredGame?.id)
        .slice(0, 4);

    const totalPages = Math.max(1, Math.ceil(count / 9));

    return {
        availableGenres,
        error,
        featuredGame,
        games,
        isLoading,
        page,
        searchTerm,
        selectedGenre,
        setPage,
        setSearchTerm,
        setSelectedGenre,
        setSortOption,
        sortOption,
        totalPages,
        visibleGames,
    };
};