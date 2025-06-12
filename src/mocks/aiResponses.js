// Mock AI API responses for development and testing

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
  ],
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
  ],
  risks: [
    {
      id: '1',
      title: 'Market Saturation',
      severity: 'high',
      description: 'High competition in the social media space',
      mitigation: 'Focus on unique value proposition and niche targeting'
    },
    {
      id: '2',
      title: 'Technical Complexity',
      severity: 'medium',
      description: 'Real-time features require advanced infrastructure',
      mitigation: 'Start with MVP and scale gradually'
    },
    {
      id: '3',
      title: 'User Acquisition',
      severity: 'medium',
      description: 'Challenging to build initial user base',
      mitigation: 'Implement referral system and community building'
    }
  ]
};

export const mockArchitectureResponse = {
  services: [
    {
      id: 'frontend',
      name: 'Frontend App',
      type: 'client',
      technology: 'React Native',
      description: 'Cross-platform mobile application',
      dependencies: ['api-gateway', 'cdn'],
      position: { x: 100, y: 100 }
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'gateway',
      technology: 'AWS API Gateway',
      description: 'Central API management and routing',
      dependencies: ['auth-service', 'user-service', 'chat-service'],
      position: { x: 300, y: 100 }
    },
    {
      id: 'auth-service',
      name: 'Authentication Service',
      type: 'microservice',
      technology: 'Node.js + JWT',
      description: 'User authentication and authorization',
      dependencies: ['user-db'],
      position: { x: 200, y: 250 }
    },
    {
      id: 'user-service',
      name: 'User Service',
      type: 'microservice',
      technology: 'Node.js + Express',
      description: 'User profile and social features',
      dependencies: ['user-db', 'file-storage'],
      position: { x: 400, y: 250 }
    },
    {
      id: 'chat-service',
      name: 'Chat Service',
      type: 'microservice',
      technology: 'Node.js + Socket.io',
      description: 'Real-time messaging and notifications',
      dependencies: ['chat-db', 'redis'],
      position: { x: 300, y: 400 }
    },
    {
      id: 'user-db',
      name: 'User Database',
      type: 'database',
      technology: 'PostgreSQL',
      description: 'User profiles and relationships',
      dependencies: [],
      position: { x: 100, y: 400 }
    },
    {
      id: 'chat-db',
      name: 'Chat Database',
      type: 'database',
      technology: 'MongoDB',
      description: 'Messages and chat history',
      dependencies: [],
      position: { x: 500, y: 400 }
    },
    {
      id: 'redis',
      name: 'Redis Cache',
      type: 'cache',
      technology: 'Redis',
      description: 'Session storage and real-time data',
      dependencies: [],
      position: { x: 300, y: 550 }
    },
    {
      id: 'file-storage',
      name: 'File Storage',
      type: 'storage',
      technology: 'AWS S3',
      description: 'Images and media files',
      dependencies: [],
      position: { x: 500, y: 250 }
    },
    {
      id: 'cdn',
      name: 'CDN',
      type: 'cdn',
      technology: 'CloudFront',
      description: 'Content delivery network',
      dependencies: ['file-storage'],
      position: { x: 600, y: 100 }
    }
  ],
  techStack: {
    frontend: ['React Native', 'TypeScript', 'Redux Toolkit', 'React Navigation'],
    backend: ['Node.js', 'Express.js', 'Socket.io', 'JWT'],
    database: ['PostgreSQL', 'MongoDB', 'Redis'],
    infrastructure: ['AWS', 'Docker', 'Kubernetes', 'CloudFront'],
    tools: ['Git', 'Jest', 'ESLint', 'Prettier']
  }
};

export const mockComponentsResponse = {
  screens: [
    {
      id: 'login',
      name: 'LoginScreen',
      type: 'screen',
      framework: 'React Native',
      complexity: 'low',
      components: ['LoginForm', 'SocialLoginButtons', 'ForgotPasswordLink'],
      props: ['navigation', 'onLogin'],
      description: 'User authentication screen with email/password and social login options'
    },
    {
      id: 'home',
      name: 'HomeScreen',
      type: 'screen',
      framework: 'React Native',
      complexity: 'high',
      components: ['FeedList', 'PostComposer', 'NavigationHeader'],
      props: ['user', 'posts', 'onRefresh'],
      description: 'Main feed screen displaying user posts and interactions'
    },
    {
      id: 'profile',
      name: 'ProfileScreen',
      type: 'screen',
      framework: 'React Native',
      complexity: 'medium',
      components: ['ProfileHeader', 'PostGrid', 'FollowButton'],
      props: ['userId', 'isOwnProfile', 'onFollow'],
      description: 'User profile display with posts and social information'
    },
    {
      id: 'chat',
      name: 'ChatScreen',
      type: 'screen',
      framework: 'React Native',
      complexity: 'high',
      components: ['MessageList', 'MessageInput', 'TypingIndicator'],
      props: ['chatId', 'messages', 'onSendMessage'],
      description: 'Real-time chat interface with message history'
    }
  ],
  components: [
    {
      id: 'post-card',
      name: 'PostCard',
      type: 'component',
      framework: 'React Native',
      complexity: 'medium',
      props: ['post', 'onLike', 'onComment', 'onShare'],
      description: 'Individual post display with interaction buttons'
    },
    {
      id: 'user-avatar',
      name: 'UserAvatar',
      type: 'component',
      framework: 'React Native',
      complexity: 'low',
      props: ['user', 'size', 'onPress'],
      description: 'Circular user profile image with optional press handler'
    },
    {
      id: 'message-bubble',
      name: 'MessageBubble',
      type: 'component',
      framework: 'React Native',
      complexity: 'low',
      props: ['message', 'isOwn', 'timestamp'],
      description: 'Chat message display with sender styling'
    },
    {
      id: 'follow-button',
      name: 'FollowButton',
      type: 'component',
      framework: 'React Native',
      complexity: 'medium',
      props: ['userId', 'isFollowing', 'onToggleFollow'],
      description: 'Toggle button for following/unfollowing users'
    }
  ]
};

