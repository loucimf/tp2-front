import SysIcon, { SVGIcons } from "../Icon";

type ExploreIconButtonProps = {
    className?: string;
    icon: SVGIcons;
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

const ExploreIconButton: React.FC<ExploreIconButtonProps> = ({
    className,
    icon,
    label,
    onClick,
    type = "button",
}) => {
    return (
        <button
            aria-label={label}
            className={`explore-icon-button ${className ?? ""}`.trim()}
            type={type}
            onClick={onClick}
        >
            <SysIcon type={icon} className="explore-inline-icon" />
        </button>
    );
};

export default ExploreIconButton;
