/**
 * Mock Channel Content Data
 * 
 * Guided practices, tools, prompts, and showcases for each channel.
 * Uses database channel IDs.
 */

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

export const guidedPractices: GuidedPractice[] = [
  // Data & AI
  { id: 'gp-ai-1', channelId: CHANNEL_IDS['data-ai'], title: 'Prompt Engineering Basics', description: 'Master the art of writing effective AI prompts for various use cases', level: 'Beginner' },
  { id: 'gp-ai-2', channelId: CHANNEL_IDS['data-ai'], title: 'Fine-tuning LLMs', description: 'Customize language models for your specific domain and use case', level: 'Advanced' },
  { id: 'gp-ai-3', channelId: CHANNEL_IDS['data-ai'], title: 'RAG Implementation Guide', description: 'Build retrieval-augmented generation systems for accurate responses', level: 'Intermediate' },

  // Java Engineering
  { id: 'gp-java-1', channelId: CHANNEL_IDS['java-engineering'], title: 'Spring Boot Microservices', description: 'Build and deploy production-ready microservices with Spring Boot 3', level: 'Intermediate' },
  { id: 'gp-java-2', channelId: CHANNEL_IDS['java-engineering'], title: 'Clean Code with Java', description: 'Write maintainable, testable, and elegant Java code', level: 'Beginner' },
  { id: 'gp-java-3', channelId: CHANNEL_IDS['java-engineering'], title: 'AI-Assisted Java Development', description: 'Leverage GitHub Copilot and AI tools for faster development', level: 'Beginner' },

  // Mendix Development
  { id: 'gp-mendix-1', channelId: CHANNEL_IDS['mendix-development'], title: 'Building Your First Mendix App', description: 'Step-by-step guide to creating a basic CRUD application', level: 'Beginner' },
  { id: 'gp-mendix-2', channelId: CHANNEL_IDS['mendix-development'], title: 'Advanced Domain Modeling', description: 'Design scalable and maintainable domain models', level: 'Advanced' },
  { id: 'gp-mendix-3', channelId: CHANNEL_IDS['mendix-development'], title: 'Integrating REST APIs', description: 'Connect your Mendix app to external services and APIs', level: 'Intermediate' },

  // Business & Product Analysis
  { id: 'gp-business-1', channelId: CHANNEL_IDS['business-product-analysis'], title: 'AI-Powered Requirements Gathering', description: 'Use AI to analyze and extract requirements from interviews', level: 'Intermediate' },
  { id: 'gp-business-2', channelId: CHANNEL_IDS['business-product-analysis'], title: 'Stakeholder Management 101', description: 'Effectively communicate with stakeholders at all levels', level: 'Beginner' },
  { id: 'gp-business-3', channelId: CHANNEL_IDS['business-product-analysis'], title: 'Product Roadmap Planning', description: 'Create and maintain effective product roadmaps', level: 'Intermediate' },

  // Front-end Engineering
  { id: 'gp-frontend-1', channelId: CHANNEL_IDS['front-end-engineering'], title: 'React Best Practices', description: 'Modern patterns and practices for React development', level: 'Intermediate' },
  { id: 'gp-frontend-2', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Design System Fundamentals', description: 'Create consistent and reusable design tokens and components', level: 'Beginner' },
  { id: 'gp-frontend-3', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Accessibility Testing', description: 'Ensure your applications are accessible to all users', level: 'Intermediate' },

  // Oracle APEX Development
  { id: 'gp-apex-1', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'APEX Fundamentals', description: 'Get started with Oracle APEX development', level: 'Beginner' },
  { id: 'gp-apex-2', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'Building REST APIs', description: 'Create secure RESTful APIs with APEX', level: 'Intermediate' },
  { id: 'gp-apex-3', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'Custom Themes & Templates', description: 'Design beautiful APEX applications', level: 'Advanced' },

  // Oracle Database Administration
  { id: 'gp-dba-1', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'Query Performance Tuning', description: 'Optimize SQL queries for maximum performance', level: 'Intermediate' },
  { id: 'gp-dba-2', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'Backup & Recovery', description: 'Implement robust backup strategies with RMAN', level: 'Beginner' },
  { id: 'gp-dba-3', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'AI-Assisted Database Tuning', description: 'Use Oracle AI advisor for automated optimization', level: 'Advanced' },
];

export const tools: Tool[] = [
  // Data & AI
  { id: 'tool-ai-1', channelId: CHANNEL_IDS['data-ai'], name: 'Q-AI Assistant', description: 'Internal AI assistant for code and content generation', type: 'Internal' },
  { id: 'tool-ai-2', channelId: CHANNEL_IDS['data-ai'], name: 'Jupyter Notebooks', description: 'Interactive data exploration and modeling', type: 'External' },
  { id: 'tool-ai-3', channelId: CHANNEL_IDS['data-ai'], name: 'Hugging Face Hub', description: 'Model repository and deployment platform', type: 'External' },

  // Java Engineering
  { id: 'tool-java-1', channelId: CHANNEL_IDS['java-engineering'], name: 'IntelliJ IDEA', description: 'Advanced Java IDE with smart coding assistance', type: 'External' },
  { id: 'tool-java-2', channelId: CHANNEL_IDS['java-engineering'], name: 'SonarQube', description: 'Code quality and security analysis', type: 'Internal' },
  { id: 'tool-java-3', channelId: CHANNEL_IDS['java-engineering'], name: 'GitHub Copilot', description: 'AI-powered code completion and generation', type: 'External' },

  // Mendix Development
  { id: 'tool-mendix-1', channelId: CHANNEL_IDS['mendix-development'], name: 'Mendix Studio Pro', description: 'The main IDE for building Mendix applications', type: 'External' },
  { id: 'tool-mendix-2', channelId: CHANNEL_IDS['mendix-development'], name: 'Mendix Quality Add-on', description: 'Code quality and best practices analyzer', type: 'Internal' },
  { id: 'tool-mendix-3', channelId: CHANNEL_IDS['mendix-development'], name: 'MxAssist AI', description: 'AI-powered development assistance in Mendix', type: 'External' },

  // Business & Product Analysis
  { id: 'tool-business-1', channelId: CHANNEL_IDS['business-product-analysis'], name: 'Miro', description: 'Collaborative whiteboarding and diagramming', type: 'External' },
  { id: 'tool-business-2', channelId: CHANNEL_IDS['business-product-analysis'], name: 'Confluence', description: 'Documentation and knowledge management', type: 'Internal' },
  { id: 'tool-business-3', channelId: CHANNEL_IDS['business-product-analysis'], name: 'Otter.ai', description: 'AI meeting transcription and notes', type: 'External' },

  // Front-end Engineering
  { id: 'tool-frontend-1', channelId: CHANNEL_IDS['front-end-engineering'], name: 'Figma', description: 'Collaborative design and prototyping tool', type: 'External' },
  { id: 'tool-frontend-2', channelId: CHANNEL_IDS['front-end-engineering'], name: 'Storybook', description: 'Component documentation and testing', type: 'External' },
  { id: 'tool-frontend-3', channelId: CHANNEL_IDS['front-end-engineering'], name: 'Qualogy Design System', description: 'Internal component library and guidelines', type: 'Internal' },

  // Oracle APEX Development
  { id: 'tool-apex-1', channelId: CHANNEL_IDS['oracle-apex-development'], name: 'Oracle APEX', description: 'Low-code application development platform', type: 'External' },
  { id: 'tool-apex-2', channelId: CHANNEL_IDS['oracle-apex-development'], name: 'SQL Developer', description: 'Database development and management IDE', type: 'External' },
  { id: 'tool-apex-3', channelId: CHANNEL_IDS['oracle-apex-development'], name: 'APEX Nitro', description: 'Front-end build workflow for APEX', type: 'External' },

  // Oracle Database Administration
  { id: 'tool-dba-1', channelId: CHANNEL_IDS['oracle-database-administration'], name: 'Oracle Enterprise Manager', description: 'Database monitoring and management', type: 'External' },
  { id: 'tool-dba-2', channelId: CHANNEL_IDS['oracle-database-administration'], name: 'RMAN', description: 'Oracle Recovery Manager for backups', type: 'External' },
  { id: 'tool-dba-3', channelId: CHANNEL_IDS['oracle-database-administration'], name: 'DBA Dashboard', description: 'Internal performance monitoring dashboard', type: 'Internal' },
];

export const prompts: Prompt[] = [
  // Data & AI
  { id: 'prompt-ai-1', channelId: CHANNEL_IDS['data-ai'], title: 'Data Pipeline Designer', description: 'Design ETL pipelines from requirements', prompt: 'Design a data pipeline that: [describe source, transformations, and destination]. Include error handling, monitoring, and data quality checks.' },
  { id: 'prompt-ai-2', channelId: CHANNEL_IDS['data-ai'], title: 'Model Evaluation Helper', description: 'Interpret ML model metrics', prompt: 'Help me interpret these model metrics: [paste metrics]. Explain what they mean, identify potential issues, and suggest improvements.' },
  { id: 'prompt-ai-3', channelId: CHANNEL_IDS['data-ai'], title: 'Prompt Optimizer', description: 'Improve your AI prompts', prompt: 'Analyze and improve this prompt for clarity, specificity, and effectiveness: [paste your prompt]. Provide 3 optimized versions.' },

  // Java Engineering
  { id: 'prompt-java-1', channelId: CHANNEL_IDS['java-engineering'], title: 'Code Review Assistant', description: 'Comprehensive code review feedback', prompt: 'Review this Java code for clean code principles, SOLID violations, potential bugs, and performance issues: [paste code]' },
  { id: 'prompt-java-2', channelId: CHANNEL_IDS['java-engineering'], title: 'Unit Test Generator', description: 'Generate JUnit tests', prompt: 'Generate comprehensive JUnit 5 tests for this method, including edge cases, happy path, and mocking dependencies: [paste method]' },
  { id: 'prompt-java-3', channelId: CHANNEL_IDS['java-engineering'], title: 'Spring Boot Config', description: 'Generate Spring configurations', prompt: 'Generate Spring Boot configuration for: [describe requirements like security, database, caching]. Include application.yml and relevant beans.' },

  // Mendix Development
  { id: 'prompt-mendix-1', channelId: CHANNEL_IDS['mendix-development'], title: 'Microflow Generator', description: 'Generate Mendix microflow logic', prompt: 'I need a Mendix microflow that [describe the business logic]. Include error handling, validation steps, and user feedback.' },
  { id: 'prompt-mendix-2', channelId: CHANNEL_IDS['mendix-development'], title: 'Domain Model Review', description: 'Get AI feedback on domain models', prompt: 'Review this Mendix domain model for best practices: [describe entities and associations]. Suggest improvements for performance and maintainability.' },
  { id: 'prompt-mendix-3', channelId: CHANNEL_IDS['mendix-development'], title: 'Widget Specification', description: 'Define custom widget requirements', prompt: 'Create a specification for a custom Mendix widget that: [describe functionality]. Include props, events, and styling requirements.' },

  // Business & Product Analysis
  { id: 'prompt-business-1', channelId: CHANNEL_IDS['business-product-analysis'], title: 'User Story Generator', description: 'Create user stories from requirements', prompt: 'Convert these requirements into user stories with acceptance criteria: [paste requirements]. Use the format: As a [user], I want [goal] so that [benefit].' },
  { id: 'prompt-business-2', channelId: CHANNEL_IDS['business-product-analysis'], title: 'Stakeholder Email', description: 'Draft professional communications', prompt: 'Draft a professional email to [stakeholder role] about [topic]. Tone should be [formal/informal] and include [key points to cover].' },
  { id: 'prompt-business-3', channelId: CHANNEL_IDS['business-product-analysis'], title: 'Process Documentation', description: 'Document business processes', prompt: 'Document this business process: [describe process]. Include steps, decision points, roles involved, and exception handling.' },

  // Front-end Engineering
  { id: 'prompt-frontend-1', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Component Generator', description: 'Generate React components', prompt: 'Create a React component for [describe functionality]. Include TypeScript types, props interface, and styled with Tailwind CSS.' },
  { id: 'prompt-frontend-2', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Accessibility Review', description: 'Check accessibility compliance', prompt: 'Review this component for accessibility issues: [paste code]. Check WCAG compliance and provide specific fixes.' },
  { id: 'prompt-frontend-3', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Performance Optimizer', description: 'Optimize React performance', prompt: 'Analyze this React code for performance issues: [paste code]. Identify unnecessary re-renders, missing memoization, and optimization opportunities.' },

  // Oracle APEX Development
  { id: 'prompt-apex-1', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'PL/SQL Generator', description: 'Generate PL/SQL procedures', prompt: 'Generate a PL/SQL procedure that [describe functionality]. Include error handling, logging, and parameter validation.' },
  { id: 'prompt-apex-2', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'Dynamic Action Helper', description: 'Create APEX dynamic actions', prompt: 'Create a dynamic action for APEX that [describe behavior]. Include the JavaScript code, true/false actions, and conditions.' },
  { id: 'prompt-apex-3', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'REST API Designer', description: 'Design RESTful APEX APIs', prompt: 'Design a REST API endpoint in APEX for [describe resource]. Include HTTP methods, request/response formats, and security.' },

  // Oracle Database Administration
  { id: 'prompt-dba-1', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'Query Optimizer', description: 'Optimize SQL queries', prompt: 'Optimize this SQL query for performance: [paste query]. Explain the execution plan and suggest index improvements.' },
  { id: 'prompt-dba-2', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'RMAN Script Generator', description: 'Generate backup scripts', prompt: 'Generate an RMAN backup script for [describe requirements: full/incremental, retention, compression]. Include verification steps.' },
  { id: 'prompt-dba-3', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'Performance Report', description: 'Analyze AWR reports', prompt: 'Analyze these AWR report metrics: [paste metrics]. Identify top wait events, SQL statements to tune, and system bottlenecks.' },
];

export const showcases: Showcase[] = [
  // Data & AI
  { id: 'sc-ai-1', channelId: CHANNEL_IDS['data-ai'], title: 'Customer Churn Prediction', story: 'Built an ML model that predicts customer churn with 87% accuracy. The AI-generated explanations help our sales team take proactive action, saving €2M in annual revenue.', role: 'Data Scientist', author: 'Emma Watson' },
  { id: 'sc-ai-2', channelId: CHANNEL_IDS['data-ai'], title: 'Intelligent Document Processing', story: 'Automated invoice processing using AI, reducing manual data entry by 90%. The system handles 10,000+ documents monthly with 99% accuracy.', role: 'ML Engineer', author: 'David Chen' },

  // Java Engineering
  { id: 'sc-java-1', channelId: CHANNEL_IDS['java-engineering'], title: 'Legacy Code Modernization', story: 'Used AI to analyze and refactor a 15-year-old Java codebase. Generated comprehensive test coverage and modernized to Spring Boot 3 in half the estimated time.', role: 'Java Architect', author: 'Louis Litt' },
  { id: 'sc-java-2', channelId: CHANNEL_IDS['java-engineering'], title: 'AI Code Review Integration', story: 'Integrated AI-powered code reviews into our CI/CD pipeline. Caught 40% more bugs before production and reduced review time by 60%.', role: 'Senior Developer', author: 'James Wilson' },

  // Mendix Development
  { id: 'sc-mendix-1', channelId: CHANNEL_IDS['mendix-development'], title: 'AI-Powered Development', story: 'Used AI to generate initial domain models and microflows, reducing development time by 60%. The AI suggestions for validation rules saved countless hours of debugging.', role: 'Mendix Consultant', author: 'Rachel Zane' },
  { id: 'sc-mendix-2', channelId: CHANNEL_IDS['mendix-development'], title: 'Widget Documentation Generator', story: 'Built a tool that automatically generates documentation for custom Mendix widgets using AI. Now our entire widget library is consistently documented.', role: 'Solutions Architect', author: 'Harvey Specter' },

  // Business & Product Analysis
  { id: 'sc-business-1', channelId: CHANNEL_IDS['business-product-analysis'], title: 'AI Requirements Analysis', story: 'Used AI to analyze 500+ user interviews and extract patterns. The tool identified requirements that manual analysis missed, leading to a more complete product spec.', role: 'Product Manager', author: 'Jessica Pearson' },
  { id: 'sc-business-2', channelId: CHANNEL_IDS['business-product-analysis'], title: 'Automated Reporting', story: 'Implemented AI-generated weekly status reports, saving 10+ hours per week across the team while improving consistency and clarity.', role: 'Business Analyst', author: 'Daniel Hardman' },

  // Front-end Engineering
  { id: 'sc-frontend-1', channelId: CHANNEL_IDS['front-end-engineering'], title: 'AI-Assisted Design Reviews', story: 'Integrated AI into our design review process. It now catches accessibility issues and suggests improvements before developer handoff, improving WCAG compliance by 95%.', role: 'UX Developer', author: 'Sarah Connor' },
  { id: 'sc-frontend-2', channelId: CHANNEL_IDS['front-end-engineering'], title: 'Component Library Migration', story: 'Used AI to migrate 200+ components to our new design system. Automated prop conversion and styling updates saved 3 months of manual work.', role: 'UI Engineer', author: 'Nina Patel' },

  // Oracle APEX Development
  { id: 'sc-apex-1', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'Natural Language to SQL', story: 'Implemented APEX\'s AI-powered natural language to SQL feature for business users. Non-technical staff can now generate reports without IT assistance.', role: 'APEX Developer', author: 'Mark Thompson' },
  { id: 'sc-apex-2', channelId: CHANNEL_IDS['oracle-apex-development'], title: 'Automated Form Validation', story: 'Used AI to generate comprehensive form validation rules from business requirements. Reduced validation bugs by 80% and improved user experience.', role: 'Oracle Consultant', author: 'Claire Williams' },

  // Oracle Database Administration
  { id: 'sc-dba-1', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'AI Query Optimization', story: 'Using Oracle\'s AI advisor to identify and fix performance bottlenecks. Reduced query execution time by 70% on our largest client\'s database.', role: 'Database Administrator', author: 'Robert Davis' },
  { id: 'sc-dba-2', channelId: CHANNEL_IDS['oracle-database-administration'], title: 'Predictive Maintenance', story: 'Implemented AI-powered predictive maintenance for database health. Now we catch and fix issues before they impact users, achieving 99.99% uptime.', role: 'Senior DBA', author: 'Peter van Berg' },
];

// Helper functions
export function getChannelGuidedPractices(channelId: string): GuidedPractice[] {
  return guidedPractices.filter(gp => gp.channelId === channelId);
}

export function getChannelTools(channelId: string): Tool[] {
  return tools.filter(t => t.channelId === channelId);
}

export function getChannelPrompts(channelId: string): Prompt[] {
  return prompts.filter(p => p.channelId === channelId);
}

export function getChannelShowcases(channelId: string): Showcase[] {
  return showcases.filter(s => s.channelId === channelId);
}
