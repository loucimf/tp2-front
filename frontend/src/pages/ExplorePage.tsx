import { useState } from "react";
import ExploreGamesGrid from "../components/explore/ExploreGamesGrid";
import ExploreHero from "../components/explore/ExploreHero";
import { useGames } from "../hooks/useGames";
import SysIcon from "../components/Icon";

const orderingByOption = {
    newest: "-released",
    popular: "-rating",
    score: "-metacritic",
} as const;

const ExplorePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortOption, setSortOption] = useState<keyof typeof orderingByOption>("popular");

    const { count, error, games, isLoading } = useGames({
        ordering: orderingByOption[sortOption],
        page,
        pageSize: 9,
    });

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const availableGenres = [
        "All",
        ...Array.from(
            new Set(games.flatMap((game) => game.genres.map((genre) => genre.name))),
        ).slice(0, 4),
    ];

    const filteredGames = games.filter((game) => {
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
    });

    const featuredGame = filteredGames[0] ?? games[0];
    const visibleGames = (filteredGames[0] ? filteredGames : games)
        .filter((game) => game.id !== featuredGame?.id)
        .slice(0, 4);
    const totalPages = Math.max(1, Math.ceil(count / 9));

    return (
        <section className="explore-dashboard">
            <header className="explore-topbar">
                <label className="explore-searchbar" htmlFor="explore-search">
                    <SysIcon type="explore" className="explore-search-icon" />
                    <input
                        id="explore-search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search games, genres, or publishers..."
                    />
                    <button type="button" className="explore-topbar-icon">
                        <SysIcon type="filter" className="explore-inline-icon" />
                    </button>
                </label>

                <div className="explore-topbar-actions">
                    <button type="button" className="explore-topbar-icon">
                        <SysIcon type="bell" className="explore-inline-icon" />
                    </button>
                    <button type="button" className="explore-topbar-icon">
                        <SysIcon type="save" className="explore-inline-icon" />
                    </button>
                </div>
            </header>

            <div className="explore-content">
                <ExploreHero game={featuredGame} isLoading={isLoading} />

                <section className="explore-trending-panel">
                    <div className="explore-panel-heading">
                        <div>
                            <h2>Trending Games</h2>
                            <p>Fresh catalog picks from the latest RAWG results.</p>
                        </div>

                        <div className="explore-panel-controls">
                            <div className="explore-chip-row" aria-label="Genre filters">
                                {availableGenres.map((genre) => (
                                    <button
                                        key={genre}
                                        type="button"
                                        className={`explore-chip ${genre === selectedGenre ? "active" : ""}`}
                                        onClick={() => setSelectedGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>

                            <label className="explore-sort">
                                <span>Sort by:</span>
                                <select
                                    value={sortOption}
                                    onChange={(event) => {
                                        setSortOption(
                                            event.target.value as keyof typeof orderingByOption,
                                        );
                                        setPage(1);
                                    }}
                                >
                                    <option value="popular">Popular</option>
                                    <option value="score">Metacritic</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    {error ? (
                        <div className="explore-feedback-card explore-feedback-card-error">
                            <h3>Unable to load games</h3>
                            <p>{error}</p>
                        </div>
                    ) : !isLoading && !visibleGames.length ? (
                        <div className="explore-feedback-card">
                            <h3>No games matched this filter</h3>
                            <p>Clear the search or switch genres to see more results.</p>
                        </div>
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
