import { LibraryGame } from "../../hooks/useLibraryGames";
import type { UserCategory } from "../../api/user.api";
import SysIcon from "../Icon";
import GameArtwork from "../explore/GameArtwork";
import {
    formatLibraryRelease,
    formatLibraryPrice,
} from "./library.utils";

type LibraryGameCardProps = {
    categoryOptions: UserCategory[];
    game: LibraryGame;
    isUpdatingCategory: boolean;
    onCategoryChange: (categoryId: number | null) => void;
};

const LibraryGameCard: React.FC<LibraryGameCardProps> = ({
    categoryOptions,
    game,
    isUpdatingCategory,
    onCategoryChange,
}) => {
    return (
        <article className="library-game-card">
            <div className="library-game-cover-wrap">
                <GameArtwork
                    alt={game.title}
                    className="library-game-cover"
                    fallbackClassName="library-game-cover library-game-cover-fallback"
                    src={game.coverUrl}
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

                <label className="library-category-picker">
                    <span>Category</span>
                    <select
                        disabled={isUpdatingCategory}
                        onChange={(event) =>
                            onCategoryChange(
                                event.target.value ? Number(event.target.value) : null,
                            )
                        }
                        value={game.category_id ?? ""}
                    >
                        <option value="">Uncategorized</option>
                        {categoryOptions.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </article>
    );
};

export default LibraryGameCard;
