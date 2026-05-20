import { LibraryGame } from "../../hooks/useLibraryGames";
import SysIcon from "../Icon";
import GameArtwork from "../explore/GameArtwork";
import {
    formatLibraryRelease,
    formatLibraryPrice,
} from "./library.utils";

type LibraryGameCardProps = {
    game: LibraryGame;
};

const LibraryGameCard: React.FC<LibraryGameCardProps> = ({ game }) => {
    return (
        <article className="library-game-card">
            <div className="library-game-cover-wrap">
                <GameArtwork
                    alt={game.title}
                    className="library-game-cover"
                    fallbackClassName="library-game-cover library-game-cover-fallback"
                    src={null}
                />
                <span className="library-game-badge">Owned</span>
            </div>

            <div className="library-game-body">
                <div className="library-game-heading">
                    <h3>{game.title}</h3>
                </div>

                <dl className="library-game-stats">
                    <div className="library-stat-row">
                        <dt><span className="library-stat-dot library-stat-dot-release" />Released</dt>
                        <dd>{formatLibraryRelease(game.releaseDate)}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><SysIcon type="star" className="library-stat-icon" />Price</dt>
                        <dd>{formatLibraryPrice(game.price)}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><span className="library-stat-dot library-stat-dot-reviews" />Category</dt>
                        <dd>{game.categoryName}</dd>
                    </div>
                    <div className="library-stat-row">
                        <dt><SysIcon type="play" className="library-stat-icon" />RAWG ID</dt>
                        <dd>{game.gameApiId}</dd>
                    </div>
                </dl>

                <div className="library-game-chips">
                    <span className="library-game-chip">{game.categoryName}</span>
                </div>
            </div>
        </article>
    );
};

export default LibraryGameCard;
