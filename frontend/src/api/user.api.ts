
export type UserLibraryGame = {
    id: number;
    userId: string;
    gameApiId: number;
    title: string;
    releaseDate: string | null;
    price: number | null;
    category_id: number | null;
    createdAt: string;
};

export type UserCategory = {
    id: number;
    userId: string;
    title: string;
    createdAt: string;
};

export class UserAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }

    async getGamesLibrary(input: {
        accessToken?: string;
        userId: string;
    }) {
        try {
            const searchParams = new URLSearchParams({
                userId: input.userId,
            });
            const response = await fetch(`${this.baseUrl}/user-games/library?${searchParams.toString()}`, {
                method: "GET",
                headers: this.getHeaders(input.accessToken),
            });
            if (!response.ok) {
                throw new Error(`Error fetching user's game library: ${response.statusText}`);
            }
            return await response.json() as { items: UserLibraryGame[] };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCategories(input: {
        accessToken?: string;
        userId: string;
    }) {
        try {
            const searchParams = new URLSearchParams({
                userId: input.userId,
            });
            const response = await fetch(`${this.baseUrl}/user-games/categories?${searchParams.toString()}`, {
                method: "GET",
                headers: this.getHeaders(input.accessToken),
            });

            if (!response.ok) {
                throw new Error(`Error fetching user's categories: ${response.statusText}`);
            }

            return await response.json() as { items: UserCategory[] };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createCategory(input: {
        accessToken?: string;
        title: string;
        userId: string;
    }) {
        try {
            const response = await fetch(`${this.baseUrl}/user-games/categories`, {
                method: "POST",
                headers: this.getHeaders(input.accessToken),
                body: JSON.stringify({
                    title: input.title,
                    userId: input.userId,
                }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ?? `Error creating category: ${response.statusText}`,
                );
            }

            return data as { item: UserCategory };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addGameToLibrary(input: {
        accessToken?: string;
        backgroundImage?: string | null;
        gameId: number;
        price?: number | null;
        releaseDate?: string | null;
        title: string;
        userId: string;
    }) {
        try {
            const searchParams = new URLSearchParams({
                gameId: String(input.gameId),
                title: input.title,
                userId: input.userId,
            });

            if (input.releaseDate) {
                searchParams.set("releaseDate", input.releaseDate);
            }

            if (input.price !== undefined && input.price !== null) {
                searchParams.set("price", String(input.price));
            }

            const response = await fetch(
                `${this.baseUrl}/user-games/library?${searchParams.toString()}`,
                {
                    method: "PUT",
                    headers: this.getHeaders(input.accessToken),
                },
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ?? `Error adding game to library: ${response.statusText}`,
                );
            }

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateGameCategory(input: {
        accessToken?: string;
        categoryId: number | null;
        gameId: number;
        userId: string;
    }) {
        try {
            const searchParams = new URLSearchParams({
                gameId: String(input.gameId),
                userId: input.userId,
            });

            if (input.categoryId !== null) {
                searchParams.set("categoryId", String(input.categoryId));
            }

            const response = await fetch(
                `${this.baseUrl}/user-games/library?${searchParams.toString()}`,
                {
                    method: "PUT",
                    headers: this.getHeaders(input.accessToken),
                },
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error ?? `Error updating game category: ${response.statusText}`,
                );
            }

            return data as { item: UserLibraryGame };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private getHeaders(accessToken?: string) {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        return headers;
    }
}
