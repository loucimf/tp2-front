import { useCallback, useEffect, useMemo, useState } from "react";
import { GamesAPI } from "../api/games.api";
import { API_URLS } from "../api/global.api";
import {
    UserAPI,
    type UserCategory,
    type UserLibraryGame,
} from "../api/user.api";
import type { UseAuthResult } from "./useAuth";

export const orderingByOption = {
    popular: "popular",
    recent: "recent",
    title: "title",
} as const;

export type LibrarySortOption = keyof typeof orderingByOption;

export type LibraryGame = UserLibraryGame & {
    coverUrl: string | null;
    categoryName: string;
};

export type LibraryCategory = {
    count: number;
    games: LibraryGame[];
    id: string;
    name: string;
};

const UNCATEGORIZED = "Uncategorized";
const ALL_CATEGORIES = "All categories";

const baseUrl =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? API_URLS.DEV : API_URLS.VERCEL_PROD);

const userApi = new UserAPI(baseUrl);
const gamesApi = new GamesAPI(baseUrl);

type RawgGameDetails = {
    background_image: string | null;
    id: number;
};

const sortGamesLocally = (
    games: LibraryGame[],
    sortOption: LibrarySortOption,
) => {
    const nextGames = [...games];

    switch (sortOption) {
        case "title":
            return nextGames.sort((left, right) =>
                left.title.localeCompare(right.title),
            );
        case "popular":
            return nextGames.sort((left, right) =>
                right.gameApiId - left.gameApiId,
            );
        case "recent":
        default:
            return nextGames.sort((left, right) =>
                right.createdAt.localeCompare(left.createdAt),
            );
    }
};

const createCategoryMap = (games: LibraryGame[]) => {
    const categories = new Map<string, LibraryGame[]>();

    games.forEach((game) => {
        const currentGames = categories.get(game.categoryName) ?? [];
        currentGames.push(game);
        categories.set(game.categoryName, currentGames);
    });

    return categories;
};

const toCategoryNameById = (categories: UserCategory[]) => {
    const categoryNames = new Map<number, string>();

    categories.forEach((category) => {
        categoryNames.set(category.id, category.title);
    });

    return categoryNames;
};

