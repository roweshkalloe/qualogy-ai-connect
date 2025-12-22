/**
 * Channel Service - Data abstraction layer for channel operations
 * 
 * Currently returns mock data. To switch to database:
 * 1. Import supabase client
 * 2. Replace mock data returns with database queries
 * 3. UI components remain unchanged
 */

import { ChannelWithDetails, DbChannelAdmin } from '@/types/database';
import { mockChannels, mockChannelAdmins } from '@/data/mockChannels';
import { getCurrentUserSync } from './userService';

// Flag to easily switch between mock and database
const USE_DATABASE = false;

/**
 * Get all channels
 */
export async function getAllChannels(): Promise<ChannelWithDetails[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('channels')
    //   .select('*')
    //   .order('name');
    // return data ?? [];
  }
  
  return mockChannels;
}

/**
 * Get a channel by its slug
 */
export async function getChannelBySlug(slug: string): Promise<ChannelWithDetails | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('channels')
    //   .select('*')
    //   .eq('slug', slug)
    //   .maybeSingle();
    // return data;
  }
  
  return mockChannels.find(c => c.slug === slug) ?? null;
}

/**
 * Get a channel by its ID
 */
export async function getChannelById(channelId: string): Promise<ChannelWithDetails | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockChannels.find(c => c.id === channelId) ?? null;
}

/**
 * Get channels that the current user has joined
 */
export async function getJoinedChannels(channelIds: string[]): Promise<ChannelWithDetails[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch with user membership
  }
  
  return mockChannels.filter(c => channelIds.includes(c.id));
}

/**
 * Get channels that the current user has NOT joined (for discovery)
 */
export async function getDiscoverChannels(joinedIds: string[]): Promise<ChannelWithDetails[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockChannels.filter(c => !joinedIds.includes(c.id));
}

/**
 * Get channel admins for a specific channel
 */
export async function getChannelAdmins(channelId: string): Promise<DbChannelAdmin[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('channel_admins')
    //   .select('*')
    //   .eq('channel_id', channelId);
    // return data ?? [];
  }
  
  return mockChannelAdmins.filter(ca => ca.channel_id === channelId);
}

/**
 * Check if a user is admin of a specific channel
 */
export async function isUserChannelAdmin(channelId: string, userId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database check
  }
  
  return mockChannelAdmins.some(ca => ca.channel_id === channelId && ca.user_id === userId);
}

/**
 * Get all channels where a user is admin
 */
export async function getAdminChannels(userId: string): Promise<ChannelWithDetails[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch with join
  }
  
  const adminChannelIds = mockChannelAdmins
    .filter(ca => ca.user_id === userId)
    .map(ca => ca.channel_id);
  
  return mockChannels.filter(c => adminChannelIds.includes(c.id));
}

/**
 * Create a new channel (admin only)
 */
export async function createChannel(
  channel: Omit<ChannelWithDetails, 'id' | 'created_at' | 'updated_at' | 'member_count' | 'post_count'>
): Promise<ChannelWithDetails | null> {
  if (USE_DATABASE) {
    // TODO: Implement database insert
    // const { data, error } = await supabase
    //   .from('channels')
    //   .insert(channel)
    //   .select()
    //   .single();
    // return data;
  }
  
  // Mock create
  const newChannel: ChannelWithDetails = {
    ...channel,
    id: `channel-${Date.now()}`,
    member_count: 0,
    post_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  mockChannels.push(newChannel);
  return newChannel;
}

/**
 * Update a channel (admin only)
 */
export async function updateChannel(
  channelId: string,
  updates: Partial<Pick<ChannelWithDetails, 'name' | 'slug' | 'description' | 'icon' | 'color'>>
): Promise<ChannelWithDetails | null> {
  if (USE_DATABASE) {
    // TODO: Implement database update
  }
  
  const channelIndex = mockChannels.findIndex(c => c.id === channelId);
  if (channelIndex === -1) return null;
  
  mockChannels[channelIndex] = {
    ...mockChannels[channelIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  return mockChannels[channelIndex];
}

/**
 * Delete a channel (admin only)
 */
export async function deleteChannel(channelId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database delete
  }
  
  const channelIndex = mockChannels.findIndex(c => c.id === channelId);
  if (channelIndex === -1) return false;
  
  mockChannels.splice(channelIndex, 1);
  return true;
}

// Legacy compatibility - synchronous versions for immediate use in components

export function getAllChannelsSync(): ChannelWithDetails[] {
  return mockChannels;
}

export function getChannelBySlugSync(slug: string): ChannelWithDetails | null {
  return mockChannels.find(c => c.slug === slug) ?? null;
}

export function getJoinedChannelsSync(channelIds: string[]): ChannelWithDetails[] {
  return mockChannels.filter(c => channelIds.includes(c.id));
}

export function getDiscoverChannelsSync(joinedIds: string[]): ChannelWithDetails[] {
  return mockChannels.filter(c => !joinedIds.includes(c.id));
}
