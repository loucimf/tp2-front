import SysIcon, { SVGIcons } from "../Icon";

type DashboardIconButtonProps = {
    className?: string;
    icon: SVGIcons;
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

const DashboardIconButton: React.FC<DashboardIconButtonProps> = ({
    className,
    icon,
    label,
    onClick,
    type = "button",
}) => {
    return (
        <button
            aria-label={label}
            className={`dashboard-icon-button ${className ?? ""}`.trim()}
            type={type}
            onClick={onClick}
        >
            <SysIcon type={icon} className="dashboard-inline-icon" />
        </button>
    );
};

export default DashboardIconButton;
