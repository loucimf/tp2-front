export interface UserCategory {
  id: number;
  userId: string;
  title: string;
  createdAt: string;
}

export interface UserCategoryRecord {
  id: number;
  user_id: string;
  title: string;
  created_at: string;
}

export function toUserCategory(record: UserCategoryRecord): UserCategory {
  return {
    id: record.id,
    userId: record.user_id,
    title: record.title,
    createdAt: record.created_at,
  };
}
