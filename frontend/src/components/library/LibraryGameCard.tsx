import { RawgGame } from "../../hooks/useGames";
import SysIcon from "../Icon";
import GameArtwork from "../explore/GameArtwork";
import {
    formatLibraryRating,
    formatLibraryRelease,
    formatLibraryReviews,
    formatPlaytime,
    getLibraryCardChips,
} from "./library.utils";

type LibraryGameCardProps = {
    game: RawgGame;
};

const LibraryGameCard: React.FC<LibraryGameCardProps> = ({ game }) => {
    const chips = getLibraryCardChips(game);

    return (
        <article className="library-game-card">
            <div className="library-game-cover-wrap">
                <GameArtwork
                    alt={game.name}
                    className="library-game-cover"
                    fallbackClassName="library-game-cover library-game-cover-fallback"
                    src={game.background_image}
                />
                <span className="library-game-badge">Owned</span>
            </div>

            <div className="library-game-body">
                <div className="library-game-heading">
                    <h3>{game.name}</h3>
                </div>

                <dl className="library-game-stats">
                    <div className="library-stat-row">
                        <dt><span className="library-stat-dot library-stat-dot-release" />Released</dt>
                        <dd>{formatLibraryRelease(game.released)}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><SysIcon type="star" className="library-stat-icon" />Rating</dt>
                        <dd>{formatLibraryRating(game.rating, game.rating_top)}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><span className="library-stat-dot library-stat-dot-reviews" />Reviews</dt>
                        <dd>{formatLibraryReviews(game.ratings_count)}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><SysIcon type="play" className="library-stat-icon" />Playtime</dt>
                        <dd>{formatPlaytime(game.playtime)}</dd>
                    </div>
                </dl>

                <div className="library-game-chips">
                    {chips.map((chip) => (
                        <span key={chip} className="library-game-chip">
                            {chip}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default LibraryGameCard;
