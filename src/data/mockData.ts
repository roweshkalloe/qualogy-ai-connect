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
  slug: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  color: string;
}

export interface GuidedPractice {
  id: string;
  channelId: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Tool {
  id: string;
  channelId: string;
  name: string;
  description: string;
  type: 'Internal' | 'External';
}

export interface Prompt {
  id: string;
  channelId: string;
  title: string;
  description: string;
  prompt: string;
}

export interface Showcase {
  id: string;
  channelId: string;
  title: string;
  story: string;
  role: string;
  author: string;
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
    slug: 'mendix-masters',
    description: 'The hub for low-code development, Mendix tips, and best practices',
    icon: 'Blocks',
    memberCount: 156,
    postCount: 342,
    color: 'bg-primary/10',
  },
  {
    id: 'channel-2',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'Design systems, user research, and creating beautiful interfaces',
    icon: 'Palette',
    memberCount: 89,
    postCount: 187,
    color: 'bg-purple-100',
  },
  {
    id: 'channel-3',
    name: 'Java Jungle',
    slug: 'java-jungle',
    description: 'JVM deep dives, Spring Boot, microservices architecture',
    icon: 'Coffee',
    memberCount: 203,
    postCount: 521,
    color: 'bg-amber-100',
  },
  {
    id: 'channel-4',
    name: 'Data & AI',
    slug: 'data-ai',
    description: 'Machine Learning, LLMs, data engineering, and AI applications',
    icon: 'Brain',
    memberCount: 178,
    postCount: 298,
    color: 'bg-blue-100',
  },
  {
    id: 'channel-5',
    name: 'Cloud Native',
    slug: 'cloud-native',
    description: 'Kubernetes, Docker, AWS, Azure, and cloud architecture',
    icon: 'Cloud',
    memberCount: 134,
    postCount: 256,
    color: 'bg-sky-100',
  },
  {
    id: 'channel-6',
    name: 'HR & People',
    slug: 'hr-people',
    description: 'People development, culture, and HR innovation',
    icon: 'Users',
    memberCount: 67,
    postCount: 124,
    color: 'bg-green-100',
  },
  {
    id: 'channel-7',
    name: 'Sales Excellence',
    slug: 'sales-excellence',
    description: 'Sales strategies, client success, and business development',
    icon: 'TrendingUp',
    memberCount: 54,
    postCount: 98,
    color: 'bg-orange-100',
  },
  {
    id: 'channel-8',
    name: 'Marketing & Growth',
    slug: 'marketing-growth',
    description: 'Digital marketing, brand building, and growth hacking',
    icon: 'Megaphone',
    memberCount: 72,
    postCount: 156,
    color: 'bg-pink-100',
  },
];

// Guided Practice content
export const guidedPractices: GuidedPractice[] = [
  // Mendix
  { id: 'gp-1', channelId: 'channel-1', title: 'Building Your First Mendix App', description: 'Step-by-step guide to creating a basic CRUD application with best practices', level: 'Beginner' },
  { id: 'gp-2', channelId: 'channel-1', title: 'Advanced Domain Modeling', description: 'Learn to design scalable and maintainable domain models', level: 'Advanced' },
  { id: 'gp-3', channelId: 'channel-1', title: 'Integrating REST APIs', description: 'Connect your Mendix app to external services and APIs', level: 'Intermediate' },
  // UI/UX
  { id: 'gp-4', channelId: 'channel-2', title: 'Design System Fundamentals', description: 'Create consistent and reusable design tokens and components', level: 'Beginner' },
  { id: 'gp-5', channelId: 'channel-2', title: 'User Research Methods', description: 'Conduct effective user interviews and usability testing', level: 'Intermediate' },
  // Java
  { id: 'gp-6', channelId: 'channel-3', title: 'Spring Boot Microservices', description: 'Build and deploy production-ready microservices', level: 'Advanced' },
  { id: 'gp-7', channelId: 'channel-3', title: 'Clean Code with Java', description: 'Write maintainable and testable Java code', level: 'Beginner' },
  // Data & AI
  { id: 'gp-8', channelId: 'channel-4', title: 'Prompt Engineering Basics', description: 'Master the art of writing effective AI prompts', level: 'Beginner' },
  { id: 'gp-9', channelId: 'channel-4', title: 'Fine-tuning LLMs', description: 'Customize language models for your specific use case', level: 'Advanced' },
  // Cloud
  { id: 'gp-10', channelId: 'channel-5', title: 'Kubernetes 101', description: 'Deploy and manage containerized applications', level: 'Beginner' },
  // HR
  { id: 'gp-11', channelId: 'channel-6', title: 'AI in Recruitment', description: 'Leverage AI tools to streamline hiring processes', level: 'Intermediate' },
  // Sales
  { id: 'gp-12', channelId: 'channel-7', title: 'AI-Powered Sales Outreach', description: 'Use AI to personalize and scale your outreach', level: 'Beginner' },
  // Marketing
  { id: 'gp-13', channelId: 'channel-8', title: 'AI Content Generation', description: 'Create compelling marketing content with AI assistance', level: 'Beginner' },
];

