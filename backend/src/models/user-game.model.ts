export interface UserGame {
  id: number;
  userId: string;
  gameApiId: number;
  title: string;
  releaseDate: string | null;
  price: number | null;
  category: number | null;
  createdAt: string;
}

export interface CreateUserGameInput {
  userId: string;
  gameApiId: number;
  title: string;
  releaseDate?: string | null;
  price?: number | null;
  category?: number | null;
}

export interface UpdateUserGameInput {
  title?: string;
  releaseDate?: string | null;
  price?: number | null;
  category?: number | null;
}

export interface UserGameRecord {
  id: number;
  user_id: string;
  game_api_id: number;
  title: string;
  release_date: string | null;
  price: string | number | null;
  category: number | null;
  created_at: string;
}

export function toUserGame(record: UserGameRecord): UserGame {
  return {
    id: record.id,
    userId: record.user_id,
    gameApiId: record.game_api_id,
    title: record.title,
    releaseDate: record.release_date,
    price:
      typeof record.price === "string" ? Number(record.price) : record.price,
    category: record.category,
    createdAt: record.created_at,
  };
}

export const userGameModelExample: UserGame = {
  id: 1,
  userId: "00000000-0000-0000-0000-000000000000",
  gameApiId: 3498,
  title: "Grand Theft Auto V",
  releaseDate: "2013-09-17",
  price: 59.99,
  category: null,
  createdAt: new Date(0).toISOString(),
};

export const emptyUserGameListResponse: UserGame[] = [];
