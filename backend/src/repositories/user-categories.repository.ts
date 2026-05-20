import { supabase } from "../db/supabase.js";
import {
  type UserCategory,
  type UserCategoryRecord,
  toUserCategory,
} from "../models/user-categories.model.js";

const USER_CATEGORIES_TABLE = "user_categories";
const USER_CATEGORY_COLUMNS = "id,user_id,title,created_at";

export async function listUserCategories(
  userId: string,
): Promise<UserCategory[]> {
  const { data, error } = await supabase
    .from(USER_CATEGORIES_TABLE)
    .select(USER_CATEGORY_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return ((data ?? []) as UserCategoryRecord[]).map(toUserCategory);
}

export async function createUserCategory(
  userId: string,
  title: string,
): Promise<UserCategory> {
  const { data, error } = await supabase
    .from(USER_CATEGORIES_TABLE)
    .insert({
      user_id: userId,
      title,
    })
    .select(USER_CATEGORY_COLUMNS)
    .single();

  if (error) throw error;

  return toUserCategory(data as UserCategoryRecord);
}
