import { useState } from "react";

type GameArtworkProps = {
    alt: string;
    className?: string;
    fallbackClassName?: string;
    src: string | null;
};

const GameArtwork: React.FC<GameArtworkProps> = ({
    alt,
    className,
    fallbackClassName,
    src,
}) => {
    const [hasError, setHasError] = useState(false);
    const shouldRenderImage = Boolean(src) && !hasError;

    if (!shouldRenderImage) {
        return (
            <div className={fallbackClassName ?? className} aria-label={alt} role="img">
                <span>{alt}</span>
            </div>
        );
    }

    return (
        <img
            alt={alt}
            className={className}
            loading="lazy"
            referrerPolicy="no-referrer"
            src={src ?? undefined}
            onError={() => setHasError(true)}
        />
    );
};

export default GameArtwork;
