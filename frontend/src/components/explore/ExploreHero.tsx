import { RawgGame } from "../../hooks/useGames";
import SysIcon from "../Icon";
import {
    buildGameSummary,
    formatRating,
    formatReleaseDate,
    getGenreLabels,
    getPlatformIcons,
    getPlatformNames,
    splitAccentTitle,
} from "./explore.utils";

type ExploreHeroProps = {
    game?: RawgGame;
    isLoading: boolean;
};

const ExploreHero: React.FC<ExploreHeroProps> = ({ game, isLoading }) => {
    if (isLoading) {
        return <section className="explore-hero explore-hero-skeleton" aria-hidden="true" />;
    }

    if (!game) {
        return (
            <section className="explore-hero explore-empty-state">
                <h2>No featured game available</h2>
                <p>Try another search or flip to a different page.</p>
            </section>
        );
    }

    const titleParts = splitAccentTitle(game.name);
    const genreLabels = getGenreLabels(game);
    const platformIcons = getPlatformIcons(game);
    const platformNames = getPlatformNames(game);

    return (
        <section
            className="explore-hero"
            style={{
                backgroundImage: `
                    linear-gradient(90deg, rgba(255, 250, 243, 0.96) 0%, rgba(255, 250, 243, 0.92) 34%, rgba(255, 250, 243, 0.22) 72%),
                    linear-gradient(180deg, rgba(255, 162, 96, 0.18), rgba(255, 162, 96, 0)),
                    url(${game.background_image ?? ""})
                `,
            }}
        >
            <div className="explore-hero-main">
                <div className="explore-hero-tags">
                    {genreLabels.map((genre) => (
                        <span key={genre} className="explore-chip explore-chip-soft">
                            {genre}
                        </span>
                    ))}
                    <span className="explore-chip explore-chip-rating">
                        <SysIcon type="star" className="explore-inline-icon" />
                        {formatRating(game.rating)}
                    </span>
                </div>

                <div className="explore-hero-heading">
                    <h1>
                        {titleParts.lead}
                        {titleParts.accent ? (
                            <>
                                <br />
                                <span>{titleParts.accent}</span>
                            </>
                        ) : null}
                    </h1>
                    <p>{buildGameSummary(game)}</p>
                </div>

                <dl className="explore-hero-meta">
                    <div>
                        <dt>Release date</dt>
                        <dd>{formatReleaseDate(game.released)}</dd>
                    </div>
                    <div>
                        <dt>Genres</dt>
                        <dd>{genreLabels.join(", ") || "Mixed"}</dd>
                    </div>
                    <div>
                        <dt>User rating</dt>
                        <dd>
                            {formatRating(game.rating)} / {game.rating_top}
                        </dd>
                    </div>
                </dl>

                <div className="explore-hero-actions">
                    <button type="button" className="explore-primary-button">
                        <SysIcon type="save" className="explore-button-icon" />
                        Add to Library
                    </button>
                    <button type="button" className="explore-secondary-button">
                        <SysIcon type="play" className="explore-button-icon" />
                        View Details
                    </button>
                </div>
            </div>

            <aside className="explore-hero-aside">
                <div className="explore-hero-aside-group">
                    <h2>Platforms</h2>
                    <div className="explore-platform-badges">
                        {platformIcons.length ? (
                            platformIcons.map((icon, index) => (
                                <span key={`${icon}-${index}`} className="explore-platform-badge">
                                    <SysIcon type={icon} className="explore-platform-icon" />
                                    {platformNames[index] ?? icon}
                                </span>
                            ))
                        ) : (
                            <span className="explore-platform-badge">Cross-platform</span>
                        )}
                    </div>
                </div>

                <div className="explore-hero-aside-group">
                    <h2>Metacritic score</h2>
                    <div className="explore-score-row">
                        <span className="explore-score-badge">
                            {game.metacritic ?? "--"}
                        </span>
                        <p>
                            Based on <strong>{game.ratings_count || 0}</strong> tracked user ratings
                        </p>
                    </div>
                </div>
            </aside>
        </section>
    );
};

export default ExploreHero;
