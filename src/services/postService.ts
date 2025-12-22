/**
 * Post Service - Data abstraction layer for post operations
 * 
 * Currently returns mock data. To switch to database:
 * 1. Import supabase client
 * 2. Replace mock data returns with database queries
 * 3. UI components remain unchanged
 */

import { mockUsers } from '@/data/mockUsers';

// Flag to easily switch between mock and database
const USE_DATABASE = false;

// ============= Types =============

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  content: string;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  author_profession: string;
  channel_id: string;
  channel_name: string;
  title: string;
  content: string;
  created_at: string;
  likes: number;
  comments: PostComment[];
  is_liked: boolean;
  is_favorited: boolean;
}

export interface CreatePostInput {
  channel_id: string;
  title: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}

// ============= Mock Data =============

// Mock posts aligned with database schema
const mockPosts: Post[] = [
  {
    id: 'post-1',
    author_id: 'user-2',
    author_name: 'Sarah Connor',
    author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    author_profession: 'UX Designer',
    channel_id: 'channel-2',
    channel_name: 'UI/UX Design',
    title: 'Designing AI-First Interfaces: 5 Principles',
    content: 'Just published my thoughts on how AI is changing the way we approach UI design. The key is to make AI feel like a helpful assistant, not a replacement for human decision-making.',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 47,
    comments: [
      {
        id: 'comment-1',
        post_id: 'post-1',
        author_id: 'user-3',
        author_name: 'Harvey Specter',
        author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'Great insights! Especially point #3 about progressive disclosure.',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
    is_liked: true,
    is_favorited: false,
  },
  {
    id: 'post-2',
    author_id: 'user-3',
    author_name: 'Harvey Specter',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    author_profession: 'Solutions Architect',
    channel_id: 'channel-1',
    channel_name: 'Mendix Masters',
    title: 'Mendix Widgets: A Complete Guide',
    content: 'Been working on a comprehensive guide for building custom Mendix widgets. Covering everything from setup to deployment. Will share the link soon!',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 62,
    comments: [],
    is_liked: false,
    is_favorited: true,
  },
  {
    id: 'post-3',
    author_id: 'user-4',
    author_name: 'Emma Watson',
    author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    author_profession: 'Data Scientist',
    channel_id: 'channel-4',
    channel_name: 'Data & AI',
    title: 'Fine-tuning LLMs for Enterprise Use Cases',
    content: 'Our team just completed a POC on fine-tuning GPT models for our specific domain. The results were impressive - 40% improvement in accuracy for our use case.',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: [
      {
        id: 'comment-2',
        post_id: 'post-3',
        author_id: 'user-5',
        author_name: 'Mike Ross',
        author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        content: 'Would love to hear more about the training data preparation!',
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'comment-3',
        post_id: 'post-3',
        author_id: 'user-1',
        author_name: 'Alex Johnson',
        author_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'This is exactly what we need for our project. Can we schedule a call?',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ],
    is_liked: false,
    is_favorited: false,
  },
  {
    id: 'post-4',
    author_id: 'user-5',
    author_name: 'Mike Ross',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    author_profession: 'Cloud Engineer',
    channel_id: 'channel-5',
    channel_name: 'Cloud Native',
    title: 'Zero-Downtime Kubernetes Migrations',
    content: 'Successfully migrated 50+ microservices to a new Kubernetes cluster without any downtime. Here are the key strategies we used...',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 156,
    comments: [],
    is_liked: true,
    is_favorited: true,
  },
  {
    id: 'post-5',
    author_id: 'user-6',
    author_name: 'Rachel Zane',
    author_avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    author_profession: 'Mendix Consultant',
    channel_id: 'channel-1',
    channel_name: 'Mendix Masters',
    title: 'Automated Client Onboarding with Mendix',
    content: 'Just wrapped up a project where we automated the entire client onboarding process using Mendix workflows. Reduced onboarding time from 2 weeks to 3 days!',
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    likes: 78,
    comments: [],
    is_liked: false,
    is_favorited: false,
  },
];

// ============= Service Functions =============

/**
 * Get all posts
 */
export async function getAllPosts(): Promise<Post[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('posts')
    //   .select('*, comments(*)')
    //   .order('created_at', { ascending: false });
    // return data ?? [];
  }
  
  return mockPosts;
}

/**
 * Get posts for a specific channel
 */
export async function getPostsByChannel(channelId: string): Promise<Post[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
    // const { data, error } = await supabase
    //   .from('posts')
    //   .select('*, comments(*)')
    //   .eq('channel_id', channelId)
    //   .order('created_at', { ascending: false });
    // return data ?? [];
  }
  
  return mockPosts.filter(p => p.channel_id === channelId);
}

/**
 * Get posts by a specific user
 */
export async function getPostsByUser(userId: string): Promise<Post[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockPosts.filter(p => p.author_id === userId);
}

/**
 * Get a single post by ID
 */
export async function getPostById(postId: string): Promise<Post | null> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch
  }
  
  return mockPosts.find(p => p.id === postId) ?? null;
}