// Tool Library
export const tools: Tool[] = [
  // Mendix
  { id: 'tool-1', channelId: 'channel-1', name: 'Mendix Studio Pro', description: 'The main IDE for building Mendix applications', type: 'Internal' },
  { id: 'tool-2', channelId: 'channel-1', name: 'Mendix Quality Add-on', description: 'Code quality and best practices analyzer', type: 'Internal' },
  // UI/UX
  { id: 'tool-3', channelId: 'channel-2', name: 'Figma', description: 'Collaborative design and prototyping tool', type: 'External' },
  { id: 'tool-4', channelId: 'channel-2', name: 'Qualogy Design System', description: 'Our internal component library and guidelines', type: 'Internal' },
  // Java
  { id: 'tool-5', channelId: 'channel-3', name: 'IntelliJ IDEA', description: 'Advanced Java IDE with smart coding assistance', type: 'External' },
  { id: 'tool-6', channelId: 'channel-3', name: 'SonarQube', description: 'Code quality and security analysis', type: 'Internal' },
  // Data & AI
  { id: 'tool-7', channelId: 'channel-4', name: 'Q-AI Assistant', description: 'Internal AI assistant for code and content generation', type: 'Internal' },
  { id: 'tool-8', channelId: 'channel-4', name: 'Jupyter Notebooks', description: 'Interactive data exploration and modeling', type: 'External' },
  // Cloud
  { id: 'tool-9', channelId: 'channel-5', name: 'Azure DevOps', description: 'CI/CD pipelines and project management', type: 'Internal' },
  { id: 'tool-10', channelId: 'channel-5', name: 'Terraform', description: 'Infrastructure as code for cloud resources', type: 'External' },
  // HR
  { id: 'tool-11', channelId: 'channel-6', name: 'HR Analytics Dashboard', description: 'People insights and workforce analytics', type: 'Internal' },
  // Sales
  { id: 'tool-12', channelId: 'channel-7', name: 'Salesforce', description: 'CRM and sales pipeline management', type: 'External' },
  // Marketing
  { id: 'tool-13', channelId: 'channel-8', name: 'HubSpot', description: 'Marketing automation and analytics', type: 'External' },
];

// Prompt Library
export const prompts: Prompt[] = [
  // Mendix
  { id: 'prompt-1', channelId: 'channel-1', title: 'Microflow Generator', description: 'Generate Mendix microflow logic from requirements', prompt: 'I need a Mendix microflow that [describe the business logic]. Include error handling and validation steps.' },
  { id: 'prompt-2', channelId: 'channel-1', title: 'Domain Model Review', description: 'Get AI feedback on your domain model design', prompt: 'Review this Mendix domain model for best practices: [paste your entities and associations]. Suggest improvements for performance and maintainability.' },
  // UI/UX
  { id: 'prompt-3', channelId: 'channel-2', title: 'User Persona Creator', description: 'Generate detailed user personas from research', prompt: 'Create a detailed user persona for [target audience] who uses [product type]. Include goals, pain points, and behaviors.' },
  { id: 'prompt-4', channelId: 'channel-2', title: 'Usability Heuristic Check', description: 'Evaluate designs against Nielsen\'s heuristics', prompt: 'Evaluate this UI against Nielsen\'s 10 usability heuristics: [describe or paste design]. Provide specific improvement suggestions.' },
  // Java
  { id: 'prompt-5', channelId: 'channel-3', title: 'Code Review Assistant', description: 'Get comprehensive code review feedback', prompt: 'Review this Java code for clean code principles, SOLID violations, and potential bugs: [paste code]' },
  { id: 'prompt-6', channelId: 'channel-3', title: 'Unit Test Generator', description: 'Generate JUnit tests for your methods', prompt: 'Generate comprehensive JUnit 5 tests for this method, including edge cases and mocking dependencies: [paste method]' },
  // Data & AI
  { id: 'prompt-7', channelId: 'channel-4', title: 'Data Pipeline Designer', description: 'Design ETL pipelines from requirements', prompt: 'Design a data pipeline that: [describe source, transformations, and destination]. Include error handling and monitoring.' },
  { id: 'prompt-8', channelId: 'channel-4', title: 'Model Evaluation Helper', description: 'Get help interpreting ML model metrics', prompt: 'Help me interpret these model metrics: [paste metrics]. Explain what they mean and suggest improvements.' },
  // Cloud
  { id: 'prompt-9', channelId: 'channel-5', title: 'Kubernetes Manifest Generator', description: 'Generate K8s deployment configurations', prompt: 'Generate a Kubernetes deployment manifest for [application description] with [requirements like replicas, resources, probes].' },
  // HR
  { id: 'prompt-10', channelId: 'channel-6', title: 'Job Description Writer', description: 'Create compelling job descriptions', prompt: 'Write a job description for [role] at Qualogy. Include responsibilities, requirements, and our culture highlights.' },
  // Sales
  { id: 'prompt-11', channelId: 'channel-7', title: 'Proposal Generator', description: 'Draft client proposals and pitches', prompt: 'Draft a proposal for [client name] for [project type]. Highlight our expertise in [technologies] and include timeline and approach.' },
  // Marketing
  { id: 'prompt-12', channelId: 'channel-8', title: 'Social Media Post Creator', description: 'Generate engaging social content', prompt: 'Create a LinkedIn post about [topic] for Qualogy. Make it engaging, professional, and include a call to action.' },
];

