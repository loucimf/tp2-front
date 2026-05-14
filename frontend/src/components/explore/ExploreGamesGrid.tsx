import { RawgGame } from "../../hooks/useGames";
import SysIcon from "../Icon";
import {
    buildPageItems,
    buildGameSummary,
    formatRating,
    formatReleaseShort,
} from "./explore.utils";

type ExploreGamesGridProps = {
    currentPage: number;
    games: RawgGame[];
    isLoading: boolean;
    onPageChange: (page: number) => void;
    totalPages: number;
};

const ExploreGamesGrid: React.FC<ExploreGamesGridProps> = ({
    currentPage,
    games,
    isLoading,
    onPageChange,
    totalPages,
}) => {
    const pageItems = buildPageItems(currentPage, totalPages);

    return (
        <>
            <div className="explore-games-grid">
                {isLoading
                    ? Array.from({ length: 4 }, (_, index) => (
                          <article
                              key={`skeleton-${index}`}
                              className="explore-game-card explore-game-card-skeleton"
                              aria-hidden="true"
                          />
                      ))
                    : games.map((game) => (
                          <article key={game.id} className="explore-game-card">
                              <div className="explore-game-cover-wrap">
                                  {game.background_image ? (
                                      <img
                                          alt={game.name}
                                          className="explore-game-cover"
                                          src={game.background_image}
                                      />
                                  ) : (
                                      <div className="explore-game-cover explore-game-cover-fallback">
                                          {game.name}
                                      </div>
                                  )}

                                  <span className="explore-game-rating-pill">
                                      <SysIcon type="star" className="explore-inline-icon" />
                                      {formatRating(game.rating)}
                                  </span>
                              </div>

                              <div className="explore-game-body">
                                  <div className="explore-game-copy">
                                      <h3>{game.name}</h3>
                                      <p>{buildGameSummary(game)}</p>
                                  </div>

                                  <div className="explore-game-footer">
                                      <div className="explore-game-release">
                                          <span>Released</span>
                                          <strong>{formatReleaseShort(game.released)}</strong>
                                      </div>

                                      <button
                                          type="button"
                                          className="explore-card-action"
                                          aria-label={`Save ${game.name}`}
                                      >
                                          <SysIcon type="plus" className="explore-inline-icon" />
                                      </button>
                                  </div>
                              </div>
                          </article>
                      ))}
            </div>

            <nav className="explore-pagination" aria-label="Games pagination">
                <button
                    type="button"
                    className="explore-page-arrow"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <span aria-hidden="true">‹</span>
                </button>

                {pageItems.map((item, index) =>
                    item === "..." ? (
                        <span key={`ellipsis-${index}`} className="explore-page-ellipsis">
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            className={`explore-page-pill ${item === currentPage ? "active" : ""}`}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    ),
                )}

                <button
                    type="button"
                    className="explore-page-arrow"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <span aria-hidden="true">›</span>
                </button>
            </nav>
        </>
    );
};

export default ExploreGamesGrid;
