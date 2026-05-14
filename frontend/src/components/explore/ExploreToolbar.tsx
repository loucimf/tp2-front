import { ExploreSortOption } from "../../hooks/useExploreGames";
import ExploreChipButton from "./ExploreChipButton";

type ExploreToolbarProps = {
    availableGenres: string[];
    selectedGenre: string;
    setSelectedGenre: (value: string) => void;
    setSortOption: (value: ExploreSortOption) => void;
    setPage: (page: number) => void;
    sortOption: ExploreSortOption;
};

const ExploreToolbar: React.FC<ExploreToolbarProps> = ({
    availableGenres,
    selectedGenre,
    setSelectedGenre,
    setSortOption,
    setPage,
    sortOption,
}) => {
    return (
        <>
            <div className="explore-chip-row" aria-label="Genre filters">
                {availableGenres.map((genre) => (
                    <ExploreChipButton
                        key={genre}
                        active={genre === selectedGenre}
                        onClick={() => setSelectedGenre(genre)}
                    >
                        {genre}
                    </ExploreChipButton>
                ))}
            </div>

            <label className="explore-sort">
                <span>Sort by:</span>
                <select
                    value={sortOption}
                    onChange={(event) => {
                        setSortOption(event.target.value as ExploreSortOption);
                        setPage(1);
                    }}
                >
                    <option value="popular">Popular</option>
                    <option value="score">Metacritic</option>
                    <option value="newest">Newest</option>
                </select>
            </label>
        </>
    );
};

export default ExploreToolbar;
