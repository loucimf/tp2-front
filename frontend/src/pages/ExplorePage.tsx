import { useMemo, useState } from "react";
import { API_URLS } from "../api/global.api";
import { UserAPI } from "../api/user.api";
import DashboardFeedbackCard from "../components/dashboard/DashboardFeedbackCard";
import DashboardPage from "../components/dashboard/DashboardPage";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import ExploreGamesGrid from "../components/explore/ExploreGamesGrid";
import ExploreHero from "../components/explore/ExploreHero";
import ExploreToolbar from "../components/explore/ExploreToolbar";
import { useExploreGames } from "../hooks/useExploreGames";
import type { RawgGame } from "../hooks/useGames";
import type { UseAuthResult } from "../hooks/useAuth";

type ExplorePageProps = {
    auth: UseAuthResult;
};

const baseUrl = import.meta.env.VITE_API_URL
    || (import.meta.env.DEV ? API_URLS.DEV : API_URLS.VERCEL_PROD);
const userApi = new UserAPI(baseUrl);

const ExplorePage: React.FC<ExplorePageProps> = ({ auth }) => {
    const [addedGameIds, setAddedGameIds] = useState<Set<number>>(() => new Set());
    const [savingGameId, setSavingGameId] = useState<number | null>(null);
    const [libraryError, setLibraryError] = useState<string | null>(null);
    const {
        availableGenres,
        error,
        featuredGame,
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
    } = useExploreGames();
    const userId = auth.session?.user.id;
    const accessToken = auth.session?.access_token;

    const addedIds = useMemo(() => new Set(addedGameIds), [addedGameIds]);

    const addGameToLibrary = async (game: RawgGame) => {
        if (!userId) {
            setLibraryError("You need to be signed in to add games.");
            return;
        }

        setSavingGameId(game.id);
        setLibraryError(null);

        try {
            await userApi.addGameToLibrary({
                accessToken,
                gameId: game.id,
                releaseDate: game.released,
                title: game.name,
                userId,
            });

            setAddedGameIds((current) => {
                const next = new Set(current);
                next.add(game.id);
                return next;
            });
        } catch (saveError) {
            setLibraryError(
                saveError instanceof Error
                    ? saveError.message
                    : "Failed to add game to library.",
            );
        } finally {
            setSavingGameId(null);
        }
    };

    return (
        <DashboardPage
            className="explore-page"
            topbar={
                <DashboardTopbar
                    inputId="explore-search"
                    onSearchChange={setSearchTerm}
                    placeholder="Search games, genres, or publishers..."
                    value={searchTerm}
                />
            }
        >
            <ExploreHero
                game={featuredGame}
                isAdded={featuredGame ? addedIds.has(featuredGame.id) : false}
                isLoading={isLoading}
                isSaving={featuredGame ? savingGameId === featuredGame.id : false}
                onAddToLibrary={addGameToLibrary}
            />

            <section className="explore-trending-panel">
                <DashboardSectionHeader
                        copy="Fresh catalog picks from the latest RAWG results."
                        title="Trending Games"
                        actions={
                            <ExploreToolbar
                                availableGenres={availableGenres}
                                selectedGenre={selectedGenre}
                                setPage={setPage}
                                setSelectedGenre={setSelectedGenre}
                                setSortOption={setSortOption}
                                sortOption={sortOption}
                            />
                        }
                />

                {libraryError ? (
                    <DashboardFeedbackCard
                        copy={libraryError}
                        title="Unable to update library"
                        tone="error"
                    />
                ) : null}

                {error ? (
                    <DashboardFeedbackCard
                        copy={error}
                        title="Unable to load games"
                        tone="error"
                    />
                ) : !isLoading && !visibleGames.length ? (
                    <DashboardFeedbackCard
                        copy="Clear the search or switch genres to see more results."
                        title="No games matched this filter"
                    />
                ) : (
                    <ExploreGamesGrid
                        addedGameIds={addedIds}
                        currentPage={page}
                        games={visibleGames}
                        isLoading={isLoading}
                        onAddToLibrary={addGameToLibrary}
                        onPageChange={setPage}
                        savingGameId={savingGameId}
                        totalPages={totalPages}
                    />
                )}
            </section>
        </DashboardPage>
    );
};

export default ExplorePage;