/**
 * Get posts from channels the user has joined (feed)
 */
export async function getFeedPosts(joinedChannelIds: string[]): Promise<Post[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch with channel filter
  }
  
  return mockPosts
    .filter(p => joinedChannelIds.includes(p.channel_id))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Create a new post
 */
export async function createPost(input: CreatePostInput, userId: string): Promise<Post | null> {
  if (USE_DATABASE) {
    // TODO: Implement database insert
    // const { data, error } = await supabase
    //   .from('posts')
    //   .insert({ ...input, author_id: userId })
    //   .select()
    //   .single();
    // return data;
  }
  
  // Mock create
  const user = mockUsers.find(u => u.user_id === userId);
  if (!user) return null;
  
  const newPost: Post = {
    id: `post-${Date.now()}`,
    author_id: userId,
    author_name: user.full_name || 'Unknown User',
    author_avatar: user.avatar_url || '',
    author_profession: user.profession || '',
    channel_id: input.channel_id,
    channel_name: '', // Would be fetched from channel in real implementation
    title: input.title,
    content: input.content,
    created_at: new Date().toISOString(),
    likes: 0,
    comments: [],
    is_liked: false,
    is_favorited: false,
  };
  
  mockPosts.unshift(newPost);
  return newPost;
}

/**
 * Update a post
 */
export async function updatePost(postId: string, updates: UpdatePostInput): Promise<Post | null> {
  if (USE_DATABASE) {
    // TODO: Implement database update
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;
  
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    ...updates,
  };
  
  return mockPosts[postIndex];
}

/**
 * Delete a post
 */
export async function deletePost(postId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database delete
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  mockPosts.splice(postIndex, 1);
  return true;
}

/**
 * Like a post
 */
export async function likePost(postId: string, userId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database insert for post_likes
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  mockPosts[postIndex].likes += 1;
  mockPosts[postIndex].is_liked = true;
  return true;
}

/**
 * Unlike a post
 */
export async function unlikePost(postId: string, userId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database delete for post_likes
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  if (mockPosts[postIndex].likes > 0) {
    mockPosts[postIndex].likes -= 1;
  }
  mockPosts[postIndex].is_liked = false;
  return true;
}

/**
 * Favorite a post
 */
export async function favoritePost(postId: string, userId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database insert for post_favorites
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  mockPosts[postIndex].is_favorited = true;
  return true;
}

/**
 * Unfavorite a post
 */
export async function unfavoritePost(postId: string, userId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database delete for post_favorites
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  mockPosts[postIndex].is_favorited = false;
  return true;
}

/**
 * Add a comment to a post
 */
export async function addComment(postId: string, userId: string, content: string): Promise<PostComment | null> {
  if (USE_DATABASE) {
    // TODO: Implement database insert for comments
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;
  
  const user = mockUsers.find(u => u.user_id === userId);
  if (!user) return null;
  
  const newComment: PostComment = {
    id: `comment-${Date.now()}`,
    post_id: postId,
    author_id: userId,
    author_name: user.full_name || 'Unknown User',
    author_avatar: user.avatar_url || '',
    content,
    created_at: new Date().toISOString(),
  };
  
  mockPosts[postIndex].comments.push(newComment);
  return newComment;
}

/**
 * Delete a comment
 */
export async function deleteComment(postId: string, commentId: string): Promise<boolean> {
  if (USE_DATABASE) {
    // TODO: Implement database delete for comments
  }
  
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  if (postIndex === -1) return false;
  
  const commentIndex = mockPosts[postIndex].comments.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return false;
  
  mockPosts[postIndex].comments.splice(commentIndex, 1);
  return true;
}

/**
 * Get user's favorited posts
 */
export async function getFavoritedPosts(userId: string): Promise<Post[]> {
  if (USE_DATABASE) {
    // TODO: Implement database fetch with favorites join
  }
  
  // In mock, we just filter by is_favorited flag
  // In real app, this would be based on a user-specific favorites table
  return mockPosts.filter(p => p.is_favorited);
}

// ============= Sync Versions for Legacy Compatibility =============

export function getAllPostsSync(): Post[] {
  return mockPosts;
}

export function getPostsByChannelSync(channelId: string): Post[] {
  return mockPosts.filter(p => p.channel_id === channelId);
}

export function getFeedPostsSync(joinedChannelIds: string[]): Post[] {
  return mockPosts
    .filter(p => joinedChannelIds.includes(p.channel_id))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
