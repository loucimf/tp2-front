import { useState } from "react";


interface BaseButtonProps {
    onClick?: () => void;
    label?: string;
}

export const CredentialButton: React.FC<BaseButtonProps> = ({ onClick, label }) => { 

    const [active, setActive] = useState(false);

    const handleButton = () => {
        setActive(true);
        if (onClick) onClick();
    }

    return (
        <div
            className={`flex width center input btn ${active ? "active" : ""}`}
            onClick={handleButton}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onMouseLeave={() => setActive(false)}
        >
            {label}
        </div>
    );
}