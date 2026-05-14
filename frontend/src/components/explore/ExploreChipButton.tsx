type ExploreChipButtonProps = {
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
};

const ExploreChipButton: React.FC<ExploreChipButtonProps> = ({
    active = false,
    children,
    onClick,
}) => {
    return (
        <button
            className={`explore-chip ${active ? "active" : ""}`.trim()}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ExploreChipButton;
