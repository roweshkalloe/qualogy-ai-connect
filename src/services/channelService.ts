/**
 * Channel Service - Data abstraction layer for channel operations
 * 
 * Fetches channel data from Supabase database.
 */

import { supabase } from '@/integrations/supabase/client';
import { ChannelWithDetails, DbChannelAdmin } from '@/types/database';

/**
 * Get all channels from database
 */
export async function getAllChannels(): Promise<ChannelWithDetails[]> {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching channels:', error);
    return [];
  }
  
  return data ?? [];
}

/**
 * Get a channel by its slug
 */
export async function getChannelBySlug(slug: string): Promise<ChannelWithDetails | null> {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching channel by slug:', error);
    return null;
  }
  
  return data;
}

/**
 * Get a channel by its ID
 */
export async function getChannelById(channelId: string): Promise<ChannelWithDetails | null> {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', channelId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching channel by id:', error);
    return null;
  }
  
  return data;
}

/**
 * Get channels that the current user has joined
 */
export async function getJoinedChannels(channelIds: string[]): Promise<ChannelWithDetails[]> {
  if (channelIds.length === 0) return [];
  
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .in('id', channelIds)
    .order('name');
  
  if (error) {
    console.error('Error fetching joined channels:', error);
    return [];
  }
  
  return data ?? [];
}

/**
 * Get channels that the current user has NOT joined (for discovery)
 */
export async function getDiscoverChannels(joinedIds: string[]): Promise<ChannelWithDetails[]> {
  let query = supabase
    .from('channels')
    .select('*')
    .order('name');
  
  if (joinedIds.length > 0) {
    query = query.not('id', 'in', `(${joinedIds.join(',')})`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching discover channels:', error);
    return [];
  }
  
  return data ?? [];
}

/**
 * Get channel admins for a specific channel
 */
export async function getChannelAdmins(channelId: string): Promise<DbChannelAdmin[]> {
  const { data, error } = await supabase
    .from('channel_admins')
    .select('*')
    .eq('channel_id', channelId);
  
  if (error) {
    console.error('Error fetching channel admins:', error);
    return [];
  }
  
  return data ?? [];
}

/**
 * Check if a user is admin of a specific channel
 */
export async function isUserChannelAdmin(channelId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('channel_admins')
    .select('id')
    .eq('channel_id', channelId)
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) {
    console.error('Error checking channel admin:', error);
    return false;
  }
  
  return !!data;
}

/**
 * Get all channels where a user is admin
 */
export async function getAdminChannels(userId: string): Promise<ChannelWithDetails[]> {
  const { data: adminRecords, error: adminError } = await supabase
    .from('channel_admins')
    .select('channel_id')
    .eq('user_id', userId);
  
  if (adminError || !adminRecords || adminRecords.length === 0) {
    return [];
  }
  
  const channelIds = adminRecords.map(r => r.channel_id);
  return getJoinedChannels(channelIds);
}

/**
 * Create a new channel (admin only)
 */
export async function createChannel(
  channel: Omit<ChannelWithDetails, 'id' | 'created_at' | 'updated_at' | 'member_count' | 'post_count'>
): Promise<ChannelWithDetails | null> {
  const { data, error } = await supabase
    .from('channels')
    .insert({
      name: channel.name,
      slug: channel.slug,
      description: channel.description,
      icon: channel.icon,
      color: channel.color,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating channel:', error);
    return null;
  }
  
  return data;
}

/**
 * Update a channel (admin only)
 */
export async function updateChannel(
  channelId: string,
  updates: Partial<Pick<ChannelWithDetails, 'name' | 'slug' | 'description' | 'icon' | 'color'>>
): Promise<ChannelWithDetails | null> {
  const { data, error } = await supabase
    .from('channels')
    .update(updates)
    .eq('id', channelId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating channel:', error);
    return null;
  }
  
  return data;
}

/**
 * Delete a channel (admin only)
 */
export async function deleteChannel(channelId: string): Promise<boolean> {
  const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', channelId);
  
  if (error) {
    console.error('Error deleting channel:', error);
    return false;
  }
  
  return true;
}

/**
 * Join a channel (add user to channel membership)
 * Note: This is a placeholder - will need a channel_members table in the future
 */
export async function joinChannel(channelId: string, userId: string): Promise<boolean> {
  // TODO: Implement with channel_members table
  console.log('Join channel:', channelId, userId);
  return true;
}

/**
 * Leave a channel (remove user from channel membership)
 * Note: This is a placeholder - will need a channel_members table in the future
 */
export async function leaveChannel(channelId: string, userId: string): Promise<boolean> {
  // TODO: Implement with channel_members table
  console.log('Leave channel:', channelId, userId);
  return true;
}

// Legacy synchronous versions - now return empty until async data loads
// Components should migrate to using the async versions with React Query or useEffect

export function getAllChannelsSync(): ChannelWithDetails[] {
  console.warn('getAllChannelsSync is deprecated. Use getAllChannels() with async/await instead.');
  return [];
}

export function getChannelBySlugSync(slug: string): ChannelWithDetails | null {
  console.warn('getChannelBySlugSync is deprecated. Use getChannelBySlug() with async/await instead.');
  return null;
}

export function getJoinedChannelsSync(channelIds: string[]): ChannelWithDetails[] {
  console.warn('getJoinedChannelsSync is deprecated. Use getJoinedChannels() with async/await instead.');
  return [];
}

export function getDiscoverChannelsSync(joinedIds: string[]): ChannelWithDetails[] {
  console.warn('getDiscoverChannelsSync is deprecated. Use getDiscoverChannels() with async/await instead.');
  return [];
}
