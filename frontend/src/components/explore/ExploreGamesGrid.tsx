import { RawgGame } from "../../hooks/useGames";
import SysIcon from "../Icon";
import GameArtwork from "./GameArtwork";
import ExplorePagination from "./ExplorePagination";
import {
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
                                  <GameArtwork
                                      alt={game.name}
                                      className="explore-game-cover"
                                      fallbackClassName="explore-game-cover explore-game-cover-fallback"
                                      src={game.background_image}
                                  />

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

            <ExplorePagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
            />
        </>
    );
};

export default ExploreGamesGrid;
