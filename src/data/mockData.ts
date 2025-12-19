// Mock Users
export interface User {
  id: string;
  name: string;
  email: string;
  profession: string;
  avatar: string;
  badge: string;
  joinedChannels: string[];
  stats: {
    posts: number;
    likes: number;
    following: number;
  };
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorProfession: string;
  channelId: string;
  channelName: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isFavorited: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  color: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'system' | 'welcome';
  title: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
  icon: string;
}

// Current user
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@qualogy.com',
  profession: 'Mendix Developer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  badge: 'Level 3 Contributor',
  joinedChannels: ['channel-1', 'channel-2', 'channel-5'],
  stats: {
    posts: 12,
    likes: 485,
    following: 8,
  },
};

// All channels
export const channels: Channel[] = [
  {
    id: 'channel-1',
    name: 'Mendix Masters',
    description: 'The hub for low-code development, Mendix tips, and best practices',
    icon: 'Blocks',
    memberCount: 156,
    postCount: 342,
    color: 'bg-primary/10',
  },
  {
    id: 'channel-2',
    name: 'UI/UX Design',
    description: 'Design systems, user research, and creating beautiful interfaces',
    icon: 'Palette',
    memberCount: 89,
    postCount: 187,
    color: 'bg-purple-100',
  },
  {
    id: 'channel-3',
    name: 'Java Jungle',
    description: 'JVM deep dives, Spring Boot, microservices architecture',
    icon: 'Coffee',
    memberCount: 203,
    postCount: 521,
    color: 'bg-amber-100',
  },
  {
    id: 'channel-4',
    name: 'Data & AI',
    description: 'Machine Learning, LLMs, data engineering, and AI applications',
    icon: 'Brain',
    memberCount: 178,
    postCount: 298,
    color: 'bg-blue-100',
  },
  {
    id: 'channel-5',
    name: 'Cloud Native',
    description: 'Kubernetes, Docker, AWS, Azure, and cloud architecture',
    icon: 'Cloud',
    memberCount: 134,
    postCount: 256,
    color: 'bg-sky-100',
  },
  {
    id: 'channel-6',
    name: 'HR & People',
    description: 'People development, culture, and HR innovation',
    icon: 'Users',
    memberCount: 67,
    postCount: 124,
    color: 'bg-green-100',
  },
  {
    id: 'channel-7',
    name: 'Sales Excellence',
    description: 'Sales strategies, client success, and business development',
    icon: 'TrendingUp',
    memberCount: 54,
    postCount: 98,
    color: 'bg-orange-100',
  },
  {
    id: 'channel-8',
    name: 'Marketing & Growth',
    description: 'Digital marketing, brand building, and growth hacking',
    icon: 'Megaphone',
    memberCount: 72,
    postCount: 156,
    color: 'bg-pink-100',
  },
];

// Mock posts
export const posts: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    authorName: 'Sarah Connor',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'UX Designer',
    channelId: 'channel-2',
    channelName: 'UI/UX Design',
    title: 'Designing AI-First Interfaces: 5 Principles',
    content: 'Just published my thoughts on how AI is changing the way we approach UI design. The key is to make AI feel like a helpful assistant, not a replacement for human decision-making.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 47,
    comments: [
      {
        id: 'comment-1',
        authorId: 'user-3',
        authorName: 'Harvey Specter',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'Great insights! Especially point #3 about progressive disclosure.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-2',
    authorId: 'user-3',
    authorName: 'Harvey Specter',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Solutions Architect',
    channelId: 'channel-1',
    channelName: 'Mendix Masters',
    title: 'Mendix Widgets: A Complete Guide',
    content: 'Been working on a comprehensive guide for building custom Mendix widgets. Covering everything from setup to deployment. Will share the link soon!',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 62,
    comments: [],
    isLiked: false,
    isFavorited: true,
  },
  {
    id: 'post-3',
    authorId: 'user-4',
    authorName: 'Emma Watson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Data Scientist',
    channelId: 'channel-4',
    channelName: 'Data & AI',
    title: 'Fine-tuning LLMs for Enterprise Use Cases',
    content: 'Our team just completed a POC on fine-tuning GPT models for our specific domain. The results were impressive - 40% improvement in accuracy for our use case.',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 89,
    comments: [
      {
        id: 'comment-2',
        authorId: 'user-5',
        authorName: 'Mike Ross',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        content: 'Would love to hear more about the training data preparation!',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: 'comment-3',
        authorId: 'user-1',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'Amazing work! Can we schedule a knowledge sharing session?',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: true,
  },
  {
    id: 'post-4',
    authorId: 'user-5',
    authorName: 'Mike Ross',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Cloud Engineer',
    channelId: 'channel-5',
    channelName: 'Cloud Native',
    title: 'Kubernetes Cost Optimization Tips',
    content: 'Running K8s in production can get expensive. Here are 7 strategies we used to cut our cloud costs by 35% without sacrificing performance.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 34,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
  {
    id: 'post-5',
    authorId: 'user-6',
    authorName: 'Rachel Zane',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Mendix Consultant',
    channelId: 'channel-1',
    channelName: 'Mendix Masters',
    title: 'Best Practices for Mendix Domain Models',
    content: 'After 3 years of Mendix development, here are my top recommendations for designing maintainable domain models that scale.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    likes: 56,
    comments: [],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-6',
    authorId: 'user-7',
    authorName: 'Louis Litt',
    authorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Java Developer',
    channelId: 'channel-3',
    channelName: 'Java Jungle',
    title: 'Spring Boot 3.2: What\'s New',
    content: 'The latest Spring Boot release brings some exciting features. Virtual threads support, improved observability, and better GraalVM native image support.',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    likes: 41,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    title: 'New Like',
    message: 'Sarah Connor liked your post about Mendix widgets',
    createdAt: new Date(Date.now() - 19 * 60 * 1000),
    isRead: false,
    icon: 'Heart',
  },
  {
    id: 'notif-2',
    type: 'system',
    title: 'System Update',
    message: 'Maintenance scheduled for Saturday night 2AM UTC',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    icon: 'Info',
  },
  {
    id: 'notif-3',
    type: 'comment',
    title: 'New Comment',
    message: 'Harvey Specter commented: "Great idea!"',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    icon: 'MessageSquare',
  },
  {
    id: 'notif-4',
    type: 'welcome',
    title: 'Welcome!',
    message: 'Welcome to the new Qualogy AI Hub app',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    icon: 'Sparkles',
  },
];

// Helper functions
export const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `about ${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

export const getTrendingPosts = (): Post[] => {
  return [...posts].sort((a, b) => b.likes - a.likes).slice(0, 4);
};

export const getForYouPosts = (userId: string, joinedChannels: string[]): Post[] => {
  const channelCount = joinedChannels.length;
  let postsPerChannel: number;
  
  if (channelCount === 1) postsPerChannel = 6;
  else if (channelCount === 2) postsPerChannel = 3;
  else if (channelCount === 3) postsPerChannel = 2;
  else postsPerChannel = 1;
  
  const result: Post[] = [];
  
  joinedChannels.forEach(channelId => {
    const channelPosts = posts
      .filter(p => p.channelId === channelId)
      .slice(0, postsPerChannel);
    result.push(...channelPosts);
  });
  
  return result;
};

export const getJoinedChannels = (channelIds: string[]): Channel[] => {
  return channels.filter(c => channelIds.includes(c.id));
};

export const getDiscoverChannels = (joinedIds: string[]): Channel[] => {
  return channels.filter(c => !joinedIds.includes(c.id));
};