export const mockSchemaResponse = {
  tables: [
    {
      id: 'users',
      name: 'users',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'email', type: 'VARCHAR(255)', unique: true, nullable: false },
        { name: 'username', type: 'VARCHAR(50)', unique: true, nullable: false },
        { name: 'password_hash', type: 'VARCHAR(255)', nullable: false },
        { name: 'first_name', type: 'VARCHAR(100)', nullable: true },
        { name: 'last_name', type: 'VARCHAR(100)', nullable: true },
        { name: 'bio', type: 'TEXT', nullable: true },
        { name: 'avatar_url', type: 'VARCHAR(500)', nullable: true },
        { name: 'is_verified', type: 'BOOLEAN', default: false },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 100, y: 100 }
    },
    {
      id: 'posts',
      name: 'posts',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'user_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'content', type: 'TEXT', nullable: false },
        { name: 'image_urls', type: 'JSON', nullable: true },
        { name: 'like_count', type: 'INTEGER', default: 0 },
        { name: 'comment_count', type: 'INTEGER', default: 0 },
        { name: 'is_public', type: 'BOOLEAN', default: true },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 400, y: 100 }
    },
    {
      id: 'follows',
      name: 'follows',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'follower_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'following_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 100, y: 300 }
    },
    {
      id: 'likes',
      name: 'likes',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'user_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'post_id', type: 'UUID', foreignKey: 'posts.id', nullable: false },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 400, y: 300 }
    },
    {
      id: 'comments',
      name: 'comments',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'user_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'post_id', type: 'UUID', foreignKey: 'posts.id', nullable: false },
        { name: 'content', type: 'TEXT', nullable: false },
        { name: 'parent_id', type: 'UUID', foreignKey: 'comments.id', nullable: true },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 700, y: 200 }
    },
    {
      id: 'chats',
      name: 'chats',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'name', type: 'VARCHAR(255)', nullable: true },
        { name: 'is_group', type: 'BOOLEAN', default: false },
        { name: 'created_by', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' },
        { name: 'updated_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 100, y: 500 }
    },
    {
      id: 'messages',
      name: 'messages',
      columns: [
        { name: 'id', type: 'UUID', primaryKey: true, nullable: false },
        { name: 'chat_id', type: 'UUID', foreignKey: 'chats.id', nullable: false },
        { name: 'sender_id', type: 'UUID', foreignKey: 'users.id', nullable: false },
        { name: 'content', type: 'TEXT', nullable: false },
        { name: 'message_type', type: 'VARCHAR(50)', default: 'text' },
        { name: 'is_read', type: 'BOOLEAN', default: false },
        { name: 'created_at', type: 'TIMESTAMP', default: 'NOW()' }
      ],
      position: { x: 400, y: 500 }
    }
  ],
  relationships: [
    { from: 'posts', to: 'users', type: 'many-to-one', fromColumn: 'user_id', toColumn: 'id' },
    { from: 'follows', to: 'users', type: 'many-to-one', fromColumn: 'follower_id', toColumn: 'id' },
    { from: 'follows', to: 'users', type: 'many-to-one', fromColumn: 'following_id', toColumn: 'id' },
    { from: 'likes', to: 'users', type: 'many-to-one', fromColumn: 'user_id', toColumn: 'id' },
    { from: 'likes', to: 'posts', type: 'many-to-one', fromColumn: 'post_id', toColumn: 'id' },
    { from: 'comments', to: 'users', type: 'many-to-one', fromColumn: 'user_id', toColumn: 'id' },
    { from: 'comments', to: 'posts', type: 'many-to-one', fromColumn: 'post_id', toColumn: 'id' },
    { from: 'comments', to: 'comments', type: 'many-to-one', fromColumn: 'parent_id', toColumn: 'id' },
    { from: 'chats', to: 'users', type: 'many-to-one', fromColumn: 'created_by', toColumn: 'id' },
    { from: 'messages', to: 'chats', type: 'many-to-one', fromColumn: 'chat_id', toColumn: 'id' },
    { from: 'messages', to: 'users', type: 'many-to-one', fromColumn: 'sender_id', toColumn: 'id' }
  ]
};

export const mockExportResponse = {
  formats: [
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Complete blueprint as a formatted PDF document',
      icon: 'FileText',
      size: '2.4 MB',
      available: true
    },
    {
      id: 'markdown',
      name: 'Markdown Files',
      description: 'Documentation in Markdown format for GitHub',
      icon: 'FileCode',
      size: '156 KB',
      available: true
    },
    {
      id: 'json',
      name: 'JSON Data',
      description: 'Structured data for programmatic use',
      icon: 'Database',
      size: '89 KB',
      available: true
    },
    {
      id: 'figma',
      name: 'Figma Design',
      description: 'UI wireframes and design system',
      icon: 'Palette',
      size: '1.2 MB',
      available: false
    }
  ],
  cloudProviders: [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'Deploy to AWS with CloudFormation templates',
      icon: 'Cloud',
      supported: true,
      estimatedCost: '$45/month'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Frontend deployment with serverless functions',
      icon: 'Zap',
      supported: true,
      estimatedCost: '$20/month'
    },
    {
      id: 'heroku',
      name: 'Heroku',
      description: 'Simple app deployment with add-ons',
      icon: 'Server',
      supported: true,
      estimatedCost: '$25/month'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      description: 'Deploy with Google Cloud services',
      icon: 'Cloud',
      supported: false,
      estimatedCost: '$40/month'
    }
  ]
};