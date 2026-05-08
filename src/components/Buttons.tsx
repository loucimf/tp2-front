import { useState } from "react";

interface BaseButtonProps {
    disabled?: boolean;
    onClick?: () => void;
    label?: string;
    type?: "button" | "submit";
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
