/**
 * User Service - Data abstraction layer for user operations
 * 
 * Currently returns mock data. To switch to database:
 * 1. Import supabase client
 * 2. Replace mock data returns with database queries
 * 3. UI components remain unchanged
 */

import { UserProfile, AppRole } from '@/types/database';
import { mockUsers, mockUserRoles, CURRENT_USER_ID } from '@/data/mockUsers';

// Flag to easily switch between mock and database
const USE_DATABASE = false;

/**
 * Get the current authenticated user's profile
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('user_id', auth.uid())
    //   .maybeSingle();
    // return data;
  }
  
  return mockUsers.find(u => u.user_id === CURRENT_USER_ID) ?? null;
}

/**
 * Get a user profile by user_id
 */
export async function getUserById(userId: string): Promise<UserProfile | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockUsers.find(u => u.user_id === userId) ?? null;
}

/**
 * Get a user profile by profile id
 */
export async function getUserByProfileId(profileId: string): Promise<UserProfile | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockUsers.find(u => u.id === profileId) ?? null;
}

/**
 * Get all users (admin only in production)
 */
export async function getAllUsers(): Promise<UserProfile[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch with admin check
  }
  
  return mockUsers;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'full_name' | 'profession' | 'avatar_url'>>
): Promise<UserProfile | null> {
  if (USE_DATABASE) {
    // TODO: Implement database update
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .update({ ...updates, updated_at: new Date().toISOString() })
    //   .eq('user_id', userId)
    //   .select()
    //   .single();
    // return data;
  }
  
  // Mock update - find and update user in memory
  const userIndex = mockUsers.findIndex(u => u.user_id === userId);
  if (userIndex === -1) return null;
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  return mockUsers[userIndex];
}

/**
 * Check if user has a specific role
 */
export async function hasRole(userId: string, role: AppRole): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Use the has_role database function
    // const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: role });
    // return data ?? false;
  }
  
  const user = mockUsers.find(u => u.user_id === userId);
  return user?.roles.includes(role) ?? false;
}

/**
 * Get user's roles
 */
export async function getUserRoles(userId: string): Promise<AppRole[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockUserRoles
    .filter(r => r.user_id === userId)
    .map(r => r.role);
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  return hasRole(userId, 'admin');
}

/**
 * Check if user is channel admin for any channel
 */
export async function isChannelAdmin(userId: string): Promise<boolean> {
  return hasRole(userId, 'channel_admin');
}

// Legacy compatibility - synchronous version for immediate use in components
// These will be deprecated once we fully migrate to async data fetching

export function getCurrentUserSync(): UserProfile | null {
  return mockUsers.find(u => u.user_id === CURRENT_USER_ID) ?? null;
}

export function getUserByIdSync(userId: string): UserProfile | null {
  return mockUsers.find(u => u.user_id === userId) ?? null;
}
