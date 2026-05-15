import DashboardFeedbackCard from "../components/dashboard/DashboardFeedbackCard";
import DashboardPage from "../components/dashboard/DashboardPage";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import ExploreGamesGrid from "../components/explore/ExploreGamesGrid";
import ExploreHero from "../components/explore/ExploreHero";
import ExploreToolbar from "../components/explore/ExploreToolbar";
import { useExploreGames } from "../hooks/useExploreGames";

const ExplorePage: React.FC = () => {
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
            <ExploreHero game={featuredGame} isLoading={isLoading} />

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
                        currentPage={page}
                        games={visibleGames}
                        isLoading={isLoading}
                        onPageChange={setPage}
                        totalPages={totalPages}
                    />
                )}
            </section>
        </DashboardPage>
    );
};

export default ExplorePage;
