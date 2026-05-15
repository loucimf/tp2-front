import SysIcon, { SVGIcons } from "./Icon";

interface BaseButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    label: string;
    type?: "button" | "submit";
    icon?: SVGIcons;
    className?: string;
}

export const SidebarButton: React.FC<BaseButtonProps> = ({
    disabled = false,
    onClick,
    label,
    type = "button",
    icon,
    className,
}) => {

    return (        
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`btn sidebar-nav-button ${className ?? ""}`.trim()}
        >
            {icon ? <SysIcon type={icon} className="sidebar-nav-icon" /> : null}
            <span>{label}</span>
        </button>
    );
};
