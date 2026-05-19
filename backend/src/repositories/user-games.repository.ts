import { supabase } from "../db/supabase.js";
import {
  type CreateUserGameInput,
  type UpdateUserGameInput,
  type UserGame,
  type UserGameRecord,
  toUserGame,
} from "../models/user-game.model.js";

const USER_GAMES_TABLE = "user_games";
const USER_GAME_COLUMNS =
  "id,user_id,game_api_id,title,release_date,price,created_at";

function toUserGameRecord(input: CreateUserGameInput) {
  return {
    user_id: input.userId,
    game_api_id: input.gameApiId,
    title: input.title,
    release_date: input.releaseDate ?? null,
    price: input.price ?? null,
  };
}

function toUserGameUpdate(input: UpdateUserGameInput) {
  return {
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.releaseDate !== undefined
      ? { release_date: input.releaseDate }
      : {}),
    ...(input.price !== undefined ? { price: input.price } : {}),
  };
}

export async function listUserGames(userId: string): Promise<UserGame[]> {
  const { data, error } = await supabase
    .from(USER_GAMES_TABLE)
    .select(USER_GAME_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as UserGameRecord[]).map(toUserGame);
}

export async function deleteUserGame(
  userId: string,
  gameApiId: number,
): Promise<void> {
  const { error } = await supabase
    .from(USER_GAMES_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("game_api_id", gameApiId);

  if (error) throw error;
}

export async function upsertUserGame(
  input: CreateUserGameInput,
): Promise<UserGame> {
  const { data, error } = await supabase
    .from(USER_GAMES_TABLE)
    .upsert(toUserGameRecord(input), {
      onConflict: "user_id,game_api_id",
    })
    .select(USER_GAME_COLUMNS)
    .single();

  if (error) throw error;

  return toUserGame(data as UserGameRecord);
}

export async function updateUserGame(
  userId: string,
  gameApiId: number,
  input: UpdateUserGameInput,
): Promise<UserGame | null> {
  const { data, error } = await supabase
    .from(USER_GAMES_TABLE)
    .update(toUserGameUpdate(input))
    .eq("user_id", userId)
    .eq("game_api_id", gameApiId)
    .select(USER_GAME_COLUMNS)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return toUserGame(data as UserGameRecord);
}
