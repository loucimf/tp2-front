
export class UserAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }

    async getGamesLibrary() {
        try {
            const response = await fetch(`${this.baseUrl}/user-games/library`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching user's game library: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addGameToLibrary(input: {
        accessToken?: string;
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

            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };

            if (input.accessToken) {
                headers.Authorization = `Bearer ${input.accessToken}`;
            }

            const response = await fetch(
                `${this.baseUrl}/user-games/library?${searchParams.toString()}`,
                {
                    method: "PUT",
                    headers,
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
}
