/**
 * Mock Posts Data
 * 
 * Posts for each channel with actual database channel IDs.
 * This data is used until posts are migrated to the database.
 */

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorProfession: string;
  channelId: string;
  channelSlug: string;
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

// Channel IDs from database
const CHANNEL_IDS = {
  'data-ai': '601945e0-06b0-4516-9cb5-eb86edb9cd55',
  'java-engineering': '522650d0-22a5-4d85-8bbc-57d2b9a1e536',
  'mendix-development': 'ff7b5530-d6d7-4dab-8d87-97af499b700d',
  'business-product-analysis': 'c2c1ba46-b5b2-4800-ad9b-8e75127ae917',
  'front-end-engineering': '984c49e4-6b22-461e-98ee-279e2c67aca3',
  'oracle-apex-development': '5964a804-5b6a-49ab-9394-ced4809784be',
  'oracle-database-administration': '943d387b-ee17-4d86-ba4e-d25dd8220fb2',
};

export const mockPosts: Post[] = [
  // Data & AI Channel Posts
  {
    id: 'post-ai-1',
    authorId: 'user-emma',
    authorName: 'Emma Watson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Data Scientist',
    channelId: CHANNEL_IDS['data-ai'],
    channelSlug: 'data-ai',
    channelName: 'Data & AI',
    title: 'Fine-tuning LLMs for Enterprise Use Cases',
    content: 'Our team just completed a POC on fine-tuning GPT models for our specific domain. The results were impressive - 40% improvement in accuracy for our use case. Key learnings: quality of training data matters more than quantity.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 127,
    comments: [
      {
        id: 'comment-ai-1',
        authorId: 'user-mike',
        authorName: 'Mike Ross',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        content: 'Would love to hear more about the training data preparation!',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: true,
  },
  {
    id: 'post-ai-2',
    authorId: 'user-david',
    authorName: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'ML Engineer',
    channelId: CHANNEL_IDS['data-ai'],
    channelSlug: 'data-ai',
    channelName: 'Data & AI',
    title: 'RAG Architecture Best Practices',
    content: 'After implementing RAG in 5 different client projects, here are my top recommendations for vector database selection, chunking strategies, and prompt templates that consistently deliver great results.',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 89,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
  {
    id: 'post-ai-3',
    authorId: 'user-lisa',
    authorName: 'Lisa Huang',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'AI Researcher',
    channelId: CHANNEL_IDS['data-ai'],
    channelSlug: 'data-ai',
    channelName: 'Data & AI',
    title: 'Evaluating AI Model Performance: Beyond Accuracy',
    content: 'Accuracy alone doesn\'t tell the full story. In this post, I share a comprehensive framework for evaluating AI models including latency, cost, bias detection, and user satisfaction metrics.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 76,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Java Engineering Posts
  {
    id: 'post-java-1',
    authorId: 'user-louis',
    authorName: 'Louis Litt',
    authorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Java Architect',
    channelId: CHANNEL_IDS['java-engineering'],
    channelSlug: 'java-engineering',
    channelName: 'Java Engineering',
    title: 'Spring Boot 3.2: What\'s New',
    content: 'The latest Spring Boot release brings some exciting features. Virtual threads support, improved observability, and better GraalVM native image support. Here\'s how to migrate your existing projects.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 92,
    comments: [
      {
        id: 'comment-java-1',
        authorId: 'user-alex',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'Great overview! The virtual threads support is a game changer.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-java-2',
    authorId: 'user-james',
    authorName: 'James Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Senior Java Developer',
    channelId: CHANNEL_IDS['java-engineering'],
    channelSlug: 'java-engineering',
    channelName: 'Java Engineering',
    title: 'Microservices Communication Patterns',
    content: 'Sync vs async, REST vs gRPC, message queues vs event streaming. After architecting 20+ microservice systems, here\'s my decision framework for choosing the right communication pattern.',
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    likes: 67,
    comments: [],
    isLiked: false,
    isFavorited: true,
  },
  {
    id: 'post-java-3',
    authorId: 'user-anna',
    authorName: 'Anna Schmidt',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Backend Developer',
    channelId: CHANNEL_IDS['java-engineering'],
    channelSlug: 'java-engineering',
    channelName: 'Java Engineering',
    title: 'AI-Assisted Code Review with GitHub Copilot',
    content: 'We integrated Copilot into our code review workflow. The results? 30% faster reviews and catching edge cases humans often miss. Here\'s our setup and best practices.',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    likes: 54,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Mendix Development Posts
  {
    id: 'post-mendix-1',
    authorId: 'user-rachel',
    authorName: 'Rachel Zane',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Mendix Consultant',
    channelId: CHANNEL_IDS['mendix-development'],
    channelSlug: 'mendix-development',
    channelName: 'Mendix Development',
    title: 'Best Practices for Mendix Domain Models',
    content: 'After 3 years of Mendix development, here are my top recommendations for designing maintainable domain models that scale. Key insight: start with the use cases, not the data.',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 83,
    comments: [],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-mendix-2',
    authorId: 'user-harvey',
    authorName: 'Harvey Specter',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Solutions Architect',
    channelId: CHANNEL_IDS['mendix-development'],
    channelSlug: 'mendix-development',
    channelName: 'Mendix Development',
    title: 'AI-Powered Microflow Generation',
    content: 'We built a tool that uses AI to generate Mendix microflows from natural language descriptions. Early tests show 50% reduction in development time for standard CRUD operations.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 115,
    comments: [
      {
        id: 'comment-mendix-1',
        authorId: 'user-rachel',
        authorName: 'Rachel Zane',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        content: 'This is incredible! When can we try it out?',
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: true,
  },
  {
    id: 'post-mendix-3',
    authorId: 'user-kate',
    authorName: 'Kate Miller',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Mendix Developer',
    channelId: CHANNEL_IDS['mendix-development'],
    channelSlug: 'mendix-development',
    channelName: 'Mendix Development',
    title: 'Custom Widget Development Guide',
    content: 'Complete guide to building custom Mendix widgets with React. Covers setup, TypeScript integration, testing, and deployment to the Marketplace.',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    likes: 45,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Business & Product Analysis Posts
  {
    id: 'post-business-1',
    authorId: 'user-jessica',
    authorName: 'Jessica Pearson',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Product Manager',
    channelId: CHANNEL_IDS['business-product-analysis'],
    channelSlug: 'business-product-analysis',
    channelName: 'Business & Product Analysis',
    title: 'AI in Requirements Gathering',
    content: 'We used AI to analyze 500+ user interviews and extract patterns. The tool identified requirements that manual analysis missed. Here\'s our methodology and lessons learned.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 71,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
  {
    id: 'post-business-2',
    authorId: 'user-daniel',
    authorName: 'Daniel Hardman',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Business Analyst',
    channelId: CHANNEL_IDS['business-product-analysis'],
    channelSlug: 'business-product-analysis',
    channelName: 'Business & Product Analysis',
    title: 'Stakeholder Communication Templates',
    content: 'Collection of AI-generated templates for stakeholder communication: status updates, risk assessments, and decision memos. All customizable and tested across 10+ projects.',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    likes: 38,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Front-end Engineering Posts
  {
    id: 'post-frontend-1',
    authorId: 'user-sarah',
    authorName: 'Sarah Connor',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'UX Developer',
    channelId: CHANNEL_IDS['front-end-engineering'],
    channelSlug: 'front-end-engineering',
    channelName: 'Front-end Engineering',
    title: 'Designing AI-First Interfaces: 5 Principles',
    content: 'AI is changing the way we approach UI design. The key is to make AI feel like a helpful assistant, not a replacement for human decision-making. Here are 5 principles we\'ve developed.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 98,
    comments: [
      {
        id: 'comment-frontend-1',
        authorId: 'user-alex',
        authorName: 'Alex Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'Great insights! Especially point #3 about progressive disclosure.',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-frontend-2',
    authorId: 'user-tom',
    authorName: 'Tom Anderson',
    authorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Frontend Developer',
    channelId: CHANNEL_IDS['front-end-engineering'],
    channelSlug: 'front-end-engineering',
    channelName: 'Front-end Engineering',
    title: 'React 19 Features Deep Dive',
    content: 'React 19 brings exciting new features: Server Components, Actions, and improved suspense. Here\'s a practical guide to migrating your existing app and leveraging these features.',
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
    likes: 72,
    comments: [],
    isLiked: false,
    isFavorited: true,
  },
  {
    id: 'post-frontend-3',
    authorId: 'user-nina',
    authorName: 'Nina Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'UI Engineer',
    channelId: CHANNEL_IDS['front-end-engineering'],
    channelSlug: 'front-end-engineering',
    channelName: 'Front-end Engineering',
    title: 'Accessibility Testing with AI',
    content: 'We built an AI-powered accessibility testing tool that catches issues before they reach production. Integrates with your CI/CD pipeline for automated WCAG compliance checks.',
    createdAt: new Date(Date.now() - 42 * 60 * 60 * 1000),
    likes: 61,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Oracle APEX Development Posts
  {
    id: 'post-apex-1',
    authorId: 'user-mark',
    authorName: 'Mark Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'APEX Developer',
    channelId: CHANNEL_IDS['oracle-apex-development'],
    channelSlug: 'oracle-apex-development',
    channelName: 'Oracle APEX Development',
    title: 'APEX 24.1 New Features Overview',
    content: 'Oracle APEX 24.1 introduces AI-powered features including natural language to SQL, smart report generation, and automated form validation. Here\'s how to enable and use them.',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
    likes: 58,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
  {
    id: 'post-apex-2',
    authorId: 'user-claire',
    authorName: 'Claire Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Oracle Consultant',
    channelId: CHANNEL_IDS['oracle-apex-development'],
    channelSlug: 'oracle-apex-development',
    channelName: 'Oracle APEX Development',
    title: 'Building RESTful APIs with APEX',
    content: 'Complete guide to creating secure, scalable REST APIs using Oracle APEX. Covers authentication, rate limiting, and best practices for API versioning.',
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
    likes: 42,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },

  // Oracle Database Administration Posts
  {
    id: 'post-dba-1',
    authorId: 'user-robert',
    authorName: 'Robert Davis',
    authorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Database Administrator',
    channelId: CHANNEL_IDS['oracle-database-administration'],
    channelSlug: 'oracle-database-administration',
    channelName: 'Oracle Database Administration',
    title: 'AI-Assisted Query Optimization',
    content: 'Using Oracle\'s new AI advisor to identify and fix performance bottlenecks. We reduced query execution time by 70% on our largest client\'s database.',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
    likes: 64,
    comments: [
      {
        id: 'comment-dba-1',
        authorId: 'user-claire',
        authorName: 'Claire Williams',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        content: 'The AI advisor is amazing! Saved us hours of manual tuning.',
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
      },
    ],
    isLiked: true,
    isFavorited: false,
  },
  {
    id: 'post-dba-2',
    authorId: 'user-peter',
    authorName: 'Peter van Berg',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    authorProfession: 'Senior DBA',
    channelId: CHANNEL_IDS['oracle-database-administration'],
    channelSlug: 'oracle-database-administration',
    channelName: 'Oracle Database Administration',
    title: 'Automated Backup Strategies',
    content: 'Modern backup strategies for Oracle databases: RMAN best practices, cloud integration, and automated recovery testing. Includes scripts and monitoring dashboards.',
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000),
    likes: 37,
    comments: [],
    isLiked: false,
    isFavorited: false,
  },
];

// Helper functions
export function getPostsByChannelId(channelId: string): Post[] {
  return mockPosts.filter(p => p.channelId === channelId);
}

export function getPostsByChannelSlug(channelSlug: string): Post[] {
  return mockPosts.filter(p => p.channelSlug === channelSlug);
}

export function getTrendingPosts(limit: number = 4): Post[] {
  return [...mockPosts].sort((a, b) => b.likes - a.likes).slice(0, limit);
}

export function getForYouPosts(joinedChannelIds: string[], limit: number = 6): Post[] {
  if (joinedChannelIds.length === 0) return [];
  
  const channelCount = joinedChannelIds.length;
  let postsPerChannel = Math.ceil(limit / channelCount);
  
  const result: Post[] = [];
  
  joinedChannelIds.forEach(channelId => {
    const channelPosts = mockPosts
      .filter(p => p.channelId === channelId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, postsPerChannel);
    result.push(...channelPosts);
  });
  
  return result.slice(0, limit);
}

export function getAllPosts(): Post[] {
  return mockPosts;
}
