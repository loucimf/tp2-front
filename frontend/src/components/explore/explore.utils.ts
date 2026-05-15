import { RawgGame } from "../../hooks/useGames";
import { SVGIcons } from "../Icon";

export const formatReleaseDate = (value: string | null) => {
    if (!value) {
        return "TBA";
    }

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
};

export const formatReleaseShort = (value: string | null) => {
    if (!value) {
        return "Coming soon";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(new Date(value));
};

export const formatRating = (value: number) => value.toFixed(1);

export const getGenreLabels = (game: RawgGame) =>
    game.genres.slice(0, 3).map((genre) => genre.name);

export const getPlatformIcons = (game: RawgGame): SVGIcons[] =>
    game.parent_platforms
        .map(({ platform }) => {
            if (platform.slug.includes("pc")) {
                return "windows" as const;
            }

            if (platform.slug.includes("playstation")) {
                return "playstation" as const;
            }

            if (platform.slug.includes("xbox")) {
                return "xbox" as const;
            }

            return null;
        })
        .filter(
            (icon): icon is "playstation" | "windows" | "xbox" => icon !== null,
        )
        .slice(0, 3);

export const getPlatformNames = (game: RawgGame) =>
    game.parent_platforms.slice(0, 3).map(({ platform }) => platform.name);

export const buildGameSummary = (game: RawgGame) => {
    const genres = getGenreLabels(game);
    const platforms = getPlatformNames(game);

    if (genres.length && platforms.length) {
        return `${genres.slice(0, 2).join(" / ")} built for ${platforms[0]} and beyond.`;
    }

    if (genres.length) {
        return `${genres.slice(0, 2).join(" / ")} with a strong community following.`;
    }

    if (platforms.length) {
        return `Available on ${platforms.join(", ")}.`;
    }

    return "Discover one of the most talked-about games in the catalog.";
};

export const splitAccentTitle = (title: string) => {
    const words = title.trim().split(/\s+/);

    if (words.length === 1) {
        return { lead: title, accent: "" };
    }

    return {
        lead: words.slice(0, -1).join(" "),
        accent: words.at(-1) ?? "",
    };
};

export const buildPageItems = (page: number, totalPages: number) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items: Array<number | "..."> = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    if (start > 2) {
        items.push("...");
    }

    for (let current = start; current <= end; current += 1) {
        items.push(current);
    }

    if (end < totalPages - 1) {
        items.push("...");
    }

    items.push(totalPages);

    return items;
};
