// Database-aligned types for future migration
// These types mirror the database schema exactly

export type AppRole = 'admin' | 'channel_admin' | 'user';

export interface DbUser {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  profession: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbUserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface DbChannel {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  member_count: number;
  post_count: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface DbChannelAdmin {
  id: string;
  channel_id: string;
  user_id: string;
  created_at: string;
}

// Extended user type with computed fields for UI
export interface UserProfile extends DbUser {
  badge?: string;
  joinedChannels: string[];
  stats: {
    posts: number;
    likes: number;
    following: number;
  };
  roles: AppRole[];
}

// Extended channel type with computed fields for UI
export interface ChannelWithDetails extends DbChannel {
  isJoined?: boolean;
  admins?: string[];
}
