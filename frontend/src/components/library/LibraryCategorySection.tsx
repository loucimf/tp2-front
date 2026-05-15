import { LibraryCategory } from "../../hooks/useLibraryGames";
import SysIcon from "../Icon";
import LibraryGameCard from "./LibraryGameCard";
import { getCategoryIcon } from "./library.utils";

type LibraryCategorySectionProps = {
    category: LibraryCategory;
    isLoading: boolean;
};

const LibraryCategorySection: React.FC<LibraryCategorySectionProps> = ({
    category,
    isLoading,
}) => {
    return (
        <section className="library-category-section" aria-labelledby={`library-category-${category.id}`}>
            <header className="library-category-header">
                <div className="library-category-title">
                    <SysIcon
                        type={getCategoryIcon(category.name)}
                        className="library-category-icon"
                    />
                    <h2 id={`library-category-${category.id}`}>{category.name}</h2>
                </div>
                <span className="library-category-count">{category.count} games</span>
            </header>

            <div className="library-category-grid">
                {isLoading
                    ? Array.from({ length: 4 }, (_, index) => (
                          <article
                              key={`${category.id}-skeleton-${index}`}
                              className="library-game-card library-game-card-skeleton"
                              aria-hidden="true"
                          />
                      ))
                    : category.games.map((game) => (
                          <LibraryGameCard key={game.id} game={game} />
                      ))}
            </div>
        </section>
    );
};

export default LibraryCategorySection;
