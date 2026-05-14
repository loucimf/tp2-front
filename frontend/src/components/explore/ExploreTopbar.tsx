import SysIcon from "../Icon";
import ExploreIconButton from "./ExploreIconButton";

type ExploreTopbarProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

const ExploreTopbar: React.FC<ExploreTopbarProps> = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <header className="explore-topbar">
            <div className="explore-searchbar">
                <label className="explore-search-input" htmlFor="explore-search">
                    <SysIcon type="explore" className="explore-search-icon" />
                    <input
                        id="explore-search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search games, genres, or publishers..."
                    />
                </label>

                <ExploreIconButton icon="filter" label="Filter games" />
            </div>

            <div className="explore-topbar-actions">
                <ExploreIconButton icon="bell" label="Notifications" />
                <ExploreIconButton icon="save" label="Saved games" />
            </div>
        </header>
    );
};

export default ExploreTopbar;
