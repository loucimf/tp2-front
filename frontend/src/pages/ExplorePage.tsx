import ExploreFeedbackCard from "../components/explore/ExploreFeedbackCard";
import ExploreGamesGrid from "../components/explore/ExploreGamesGrid";
import ExploreHero from "../components/explore/ExploreHero";
import ExplorePanelHeading from "../components/explore/ExplorePanelHeading";
import ExploreToolbar from "../components/explore/ExploreToolbar";
import ExploreTopbar from "../components/explore/ExploreTopbar";
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
        <section className="explore-dashboard">
            <ExploreTopbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="explore-content">
                <ExploreHero game={featuredGame} isLoading={isLoading} />

                <section className="explore-trending-panel">
                    <ExplorePanelHeading
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
                        <ExploreFeedbackCard
                            copy={error}
                            title="Unable to load games"
                            tone="error"
                        />
                    ) : !isLoading && !visibleGames.length ? (
                        <ExploreFeedbackCard
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
            </div>
        </section>
    );
};

export default ExplorePage;
