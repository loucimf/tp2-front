import { useState } from "react";
import { useGames } from "../hooks/useGames";

const GAMES_PER_PAGE = 4;

const formatReleaseDate = (releaseDate: string | null) => {
	if (!releaseDate) {
		return "TBA";
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(releaseDate));
};

const formatRating = (rating: number, topRating: number) => {
	if (!rating || !topRating) {
		return "Unrated";
	}

	return `${rating.toFixed(1)} / ${topRating}`;
};

export const GamesRow: React.FC = () => {
	const [page, setPage] = useState(1);
	const { count, error, games, isLoading, next, previous } = useGames({
		page,
		pageSize: GAMES_PER_PAGE,
	});

	const totalPages = Math.max(1, Math.ceil(count / GAMES_PER_PAGE));

	return (
		<section className="games-section">
			<div className="games-section-header">
				<div>
					<p className="eyebrow">Explore</p>
					<h1 className="games-title">Featured games</h1>
					<p className="games-subtitle">
						Fresh picks from the live RAWG catalogue.
					</p>
				</div>
				<div className="games-pagination">
					<button
						type="button"
						className="games-page-btn"
						disabled={!previous || isLoading}
						onClick={() =>
							setPage((currentPage) => Math.max(1, currentPage - 1))
						}
					>
						Previous
					</button>
					<span className="games-page-indicator">
						Page {page} of {totalPages}
					</span>
					<button
						type="button"
						className="games-page-btn"
						disabled={!next || isLoading}
						onClick={() => setPage((currentPage) => currentPage + 1)}
					>
						Next
					</button>
				</div>
			</div>

			{error ? (
				<div className="games-state-card">
					<p className="games-state-title">Unable to load games.</p>
					<p className="games-state-copy">{error}</p>
				</div>
			) : null}

			{isLoading ? (
				<div className="games-grid">
					{Array.from({ length: GAMES_PER_PAGE }).map((_, index) => (
						<article key={index} className="game-card game-card-skeleton" />
					))}
				</div>
			) : null}

			{!isLoading && !error ? (
				<div className="games-grid">
					{games.map((game) => (
						<article key={game.id} className="game-card">
							<div className="game-cover-wrap">
								{game.background_image ? (
									<img
										className="game-cover"
										src={game.background_image}
										alt={`${game.name} cover art`}
										loading="lazy"
									/>
								) : (
									<div className="game-cover game-cover-fallback">
										No image
									</div>
								)}
							</div>

							<div className="game-card-body">
								<div className="game-card-heading">
									<h2 className="game-name">{game.name}</h2>
									<span className="game-release-badge">
										{formatReleaseDate(game.released)}
									</span>
								</div>

								<div className="game-stats">
									<div className="game-stat">
										<span className="game-stat-label">Rating</span>
										<strong>{formatRating(game.rating, game.rating_top)}</strong>
									</div>
									<div className="game-stat">
										<span className="game-stat-label">Metacritic</span>
										<strong>{game.metacritic ?? "N/A"}</strong>
									</div>
									<div className="game-stat">
										<span className="game-stat-label">Slug</span>
										<strong>{game.slug}</strong>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			) : null}
		</section>
	);
};

export default GamesRow;
