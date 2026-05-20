import { useState } from "react";
import DashboardFeedbackCard from "../components/dashboard/DashboardFeedbackCard";
import DashboardPage from "../components/dashboard/DashboardPage";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import DashboardSelectControl from "../components/dashboard/DashboardSelectControl";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import LibraryCategorySection from "../components/library/LibraryCategorySection";
import type { UseAuthResult } from "../hooks/useAuth";
import { LibrarySortOption, useLibraryGames } from "../hooks/useLibraryGames";

type LibraryPageProps = {
    auth: UseAuthResult;
};

const LibraryPage: React.FC<LibraryPageProps> = ({ auth }) => {
    const [categoryTitle, setCategoryTitle] = useState("");
    const {
        availableCategories,
        categories,
        createCategory,
        customCategories,
        error,
        gamesCount,
        isCreatingCategory,
        isLoading,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        setSortOption,
        sortOption,
        updateGameCategory,
        updatingCategoryGameId,
    } = useLibraryGames(auth);

    const handleCreateCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const created = await createCategory(categoryTitle);

        if (created) {
            setCategoryTitle("");
        }
    };

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
                            <form
                                className="library-category-form"
                                onSubmit={handleCreateCategory}
                            >
                                <input
                                    aria-label="New category name"
                                    onChange={(event) => setCategoryTitle(event.target.value)}
                                    placeholder="New category"
                                    value={categoryTitle}
                                />
                                <button
                                    type="submit"
                                    disabled={isCreatingCategory || !categoryTitle.trim()}
                                >
                                    Create
                                </button>
                            </form>
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
                    copy="Add games from Explore or create a category to start organizing your collection."
                    title="No saved games found"
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
                            categoryOptions={customCategories}
                            isLoading={isLoading}
                            onCategoryChange={(gameId, categoryId) => {
                                const game = category.games.find((item) => item.id === gameId);

                                if (game) {
                                    void updateGameCategory(game, categoryId);
                                }
                            }}
                            updatingGameId={updatingCategoryGameId}
                        />
                    ))}
                </div>
            )}
        </DashboardPage>
    );
};

export default LibraryPage;
