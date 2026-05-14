import { useState } from "react";
import SysIcon, { SVGIcons } from "./Icon";

interface BaseButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    label?: string;
    type?: "button" | "submit";
    icon?: SVGIcons;
    className?: string;
}

export const CredentialButton: React.FC<BaseButtonProps> = ({
    disabled = false,
    onClick,
    label,
    type = "button",
    className,
}) => { 

    const [active, setActive] = useState(false);

    const handleButton = () => {
        if (disabled) {
            return;
        }

        setActive(true);
        if (onClick) onClick();
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={`flex width center input btn credential-btn ${className ?? ""} ${active ? "active" : ""}`.trim()}
            onClick={handleButton}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onMouseLeave={() => setActive(false)}
        >
            {label}
        </button>
    );
};

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
