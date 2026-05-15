import { useMemo, useState } from "react";
import { RawgGame, useGames } from "./useGames";

const orderingByOption = {
    popular: "-rating",
    recent: "-released",
    title: "name",
} as const;

export type LibrarySortOption = keyof typeof orderingByOption;

export type LibraryCategory = {
    count: number;
    games: RawgGame[];
    id: string;
    name: string;
};

const sortGamesLocally = (games: RawgGame[], sortOption: LibrarySortOption) => {
    const nextGames = [...games];

    switch (sortOption) {
        case "recent":
            return nextGames.sort((left, right) =>
                (right.released ?? "").localeCompare(left.released ?? ""),
            );
        case "title":
            return nextGames.sort((left, right) => left.name.localeCompare(right.name));
        case "popular":
        default:
            return nextGames.sort((left, right) => right.rating - left.rating);
    }
};

const createCategoryMap = (games: RawgGame[]) => {
    const categories = new Map<string, RawgGame[]>();

    games.forEach((game) => {
        const categoryName = game.genres[0]?.name ?? "Uncategorized";
        const currentGames = categories.get(categoryName) ?? [];
        currentGames.push(game);
        categories.set(categoryName, currentGames);
    });

    return categories;
};

export const useLibraryGames = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All categories");
    const [sortOption, setSortOption] = useState<LibrarySortOption>("recent");

    const { error, games, isLoading } = useGames({
        ordering: orderingByOption[sortOption] === "name" ? undefined : orderingByOption[sortOption],
        page: 1,
        pageSize: 24,
    });

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const visibleGames = useMemo(() => {
        const filteredGames = games.filter((game) => {
            const matchesCategory =
                selectedCategory === "All categories"
                || game.genres.some((genre) => genre.name === selectedCategory);

            const matchesSearch =
                !normalizedSearch
                || game.name.toLowerCase().includes(normalizedSearch)
                || game.slug.toLowerCase().includes(normalizedSearch)
                || game.genres.some((genre) =>
                    genre.name.toLowerCase().includes(normalizedSearch),
                );

            return matchesCategory && matchesSearch;
        });

        return sortGamesLocally(filteredGames, sortOption);
    }, [games, normalizedSearch, selectedCategory, sortOption]);

    const categories = useMemo<LibraryCategory[]>(() => {
        const categoryEntries = Array.from(createCategoryMap(visibleGames).entries());

        return categoryEntries
            .sort((left, right) => right[1].length - left[1].length)
            .slice(0, 4)
            .map(([name, categoryGames]) => ({
                count: categoryGames.length,
                games: categoryGames.slice(0, 4),
                id: name.toLowerCase().replace(/\s+/g, "-"),
                name,
            }));
    }, [visibleGames]);

    const availableCategories = useMemo(
        () => [
            "All categories",
            ...Array.from(
                new Set(games.flatMap((game) => game.genres.map((genre) => genre.name))),
            ).slice(0, 8),
        ],
        [games],
    );

    return {
        availableCategories,
        categories,
        error,
        gamesCount: visibleGames.length,
        isLoading,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        setSortOption,
        sortOption,
    };
};
