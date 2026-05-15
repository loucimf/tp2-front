import { RawgGame } from "../../hooks/useGames";
import { SVGIcons } from "../Icon";

export const formatLibraryRelease = (value: string | null) => {
    if (!value) {
        return "TBA";
    }

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
};

export const formatLibraryRating = (value: number, top: number) =>
    `${value.toFixed(1)} / ${top.toFixed(1)}`;

export const formatLibraryReviews = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

export const formatPlaytime = (value: number) => `${value.toFixed(1)} hrs`;

export const getLibraryCardChips = (game: RawgGame) =>
    game.genres.slice(0, 2).map((genre) => genre.name);

export const getCategoryIcon = (category: string): SVGIcons => {
    const name = category.toLowerCase();

    if (name.includes("rpg") || name.includes("role-playing")) {
        return "star";
    }

    if (name.includes("action") || name.includes("shooter") || name.includes("adventure")) {
        return "play";
    }

    if (name.includes("strategy") || name.includes("simulation")) {
        return "filter";
    }

    if (name.includes("racing") || name.includes("sports")) {
        return "trending";
    }

    if (name.includes("indie") || name.includes("puzzle")) {
        return "offer";
    }

    return "library";
};
