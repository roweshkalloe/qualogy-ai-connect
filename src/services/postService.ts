/**
 * Post Service - Data abstraction layer for post operations
 * 
 * Fetches posts from the Supabase database.
 */

import { supabase } from '@/integrations/supabase/client';

// ============= Types =============

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  author?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  replies?: PostComment[];
}

export interface Post {
  id: string;
  channel_id: string;
  channel_name?: string;
  channel_slug?: string;
  user_id: string;
  title: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  // User interaction states (computed based on current user)
  is_liked?: boolean;
  is_favorited?: boolean;
}

export interface CreatePostInput {
  channel_id: string;
  title: string;
  content: string;
  image_url?: string;
  tags?: string[];
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  image_url?: string;
  tags?: string[];
}

// ============= Service Functions =============

/**
 * Get all posts with channel info
 */
export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Get posts for a specific channel by ID
 */
export async function getPostsByChannel(channelId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .eq('channel_id', channelId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching channel posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Get posts for a specific channel by slug
 */
export async function getPostsByChannelSlug(slug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .eq('channels.slug', slug)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching channel posts by slug:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Get posts by a specific user
 */
export async function getPostsByUser(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Get a single post by ID
 */
export async function getPostById(postId: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .eq('id', postId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    channel_name: (data.channels as any)?.name,
    channel_slug: (data.channels as any)?.slug,
  };
}

/**
 * Get posts from channels the user has joined (feed)
 */
export async function getFeedPosts(joinedChannelIds: string[]): Promise<Post[]> {
  if (joinedChannelIds.length === 0) return [];

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .in('channel_id', joinedChannelIds)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching feed posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Get trending posts (most liked posts from the past week)
 */
export async function getTrendingPosts(limit: number = 4): Promise<Post[]> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .gte('created_at', oneWeekAgo.toISOString())
    .order('likes_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }

  return (data || []).map(post => ({
    ...post,
    channel_name: (post.channels as any)?.name,
    channel_slug: (post.channels as any)?.slug,
  }));
}

/**
 * Create a new post
 */
export async function createPost(input: CreatePostInput, userId: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...input,
      user_id: userId,
    })
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return null;
  }

  return {
    ...data,
    channel_name: (data.channels as any)?.name,
    channel_slug: (data.channels as any)?.slug,
  };
}

/**
 * Update a post
 */
export async function updatePost(postId: string, updates: UpdatePostInput): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', postId)
    .select(`
      *,
      channels!inner(name, slug)
    `)
    .single();

  if (error) {
    console.error('Error updating post:', error);
    return null;
  }

  return {
    ...data,
    channel_name: (data.channels as any)?.name,
    channel_slug: (data.channels as any)?.slug,
  };
}

/**
 * Delete a post
 */
export async function deletePost(postId: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }

  return true;
}

/**
 * Like a post
 */
export async function likePost(postId: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('post_likes')
    .insert({ post_id: postId, user_id: userId });

  if (error) {
    console.error('Error liking post:', error);
    return false;
  }

  return true;
}

/**
 * Unlike a post
 */
export async function unlikePost(postId: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error unliking post:', error);
    return false;
  }

  return true;
}

/**
 * Favorite a post
 */
export async function favoritePost(postId: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('post_favorites')
    .insert({ post_id: postId, user_id: userId });

  if (error) {
    console.error('Error favoriting post:', error);
    return false;
  }

  return true;
}

/**
 * Unfavorite a post
 */
export async function unfavoritePost(postId: string, userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('post_favorites')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error unfavoriting post:', error);
    return false;
  }

  return true;
}

/**
 * Get comments for a post (with nested replies)
 */
export async function getCommentsByPost(postId: string): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from('post_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  if (!data || data.length === 0) return [];

  // Fetch profiles for all comment authors
  const userIds = [...new Set(data.map(c => c.user_id))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('user_id, full_name, avatar_url')
    .in('user_id', userIds);

  const profileMap = new Map(
    (profiles || []).map(p => [p.user_id, p])
  );

  // Map all comments with author info
  const allComments: PostComment[] = data.map(comment => ({
    id: comment.id,
    post_id: comment.post_id,
    user_id: comment.user_id,
    content: comment.content,
    created_at: comment.created_at,
    parent_id: comment.parent_id,
    author: profileMap.get(comment.user_id) ? {
      full_name: profileMap.get(comment.user_id)?.full_name ?? null,
      avatar_url: profileMap.get(comment.user_id)?.avatar_url ?? null,
    } : undefined,
    replies: [],
  }));

  // Build nested structure
  const commentMap = new Map(allComments.map(c => [c.id, c]));
  const rootComments: PostComment[] = [];

  allComments.forEach(comment => {
    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      const parent = commentMap.get(comment.parent_id)!;
      if (!parent.replies) parent.replies = [];
      parent.replies.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
}

/**
 * Add a comment to a post (optionally as a reply)
 */
export async function addComment(
  postId: string, 
  userId: string, 
  content: string, 
  parentId?: string
): Promise<PostComment | null> {
  const { data, error } = await supabase
    .from('post_comments')
    .insert({ 
      post_id: postId, 
      user_id: userId, 
      content,
      parent_id: parentId || null 
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    return null;
  }

  // Fetch the author profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('user_id', userId)
    .maybeSingle();

  return {
    id: data.id,
    post_id: data.post_id,
    user_id: data.user_id,
    content: data.content,
    created_at: data.created_at,
    parent_id: data.parent_id,
    author: profile ? {
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
    } : undefined,
    replies: [],
  };
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('post_comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment:', error);
    return false;
  }

  return true;
}

/**
 * Get user's favorited posts
 */
export async function getFavoritedPosts(userId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('post_favorites')
    .select(`
      posts!inner(
        *,
        channels!inner(name, slug)
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching favorited posts:', error);
    return [];
  }

  return (data || []).map((item: any) => ({
    ...item.posts,
    channel_name: item.posts.channels?.name,
    channel_slug: item.posts.channels?.slug,
    is_favorited: true,
  }));
}

// ============= Sync Versions for Legacy Compatibility =============

export function getAllPostsSync(): Post[] {
  console.warn('getAllPostsSync is deprecated. Use getAllPosts() async function instead.');
  return [];
}

export function getPostsByChannelSync(channelId: string): Post[] {
  console.warn('getPostsByChannelSync is deprecated. Use getPostsByChannel() async function instead.');
  return [];
}

export function getFeedPostsSync(joinedChannelIds: string[]): Post[] {
  console.warn('getFeedPostsSync is deprecated. Use getFeedPosts() async function instead.');
  return [];
}
