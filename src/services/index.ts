/**
 * Service Layer Index
 * 
 * This module exports all data services for clean imports.
 * Components should import from here rather than individual service files.
 * 
 * Usage:
 * import { userService, channelService } from '@/services';
 * 
 * Or for specific functions:
 * import { getCurrentUser, getAllChannels } from '@/services';
 */

// User Service
export {
  getCurrentUser,
  getUserById,
  getUserByProfileId,
  getAllUsers,
  updateUserProfile,
  hasRole,
  getUserRoles,
  isAdmin,
  isChannelAdmin,
  // Sync versions for legacy compatibility
  getCurrentUserSync,
  getUserByIdSync,
} from './userService';

// Channel Service
export {
  getAllChannels,
  getChannelBySlug,
  getChannelById,
  getJoinedChannels,
  getDiscoverChannels,
  getChannelAdmins,
  isUserChannelAdmin,
  getAdminChannels,
  createChannel,
  updateChannel,
  deleteChannel,
  // Sync versions for legacy compatibility
  getAllChannelsSync,
  getChannelBySlugSync,
  getJoinedChannelsSync,
  getDiscoverChannelsSync,
} from './channelService';

// Re-export types
export type { UserProfile, ChannelWithDetails, AppRole } from '@/types/database';
