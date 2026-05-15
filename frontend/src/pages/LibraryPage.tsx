import DashboardFeedbackCard from "../components/dashboard/DashboardFeedbackCard";
import DashboardPage from "../components/dashboard/DashboardPage";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import DashboardSelectControl from "../components/dashboard/DashboardSelectControl";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import LibraryCategorySection from "../components/library/LibraryCategorySection";
import { LibrarySortOption, useLibraryGames } from "../hooks/useLibraryGames";

const LibraryPage: React.FC = () => {
    const {
        availableCategories,
        categories,
        error,
        gamesCount,
        isLoading,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        setSortOption,
        sortOption,
    } = useLibraryGames();

    return (
        <DashboardPage
            className="library-page"
            topbar={
                <DashboardTopbar
                    inputId="library-search"
                    onSearchChange={setSearchTerm}
                    placeholder="Search your library..."
                    value={searchTerm}
                />
            }
        >
            <section className="library-header">
                <DashboardSectionHeader
                    copy={`${gamesCount} games in your collection`}
                    title="My Library"
                    actions={
                        <div className="library-toolbar">
                            <DashboardSelectControl
                                label="Filter"
                                onChange={setSelectedCategory}
                                options={availableCategories.map((category) => ({
                                    label: category,
                                    value: category,
                                }))}
                                value={selectedCategory}
                            />
                            <DashboardSelectControl
                                label="Sort:"
                                onChange={(value) =>
                                    setSortOption(value as LibrarySortOption)
                                }
                                options={[
                                    { label: "Recent", value: "recent" },
                                    { label: "Popular", value: "popular" },
                                    { label: "Title", value: "title" },
                                ]}
                                value={sortOption}
                            />
                        </div>
                    }
                />
            </section>

            {error ? (
                <DashboardFeedbackCard
                    copy={error}
                    title="Unable to load your library"
                    tone="error"
                />
            ) : !isLoading && !categories.length ? (
                <DashboardFeedbackCard
                    copy="Try another search or category filter to repopulate your library."
                    title="No games found in this library view"
                />
            ) : (
                <div className="library-sections">
                    {(isLoading
                        ? [
                              { count: 4, games: [], id: "loading-action", name: "Action" },
                              { count: 4, games: [], id: "loading-rpg", name: "RPG" },
                          ]
                        : categories
                    ).map((category) => (
                        <LibraryCategorySection
                            key={category.id}
                            category={category}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            )}
        </DashboardPage>
    );
};

export default LibraryPage;
