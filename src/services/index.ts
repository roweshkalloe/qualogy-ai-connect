/**
 * Service Layer Index
 * 
 * This module exports all data services for clean imports.
 * Components should import from here rather than individual service files.
 * 
 * Usage:
 * import { userService, channelService, postService } from '@/services';
 * 
 * Or for specific functions:
 * import { getCurrentUser, getAllChannels, getAllPosts } from '@/services';
 */

// User Service
export {
  getCurrentUser,
  getUserById,
  getUserByProfileId,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
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
  joinChannel,
  leaveChannel,
  // Sync versions for legacy compatibility
  getAllChannelsSync,
  getChannelBySlugSync,
  getJoinedChannelsSync,
  getDiscoverChannelsSync,
} from './channelService';

// Post Service
export {
  getAllPosts,
  getPostsByChannel,
  getPostsByChannelSlug,
  getPostsByUser,
  getPostById,
  getFeedPosts,
  getTrendingPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  favoritePost,
  unfavoritePost,
  addComment,
  deleteComment,
  getFavoritedPosts,
  // Sync versions for legacy compatibility
  getAllPostsSync,
  getPostsByChannelSync,
  getFeedPostsSync,
} from './postService';

// Re-export types
export type { UserProfile, ChannelWithDetails, AppRole } from '@/types/database';
export type { Post, PostComment, CreatePostInput, UpdatePostInput } from './postService';
