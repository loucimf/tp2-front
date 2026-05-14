import { useState } from "react";
import SysIcon, { SVGIcons } from "./Icon";

interface BaseButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    label?: string;
    type?: "button" | "submit";
    icon?: SVGIcons;
}

export const CredentialButton: React.FC<BaseButtonProps> = ({
    disabled = false,
    onClick,
    label,
    type = "button",
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
            className={`flex width center input btn credential-btn ${active ? "active" : ""}`}
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
}) => {

    const [active, setActive] = useState(false);

    const style = {
        height: "3.5rem",
    }

    const handleButton = () => {
        if (disabled) {
            return;
        }

        setActive(true);
        if (onClick) onClick();
    }

    return (        
        <div
            style={style}
            onClick={() => handleButton()}
            className={`flex align-center justify-start padding-md pointer btn ${active ? "active" : ""}`}
            onMouseOver={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {icon && <SysIcon type={icon} />}
            {label}
        </div>
    );
}