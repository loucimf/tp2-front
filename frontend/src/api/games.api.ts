
export class GamesAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/+$/, "");
    }

    async getGamesCatalogue(params?: {
        ordering?: string;
        page?: number;
        pageSize?: number;
    }) {
        try {
            const searchParams = new URLSearchParams();

            if (params?.page) {
                searchParams.set("page", String(params.page));
            }

            if (params?.pageSize) {
                searchParams.set("page_size", String(params.pageSize));
            }

            if (params?.ordering) {
                searchParams.set("ordering", params.ordering);
            }

            const queryString = searchParams.toString();
            const response = await fetch(
                `${this.baseUrl}/games${queryString ? `?${queryString}` : ""}`,
            );

            if (!response.ok) {
                throw new Error(`Error fetching games: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