export const useLibraryGames = (auth: UseAuthResult) => {
    const [games, setGames] = useState<UserLibraryGame[]>([]);
    const [coverUrlsByGameId, setCoverUrlsByGameId] = useState<
        Map<number, string | null>
    >(() => new Map());
    const [customCategories, setCustomCategories] = useState<UserCategory[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState(ALL_CATEGORIES);
    const [sortOption, setSortOption] =
        useState<LibrarySortOption>("recent");
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [updatingCategoryGameId, setUpdatingCategoryGameId] =
        useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const userId = auth.session?.user.id;
    const accessToken = auth.session?.access_token;

    const fetchLibrary = useCallback(async () => {
        if (!userId) {
            setGames([]);
            setCustomCategories([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const [libraryResponse, categoriesResponse] = await Promise.all([
                userApi.getGamesLibrary({ accessToken, userId }),
                userApi.getCategories({ accessToken, userId }),
            ]);

            const libraryGames = libraryResponse.items ?? [];

            const rawgDetails = await Promise.all(
                libraryGames.map(async (game) => {
                    try {
                        const details =
                            (await gamesApi.getGame(
                                game.gameApiId,
                            )) as RawgGameDetails;

                        return [
                            game.gameApiId,
                            details.background_image,
                        ] as const;
                    } catch {
                        return [game.gameApiId, null] as const;
                    }
                }),
            );

            setGames(libraryGames);
            setCoverUrlsByGameId(new Map(rawgDetails));
            setCustomCategories(categoriesResponse.items ?? []);
        } catch (fetchError) {
            setError(
                fetchError instanceof Error
                    ? fetchError.message
                    : "Failed to load your library.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, userId]);

    useEffect(() => {
        void fetchLibrary();
    }, [fetchLibrary]);

    const categoryNameById = useMemo(
        () => toCategoryNameById(customCategories),
        [customCategories],
    );

    const libraryGames = useMemo<LibraryGame[]>(
        () =>
            games.map((game) => ({
                ...game,
                coverUrl:
                    coverUrlsByGameId.get(game.gameApiId) ?? null,
                categoryName:
                    game.category_id !== null
                        ? categoryNameById.get(game.category_id) ??
                          UNCATEGORIZED
                        : UNCATEGORIZED,
            })),
        [categoryNameById, coverUrlsByGameId, games],
    );

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const visibleGames = useMemo(() => {
        const filteredGames = libraryGames.filter((game) => {
            const matchesCategory =
                selectedCategory === ALL_CATEGORIES ||
                game.categoryName === selectedCategory;

            const matchesSearch =
                !normalizedSearch ||
                game.title.toLowerCase().includes(normalizedSearch) ||
                String(game.gameApiId).includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });

        return sortGamesLocally(filteredGames, sortOption);
    }, [
        libraryGames,
        normalizedSearch,
        selectedCategory,
        sortOption,
    ]);

    const categories = useMemo<LibraryCategory[]>(() => {
        const visibleCategoryMap = createCategoryMap(visibleGames);

        const categoryNames = [
            ...customCategories.map((category) => category.title),
            ...(visibleCategoryMap.has(UNCATEGORIZED)
                ? [UNCATEGORIZED]
                : []),
        ];

        const uniqueCategoryNames = Array.from(
            new Set(categoryNames),
        );

        return uniqueCategoryNames
            .map((name) => {
                const categoryGames =
                    visibleCategoryMap.get(name) ?? [];

                return {
                    count: categoryGames.length,
                    games: categoryGames,
                    id: name.toLowerCase().replace(/\s+/g, "-"),
                    name,
                };
            })
            .filter(
                (category) =>
                    selectedCategory === ALL_CATEGORIES ||
                    category.name === selectedCategory,
            );
    }, [customCategories, selectedCategory, visibleGames]);

    const availableCategories = useMemo(
        () => [
            ALL_CATEGORIES,
            ...customCategories.map((category) => category.title),
            ...(libraryGames.some(
                (game) => game.categoryName === UNCATEGORIZED,
            )
                ? [UNCATEGORIZED]
                : []),
        ],
        [customCategories, libraryGames],
    );

    const createCategory = async (title: string) => {
        const normalizedTitle = title.trim();

        if (!userId || !normalizedTitle) {
            return false;
        }

        setIsCreatingCategory(true);
        setError(null);

        try {
            const { item } = await userApi.createCategory({
                accessToken,
                title: normalizedTitle,
                userId,
            });

            setCustomCategories((current) => [
                ...current,
                item,
            ]);
            setSelectedCategory(item.title);
            return true;
        } catch (createError) {
            setError(
                createError instanceof Error
                    ? createError.message
                    : "Failed to create category.",
            );
            return false;
        } finally {
            setIsCreatingCategory(false);
        }
    };

    const updateGameCategory = async (
        game: LibraryGame,
        categoryId: number | null,
    ) => {
        if (!userId) return false;

        setUpdatingCategoryGameId(game.id);
        setError(null);

        try {
            const { item } =
                await userApi.updateGameCategory({
                    accessToken,
                    categoryId,
                    gameId: game.gameApiId,
                    userId,
                });

            setGames((current) =>
                current.map((currentGame) =>
                    currentGame.id === item.id
                        ? item
                        : currentGame,
                ),
            );

            return true;
        } catch (updateError) {
            setError(
                updateError instanceof Error
                    ? updateError.message
                    : "Failed to update game category.",
            );
            return false;
        } finally {
            setUpdatingCategoryGameId(null);
        }
    };

    return {
        availableCategories,
        categories,
        createCategory,
        customCategories,
        error,
        gamesCount: visibleGames.length,
        isCreatingCategory,
        isLoading,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        setSortOption,
        sortOption,
        updateGameCategory,
        updatingCategoryGameId,
    };
};