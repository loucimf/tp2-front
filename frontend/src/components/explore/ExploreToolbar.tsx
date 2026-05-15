import { ExploreSortOption } from "../../hooks/useExploreGames";
import DashboardSelectControl from "../dashboard/DashboardSelectControl";
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

            <DashboardSelectControl
                label="Sort by:"
                onChange={(value) => {
                    setSortOption(value as ExploreSortOption);
                    setPage(1);
                }}
                options={[
                    { label: "Popular", value: "popular" },
                    { label: "Metacritic", value: "score" },
                    { label: "Newest", value: "newest" },
                ]}
                value={sortOption}
            />
        </>
    );
};

export default ExploreToolbar;
