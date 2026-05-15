import { buildPageItems } from "./explore.utils";

type ExplorePaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
};

const ExplorePagination: React.FC<ExplorePaginationProps> = ({
    currentPage,
    onPageChange,
    totalPages,
}) => {
    const pageItems = buildPageItems(currentPage, totalPages);

    return (
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
    );
};

export default ExplorePagination;
