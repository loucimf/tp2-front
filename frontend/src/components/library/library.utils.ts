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

export const formatLibraryPrice = (value: number | null) => {
    if (value === null) {
        return "Not set";
    }

    return new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
    }).format(value);
};

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