// Showcases
export const showcases: Showcase[] = [
  // Mendix
  { id: 'sc-1', channelId: 'channel-1', title: 'Automated Client Onboarding', story: 'Used AI to generate initial domain models and microflows, reducing development time by 60%. The AI suggestions for validation rules saved us countless hours of debugging.', role: 'Senior Mendix Developer', author: 'Rachel Zane' },
  { id: 'sc-2', channelId: 'channel-1', title: 'Widget Documentation Generator', story: 'Built a tool that automatically generates documentation for custom Mendix widgets using AI. Now our entire widget library is consistently documented.', role: 'Mendix Consultant', author: 'Harvey Specter' },
  // UI/UX
  { id: 'sc-3', channelId: 'channel-2', title: 'AI-Assisted Design Reviews', story: 'Integrated AI into our design review process. It now catches accessibility issues and suggests improvements before developer handoff, improving our WCAG compliance significantly.', role: 'UX Designer', author: 'Sarah Connor' },
  // Java
  { id: 'sc-4', channelId: 'channel-3', title: 'Legacy Code Modernization', story: 'Used AI to analyze and refactor a 15-year-old Java codebase. Generated comprehensive test coverage and modernized to Spring Boot 3 in half the estimated time.', role: 'Java Architect', author: 'Louis Litt' },
  // Data & AI
  { id: 'sc-5', channelId: 'channel-4', title: 'Customer Churn Prediction', story: 'Built an ML model that predicts customer churn with 87% accuracy. The AI-generated explanations help our sales team take proactive action.', role: 'Data Scientist', author: 'Emma Watson' },
  // Cloud
  { id: 'sc-6', channelId: 'channel-5', title: 'Zero-Downtime Migration', story: 'Migrated 50+ microservices to Kubernetes using AI-generated manifests and migration scripts. Zero production incidents during the entire process.', role: 'Cloud Engineer', author: 'Mike Ross' },
  // HR
  { id: 'sc-7', channelId: 'channel-6', title: 'AI Interview Scheduler', story: 'Built an AI-powered scheduling assistant that coordinates interviews across time zones and availability. Reduced scheduling overhead by 80%.', role: 'HR Manager', author: 'Jessica Pearson' },
  // Sales
  { id: 'sc-8', channelId: 'channel-7', title: 'Personalized Proposal System', story: 'Created a system that uses AI to analyze client needs and generate tailored proposals. Win rate increased by 25% in the first quarter.', role: 'Sales Director', author: 'Daniel Hardman' },
  // Marketing
  { id: 'sc-9', channelId: 'channel-8', title: 'Content Calendar Automation', story: 'AI now drafts our weekly social media content based on trending topics and company news. Engagement is up 40% while time spent on content creation dropped by half.', role: 'Marketing Lead', author: 'Katrina Bennett' },
];

// Helper functions for channel details
export const getChannelBySlug = (slug: string): Channel | undefined => {
  return channels.find(c => c.slug === slug);
};

export const getChannelPosts = (channelId: string): Post[] => {
  return posts.filter(p => p.channelId === channelId);
};

export const getChannelGuidedPractices = (channelId: string): GuidedPractice[] => {
  return guidedPractices.filter(gp => gp.channelId === channelId);
};

export const getChannelTools = (channelId: string): Tool[] => {
  return tools.filter(t => t.channelId === channelId);
};

export const getChannelPrompts = (channelId: string): Prompt[] => {
  return prompts.filter(p => p.channelId === channelId);
};

export const getChannelShowcases = (channelId: string): Showcase[] => {
  return showcases.filter(s => s.channelId === channelId);
};

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
