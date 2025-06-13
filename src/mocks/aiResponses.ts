// Mock AI API responses for development and testing

// Base types
export interface Tag {
  id: string;
  text: string;
  weight: number;
  category?: 'technology' | 'market' | 'feature' | 'risk';
  aiGenerated?: boolean;
}

export interface AIConcept {
  id: string;
  title: string;
  description: string;
  viability: number;
  marketSize?: string;
  timeToMarket?: string;
  complexity?: 'low' | 'medium' | 'high';
}

export interface Risk {
  id: string;
  title: string;
  severity: string;
  description: string;
  mitigation: string;
}

// Component types
export interface ScreenComponent {
  id: string;
  name: string;
  description: string;
  props?: Record<string, unknown>;
  children?: ScreenComponent[];
}

export interface Screen {
  id: string;
  name: string;
  description: string;
  components: ScreenComponent[];
  complexity?: 'low' | 'medium' | 'high';
}

export interface TableColumn {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export interface Table {
  id: string;
  name: string;
  description: string;
  columns: TableColumn[];
}

export interface Relationship {
  from: string;
  to: string;
  type: string;
  fromColumn: string;
  toColumn: string;
}

// Mock responses
export const mockAnalysisResponse = {
  tags: [
    { id: '1', text: 'Social Media', weight: 0.9, category: 'market', aiGenerated: true },
    { id: '2', text: 'React Native', weight: 0.8, category: 'technology', aiGenerated: true },
    { id: '3', text: 'Real-time Chat', weight: 0.7, category: 'feature', aiGenerated: true },
    { id: '4', text: 'User Authentication', weight: 0.6, category: 'feature', aiGenerated: true },
    { id: '5', text: 'Data Privacy', weight: 0.5, category: 'risk', aiGenerated: true },
    { id: '6', text: 'Push Notifications', weight: 0.7, category: 'feature', aiGenerated: true },
    { id: '7', text: 'Image Sharing', weight: 0.6, category: 'feature', aiGenerated: true },
    { id: '8', text: 'Content Moderation', weight: 0.4, category: 'risk', aiGenerated: true },
    { id: '9', text: 'MongoDB', weight: 0.5, category: 'technology', aiGenerated: true },
    { id: '10', text: 'AWS', weight: 0.6, category: 'technology', aiGenerated: true }
  ] as Tag[],
  concepts: [
    {
      id: '1',
      title: 'Community-Focused Social Platform',
      description: 'A social media app that connects people based on shared interests and local communities, featuring event planning and group discussions.',
      viability: 85,
      marketSize: 'Large',
      timeToMarket: '6-8 months',
      complexity: 'medium'
    },
    {
      id: '2',
      title: 'Professional Networking Hub',
      description: 'LinkedIn-style platform with enhanced features for skill sharing, mentorship matching, and project collaboration.',
      viability: 72,
      marketSize: 'Medium',
      timeToMarket: '8-12 months',
      complexity: 'high'
    },
    {
      id: '3',
      title: 'Niche Interest Communities',
      description: 'Specialized social platform for specific hobbies or interests with expert-led content and marketplace integration.',
      viability: 68,
      marketSize: 'Small',
      timeToMarket: '4-6 months',
      complexity: 'low'
    }
  ] as AIConcept[],
  risks: [
    {
      id: '1',
      title: 'Market Saturation',
      severity: 'high',
      description: 'High competition in the social media space',
      mitigation: 'Focus on a specific niche or unique value proposition'
    },
    {
      id: '2',
      title: 'User Acquisition',
      severity: 'medium',
      description: 'Challenges in attracting initial users',
      mitigation: 'Implement referral programs and strategic partnerships'
    },
    {
      id: '3',
      title: 'Data Security',
      severity: 'high',
      description: 'Risk of data breaches and privacy concerns',
      mitigation: 'Implement robust security measures and regular audits'
    }
  ]
};

export const mockComponentsResponse = {
  screens: [
    {
      id: 'login',
      name: 'LoginScreen',
      description: 'User authentication screen',
      components: [
        {
          id: 'login-form',
          name: 'LoginForm',
          description: 'Email and password login form'
        },
        {
          id: 'social-login',
          name: 'SocialLogin',
          description: 'Social media login buttons'
        },
        {
          id: 'forgot-password',
          name: 'ForgotPasswordLink',
          description: 'Link to reset password'
        }
      ]
    },
    {
      id: 'home',
      name: 'HomeScreen',
      description: 'Main feed screen',
      components: [
        {
          id: 'feed',
          name: 'Feed',
          description: 'Scrollable list of posts'
        },
        {
          id: 'create-post',
          name: 'CreatePostButton',
          description: 'Floating action button to create new post'
        },
        {
          id: 'navigation',
          name: 'BottomNavigation',
          description: 'Main app navigation'
        }
      ]
    }
  ]
};

export const mockSchemaResponse = {
  tables: [
    {
      id: 'users',
      name: 'users',
      description: 'Stores user account information',
      columns: [
        { id: 'id', name: 'id', type: 'uuid', required: true, description: 'Unique user identifier' },
        { id: 'email', name: 'email', type: 'string', required: true, description: 'User\'s email address' },
        { id: 'username', name: 'username', type: 'string', required: true, description: 'User\'s display name' },
        { id: 'created_at', name: 'created_at', type: 'timestamp', required: true, description: 'Account creation timestamp' }
      ]
    },
    {
      id: 'posts',
      name: 'posts',
      description: 'User-generated posts',
      columns: [
        { id: 'id', name: 'id', type: 'uuid', required: true, description: 'Unique post identifier' },
        { id: 'user_id', name: 'user_id', type: 'uuid', required: true, description: 'Reference to user who created the post' },
        { id: 'content', name: 'content', type: 'text', required: true, description: 'Post content' },
        { id: 'created_at', name: 'created_at', type: 'timestamp', required: true, description: 'Post creation timestamp' }
      ]
    }
  ],
  relationships: [
    { from: 'posts', to: 'users', type: 'many-to-one', fromColumn: 'user_id', toColumn: 'id' }
  ]
};

export const mockArchitectureResponse = {
  services: [
    {
      id: 'frontend',
      name: 'Frontend App',
      description: 'React Native mobile application',
      technology: 'React Native with TypeScript',
      dependencies: ['api-gateway']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'Entry point for all client requests',
      technology: 'Node.js with Express',
      dependencies: ['auth-service', 'user-service', 'post-service']
    },
    {
      id: 'auth-service',
      name: 'Authentication Service',
      description: 'Handles user authentication and authorization',
      technology: 'Node.js with Express',
      dependencies: ['user-db']
    },
    {
      id: 'user-service',
      name: 'User Service',
      description: 'Manages user profiles and relationships',
      technology: 'Node.js with Express',
      dependencies: ['user-db']
    },
    {
      id: 'post-service',
      name: 'Post Service',
      description: 'Handles post creation and retrieval',
      technology: 'Node.js with Express',
      dependencies: ['post-db']
    },
    {
      id: 'user-db',
      name: 'User Database',
      description: 'Stores user account information',
      technology: 'PostgreSQL',
      dependencies: []
    },
    {
      id: 'post-db',
      name: 'Post Database',
      description: 'Stores user posts and content',
      technology: 'MongoDB',
      dependencies: []
    }
  ],
  infrastructure: {
    provider: 'AWS',
    services: ['EC2', 'RDS', 'ElastiCache', 'S3', 'CloudFront', 'Route 53']
  }
};

export const mockExportResponse = {
  formats: [
    {
      id: 'react-native',
      name: 'React Native',
      description: 'Cross-platform mobile app',
      files: [
        { name: 'App.tsx', type: 'typescript' },
        { name: 'components/', type: 'directory' },
        { name: 'screens/', type: 'directory' },
        { name: 'navigation/', type: 'directory' }
      ]
    },
    {
      id: 'web',
      name: 'Web Application',
      description: 'Responsive web interface',
      files: [
        { name: 'index.html', type: 'html' },
        { name: 'src/', type: 'directory' },
        { name: 'public/', type: 'directory' }
      ]
    },
    {
      id: 'api',
      name: 'REST API',
      description: 'Backend API specification',
      files: [
        { name: 'openapi.yaml', type: 'yaml' },
        { name: 'endpoints/', type: 'directory' },
        { name: 'models/', type: 'directory' }
      ]
    }
  ]
};
