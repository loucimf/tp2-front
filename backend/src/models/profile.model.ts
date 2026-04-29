export interface Profile {
  id: string;
  username: string | null;
  avatarUrl: string | null;
  updatedAt: string;
}

export interface CreateProfileInput {
  id: string;
  username?: string | null;
  avatarUrl?: string | null;
  updatedAt?: string;
}

export interface UpdateProfileInput {
  username?: string | null;
  avatarUrl?: string | null;
  updatedAt?: string;
}

export interface ProfileRecord {
  id: string;
  username: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export function toProfile(record: ProfileRecord): Profile {
  return {
    id: record.id,
    username: record.username,
    avatarUrl: record.avatar_url,
    updatedAt: record.updated_at,
  };
}

export const profileModelExample: Profile = {
  id: "00000000-0000-0000-0000-000000000000",
  username: "player@example.com",
  avatarUrl: null,
  updatedAt: new Date(0).toISOString(),
};

export const emptyProfileListResponse: Profile[] = [];
