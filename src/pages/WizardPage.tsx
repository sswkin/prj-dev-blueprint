import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Lightbulb, 
  Target, 
  Code2, 
  Database, 
  Download,
  CheckCircle,
  Loader2,
  Sparkles,
  Wand2,
  X,
  Server,
  Cloud,
  Shield,
  Monitor,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAI } from '@/hooks/useAI';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
}

interface ProjectRequirements {
  description: string;
  features: string[];
  techStack: {
    programmingLanguages: string[];
    frontendFrameworks: string[];
    backendTechnologies: string[];
    databaseSystems: string[];
    cloudPlatforms: string[];
    developmentTools: string[];
  };
  architecture: {
    applicationArchitecture: string[];
    dataStoragePatterns: string[];
    integrationPatterns: string[];
    securityPatterns: string[];
    scalabilityApproaches: string[];
    monitoringSolutions: string[];
  };
  timeline: string;
  budget: string;
  targetAudience: string;
}

interface FeatureSuggestion {
  name: string;
  category: 'core' | 'optional' | 'advanced';
  description: string;
  selected: boolean;
  aiSuggested: boolean;
}

interface TechOption {
  name: string;
  description: string;
  category: string;
  selected: boolean;
}

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    description: '',
    features: [],
    techStack: {
      programmingLanguages: [],
      frontendFrameworks: [],
      backendTechnologies: [],
      databaseSystems: [],
      cloudPlatforms: [],
      developmentTools: []
    },
    architecture: {
      applicationArchitecture: [],
      dataStoragePatterns: [],
      integrationPatterns: [],
      securityPatterns: [],
      scalabilityApproaches: [],
      monitoringSolutions: []
    },
    timeline: '',
    budget: '',
    targetAudience: ''
  });
  const [isRefining, setIsRefining] = useState(false);
  const [refinedContent, setRefinedContent] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [featureSuggestions, setFeatureSuggestions] = useState<FeatureSuggestion[]>([]);
  const [isGeneratingFeatures, setIsGeneratingFeatures] = useState(false);
  const [hasGeneratedFeatures, setHasGeneratedFeatures] = useState(false);
  
  const navigate = useNavigate();
  const { execute } = useAI();

  const steps: WizardStep[] = [
    {
      id: 'requirements',
      title: 'Project Requirements',
      description: 'Describe your software project in detail',
      icon: Lightbulb,
      completed: completedSteps.has(0)
    },
    {
      id: 'features',
      title: 'Features & Scope',
      description: 'Define key features and functionality',
      icon: Target,
      completed: completedSteps.has(1)
    },
    {
      id: 'technical',
      title: 'Technical Preferences',
      description: 'Choose your technology stack',
      icon: Code2,
      completed: completedSteps.has(2)
    },
    {
      id: 'architecture',
      title: 'Architecture & Data',
      description: 'Define system architecture and data models',
      icon: Database,
      completed: completedSteps.has(3)
    },
    {
      id: 'review',
      title: 'Review & Generate',
      description: 'Review and generate your blueprint',
      icon: Download,
      completed: completedSteps.has(4)
    }
  ];

  // Technical Preferences Options
  const technicalOptions = {
    programmingLanguages: [
      { name: 'JavaScript', description: 'Versatile language for web development', category: 'Web' },
      { name: 'TypeScript', description: 'JavaScript with static typing', category: 'Web' },
      { name: 'Python', description: 'Great for AI, data science, and web apps', category: 'General' },
      { name: 'Java', description: 'Enterprise-grade object-oriented language', category: 'Enterprise' },
      { name: 'C#', description: 'Microsoft\'s modern programming language', category: 'Microsoft' },
      { name: 'Go', description: 'Fast, simple language for cloud services', category: 'Cloud' },
      { name: 'Rust', description: 'Memory-safe systems programming', category: 'Systems' },
      { name: 'PHP', description: 'Popular web development language', category: 'Web' },
      { name: 'Ruby', description: 'Developer-friendly web language', category: 'Web' },
      { name: 'Swift', description: 'Apple\'s language for iOS/macOS', category: 'Mobile' },
      { name: 'Kotlin', description: 'Modern language for Android/JVM', category: 'Mobile' },
      { name: 'Dart', description: 'Language for Flutter development', category: 'Mobile' }
    ],
    frontendFrameworks: [
      { name: 'React', description: 'Popular component-based library', category: 'Library' },
      { name: 'Vue.js', description: 'Progressive JavaScript framework', category: 'Framework' },
      { name: 'Angular', description: 'Full-featured TypeScript framework', category: 'Framework' },
      { name: 'Next.js', description: 'React framework with SSR/SSG', category: 'Meta-Framework' },
      { name: 'Nuxt.js', description: 'Vue.js framework with SSR/SSG', category: 'Meta-Framework' },
      { name: 'Svelte', description: 'Compile-time optimized framework', category: 'Framework' },
      { name: 'SvelteKit', description: 'Full-stack Svelte framework', category: 'Meta-Framework' },
      { name: 'Solid.js', description: 'Fine-grained reactive framework', category: 'Framework' },
      { name: 'Astro', description: 'Static site generator with islands', category: 'Static' },
      { name: 'Remix', description: 'Full-stack React framework', category: 'Meta-Framework' },
      { name: 'Gatsby', description: 'React-based static site generator', category: 'Static' },
      { name: 'Vanilla JS', description: 'Pure JavaScript without frameworks', category: 'Native' }
    ],
    backendTechnologies: [
      { name: 'Node.js', description: 'JavaScript runtime for server-side', category: 'JavaScript' },
      { name: 'Express.js', description: 'Minimal Node.js web framework', category: 'JavaScript' },
      { name: 'Fastify', description: 'Fast Node.js web framework', category: 'JavaScript' },
      { name: 'Django', description: 'High-level Python web framework', category: 'Python' },
      { name: 'FastAPI', description: 'Modern Python API framework', category: 'Python' },
      { name: 'Flask', description: 'Lightweight Python web framework', category: 'Python' },
      { name: 'Spring Boot', description: 'Java framework for microservices', category: 'Java' },
      { name: 'ASP.NET Core', description: 'Microsoft\'s cross-platform framework', category: 'Microsoft' },
      { name: 'Ruby on Rails', description: 'Convention-over-configuration framework', category: 'Ruby' },
      { name: 'Laravel', description: 'Elegant PHP web framework', category: 'PHP' },
      { name: 'Gin', description: 'Fast Go web framework', category: 'Go' },
      { name: 'Fiber', description: 'Express-inspired Go framework', category: 'Go' }
    ],
    databaseSystems: [
      { name: 'PostgreSQL', description: 'Advanced open-source relational DB', category: 'SQL' },
      { name: 'MySQL', description: 'Popular open-source relational DB', category: 'SQL' },
      { name: 'SQLite', description: 'Lightweight embedded database', category: 'SQL' },
      { name: 'MongoDB', description: 'Popular document-based NoSQL DB', category: 'NoSQL' },
      { name: 'Redis', description: 'In-memory data structure store', category: 'Cache' },
      { name: 'Cassandra', description: 'Distributed wide-column store', category: 'NoSQL' },
      { name: 'DynamoDB', description: 'AWS managed NoSQL database', category: 'Cloud' },
      { name: 'Firebase Firestore', description: 'Google\'s NoSQL document database', category: 'Cloud' },
      { name: 'Supabase', description: 'Open-source Firebase alternative', category: 'Cloud' },
      { name: 'PlanetScale', description: 'Serverless MySQL platform', category: 'Cloud' },
      { name: 'CockroachDB', description: 'Distributed SQL database', category: 'Distributed' },
      { name: 'InfluxDB', description: 'Time-series database', category: 'Specialized' }
    ],
    cloudPlatforms: [
      { name: 'AWS', description: 'Amazon Web Services', category: 'Major' },
      { name: 'Google Cloud', description: 'Google Cloud Platform', category: 'Major' },
      { name: 'Microsoft Azure', description: 'Microsoft\'s cloud platform', category: 'Major' },
      { name: 'Vercel', description: 'Frontend deployment platform', category: 'Frontend' },
      { name: 'Netlify', description: 'JAMstack deployment platform', category: 'Frontend' },
      { name: 'Heroku', description: 'Platform-as-a-Service provider', category: 'PaaS' },
      { name: 'Railway', description: 'Modern deployment platform', category: 'PaaS' },
      { name: 'Render', description: 'Cloud platform for developers', category: 'PaaS' },
      { name: 'DigitalOcean', description: 'Simple cloud infrastructure', category: 'Infrastructure' },
      { name: 'Linode', description: 'Developer-friendly cloud hosting', category: 'Infrastructure' },
      { name: 'Cloudflare', description: 'CDN and edge computing', category: 'Edge' },
      { name: 'Fly.io', description: 'Global application platform', category: 'Edge' }
    ],
    developmentTools: [
      { name: 'Git', description: 'Version control system', category: 'Version Control' },
      { name: 'GitHub', description: 'Git hosting and collaboration', category: 'Version Control' },
      { name: 'GitLab', description: 'DevOps platform with Git', category: 'Version Control' },
      { name: 'Docker', description: 'Containerization platform', category: 'Containerization' },
      { name: 'Kubernetes', description: 'Container orchestration', category: 'Containerization' },
      { name: 'Jenkins', description: 'Open-source automation server', category: 'CI/CD' },
      { name: 'GitHub Actions', description: 'GitHub\'s CI/CD platform', category: 'CI/CD' },
      { name: 'GitLab CI', description: 'GitLab\'s CI/CD solution', category: 'CI/CD' },
      { name: 'Terraform', description: 'Infrastructure as code', category: 'Infrastructure' },
      { name: 'Ansible', description: 'Configuration management', category: 'Infrastructure' },
      { name: 'Webpack', description: 'Module bundler for JavaScript', category: 'Build Tools' },
      { name: 'Vite', description: 'Fast build tool for modern web', category: 'Build Tools' }
    ]
  };

  // Architecture & Data Options
  const architectureOptions = {
    applicationArchitecture: [
      { name: 'Monolithic', description: 'Single deployable unit', category: 'Traditional' },
      { name: 'Microservices', description: 'Distributed service architecture', category: 'Distributed' },
      { name: 'Serverless', description: 'Function-as-a-Service architecture', category: 'Cloud-Native' },
      { name: 'Modular Monolith', description: 'Monolith with modular design', category: 'Hybrid' },
      { name: 'Service-Oriented Architecture', description: 'SOA with service contracts', category: 'Enterprise' },
      { name: 'Event-Driven Architecture', description: 'Asynchronous event processing', category: 'Reactive' },
      { name: 'Hexagonal Architecture', description: 'Ports and adapters pattern', category: 'Clean' },
      { name: 'Layered Architecture', description: 'Traditional n-tier architecture', category: 'Traditional' }
    ],
    dataStoragePatterns: [
      { name: 'RDBMS', description: 'Relational database management', category: 'SQL' },
      { name: 'NoSQL Document', description: 'Document-based storage', category: 'NoSQL' },
      { name: 'NoSQL Key-Value', description: 'Simple key-value pairs', category: 'NoSQL' },
      { name: 'NoSQL Graph', description: 'Graph-based relationships', category: 'NoSQL' },
      { name: 'Data Lake', description: 'Raw data storage repository', category: 'Big Data' },
      { name: 'Data Warehouse', description: 'Structured analytical data', category: 'Analytics' },
      { name: 'Event Sourcing', description: 'Store events as source of truth', category: 'Event-Driven' },
      { name: 'CQRS', description: 'Command Query Responsibility Segregation', category: 'Pattern' }
    ],
    integrationPatterns: [
      { name: 'REST API', description: 'RESTful web services', category: 'HTTP' },
      { name: 'GraphQL', description: 'Query language for APIs', category: 'Query' },
      { name: 'gRPC', description: 'High-performance RPC framework', category: 'RPC' },
      { name: 'Message Queue', description: 'Asynchronous message passing', category: 'Async' },
      { name: 'Event Streaming', description: 'Real-time event processing', category: 'Streaming' },
      { name: 'Webhook', description: 'HTTP callbacks for events', category: 'HTTP' },
      { name: 'WebSocket', description: 'Real-time bidirectional communication', category: 'Real-time' },
      { name: 'Server-Sent Events', description: 'Server-to-client event stream', category: 'Real-time' }
    ],
    securityPatterns: [
      { name: 'OAuth 2.0', description: 'Authorization framework', category: 'Authorization' },
      { name: 'JWT', description: 'JSON Web Tokens', category: 'Authentication' },
      { name: 'API Gateway', description: 'Centralized API management', category: 'Gateway' },
      { name: 'Rate Limiting', description: 'Control API usage rates', category: 'Protection' },
      { name: 'CORS', description: 'Cross-Origin Resource Sharing', category: 'Web Security' },
      { name: 'HTTPS/TLS', description: 'Encrypted communication', category: 'Encryption' },
      { name: 'RBAC', description: 'Role-Based Access Control', category: 'Authorization' },
      { name: 'Zero Trust', description: 'Never trust, always verify', category: 'Architecture' }
    ],
    scalabilityApproaches: [
      { name: 'Horizontal Scaling', description: 'Scale by adding more servers', category: 'Scaling' },
      { name: 'Vertical Scaling', description: 'Scale by upgrading hardware', category: 'Scaling' },
      { name: 'Load Balancing', description: 'Distribute traffic across servers', category: 'Distribution' },
      { name: 'Caching', description: 'Store frequently accessed data', category: 'Performance' },
      { name: 'CDN', description: 'Content Delivery Network', category: 'Distribution' },
      { name: 'Database Sharding', description: 'Partition database horizontally', category: 'Database' },
      { name: 'Read Replicas', description: 'Separate read and write databases', category: 'Database' },
      { name: 'Auto Scaling', description: 'Automatic resource adjustment', category: 'Cloud' }
    ],
    monitoringSolutions: [
      { name: 'Prometheus', description: 'Open-source monitoring system', category: 'Metrics' },
      { name: 'Grafana', description: 'Analytics and monitoring platform', category: 'Visualization' },
      { name: 'ELK Stack', description: 'Elasticsearch, Logstash, Kibana', category: 'Logging' },
      { name: 'New Relic', description: 'Application performance monitoring', category: 'APM' },
      { name: 'Datadog', description: 'Cloud monitoring platform', category: 'APM' },
      { name: 'Sentry', description: 'Error tracking and monitoring', category: 'Error Tracking' },
      { name: 'Jaeger', description: 'Distributed tracing system', category: 'Tracing' },
      { name: 'CloudWatch', description: 'AWS monitoring service', category: 'Cloud' }
    ]
  };

  // Generate AI feature suggestions when entering step 1
  useEffect(() => {
    if (currentStep === 1 && !hasGeneratedFeatures && requirements.description.trim()) {
      generateFeatureSuggestions();
    }
  }, [currentStep, requirements.description, hasGeneratedFeatures]);

  const generateFeatureSuggestions = async () => {
    setIsGeneratingFeatures(true);
    try {
      // Simulate AI analysis of project description to suggest relevant features
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Mock AI-generated feature suggestions based on project description
      const aiSuggestions: FeatureSuggestion[] = [
        // Core features (AI suggests these as essential)
        { name: 'User Authentication', category: 'core', description: 'Secure login and registration system', selected: true, aiSuggested: true },
        { name: 'User Profiles', category: 'core', description: 'Personal user accounts and settings', selected: true, aiSuggested: true },
        { name: 'Data Storage', category: 'core', description: 'Persistent data management', selected: true, aiSuggested: true },
        { name: 'Search Functionality', category: 'core', description: 'Find and filter content', selected: true, aiSuggested: true },
        
        // Optional features (AI suggests based on common patterns)
        { name: 'Real-time Chat', category: 'optional', description: 'Live messaging between users', selected: false, aiSuggested: true },
        { name: 'Push Notifications', category: 'optional', description: 'Engage users with timely updates', selected: false, aiSuggested: true },
        { name: 'File Upload', category: 'optional', description: 'Allow users to upload documents/images', selected: false, aiSuggested: true },
        { name: 'Social Login', category: 'optional', description: 'Login with Google, Facebook, etc.', selected: false, aiSuggested: true },
        
        // Advanced features
        { name: 'Payment Processing', category: 'advanced', description: 'Handle transactions and billing', selected: false, aiSuggested: true },
        { name: 'Admin Dashboard', category: 'advanced', description: 'Administrative control panel', selected: false, aiSuggested: true },
        { name: 'API Integration', category: 'advanced', description: 'Connect with third-party services', selected: false, aiSuggested: true },
        { name: 'Data Analytics', category: 'advanced', description: 'Track usage and performance metrics', selected: false, aiSuggested: true },
        
        // Additional common features (not AI suggested)
        { name: 'Email System', category: 'optional', description: 'Send automated emails', selected: false, aiSuggested: false },
        { name: 'Mobile App', category: 'advanced', description: 'Native mobile application', selected: false, aiSuggested: false },
        { name: 'Multi-language Support', category: 'advanced', description: 'Internationalization features', selected: false, aiSuggested: false },
        { name: 'Dark Mode', category: 'optional', description: 'Alternative UI theme', selected: false, aiSuggested: false }
      ];

      setFeatureSuggestions(aiSuggestions);
      
      // Update requirements with pre-selected core features
      const selectedFeatures = aiSuggestions.filter(f => f.selected).map(f => f.name);
      setRequirements(prev => ({ ...prev, features: selectedFeatures }));
      
      setHasGeneratedFeatures(true);
      toast.success('AI has analyzed your project and suggested relevant features!');
    } catch (error) {
      toast.error('Failed to generate feature suggestions');
    } finally {
      setIsGeneratingFeatures(false);
    }
  };

  const handleRefineWithAI = async (content: string) => {
    if (!content.trim()) {
      toast.error('Please enter some project requirements first');
      return;
    }

    setIsRefining(true);
    try {
      const result = await execute(
        `Refine and improve this project description: ${content}. Make it more detailed, structured, and comprehensive for software development planning.`,
        'generate'
      );
      
      if (result.success) {
        // Simulate AI refinement - in real app this would use actual AI response
        const refined = `${content}\n\n[AI Refined]\nBased on your description, here are some enhanced details:\n\n• Clear user authentication and authorization system\n• Responsive design for mobile and desktop\n• Real-time data synchronization\n• Scalable backend architecture\n• Comprehensive error handling and logging\n• Performance optimization and caching strategies`;
        
        setRefinedContent(refined);
        setRequirements(prev => ({ ...prev, description: refined }));
        toast.success('Requirements refined with AI assistance!');
      }
    } catch (error) {
      toast.error('Failed to refine requirements. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  const toggleFeature = (featureName: string) => {
    setFeatureSuggestions(prev => 
      prev.map(f => 
        f.name === featureName 
          ? { ...f, selected: !f.selected }
          : f
      )
    );
    
    setRequirements(prev => ({
      ...prev,
      features: prev.features.includes(featureName)
        ? prev.features.filter(f => f !== featureName)
        : [...prev.features, featureName]
    }));
  };

  const toggleTechOption = (category: keyof typeof requirements.techStack, optionName: string) => {
    setRequirements(prev => ({
      ...prev,
      techStack: {
        ...prev.techStack,
        [category]: prev.techStack[category].includes(optionName)
          ? prev.techStack[category].filter(item => item !== optionName)
          : [...prev.techStack[category], optionName]
      }
    }));
  };

  const toggleArchitectureOption = (category: keyof typeof requirements.architecture, optionName: string) => {
    setRequirements(prev => ({
      ...prev,
      architecture: {
        ...prev.architecture,
        [category]: prev.architecture[category].includes(optionName)
          ? prev.architecture[category].filter(item => item !== optionName)
          : [...prev.architecture[category], optionName]
      }
    }));
  };

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate blueprint and navigate to blueprint page
      navigate('/blueprint');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return requirements.description.trim().length > 50;
      case 1:
        return requirements.features.length > 0;
      case 2:
        return Object.values(requirements.techStack).some(arr => arr.length > 0);
      case 3:
        return Object.values(requirements.architecture).some(arr => arr.length > 0) && 
               requirements.timeline && requirements.targetAudience;
      default:
        return true;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'optional':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const renderTechSection = (
    title: string, 
    category: keyof typeof requirements.techStack, 
    options: typeof technicalOptions.programmingLanguages,
    icon: React.ComponentType<{ className?: string }>
  ) => {
    const IconComponent = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4 text-primary" />
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {requirements.techStack[category].length} selected
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {options.map((option) => (
            <div
              key={option.name}
              className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                requirements.techStack[category].includes(option.name)
                  ? 'border-primary bg-primary/5'
                  : 'border-muted'
              }`}
              onClick={() => toggleTechOption(category, option.name)}
            >
              <Checkbox
                checked={requirements.techStack[category].includes(option.name)}
                onChange={() => {}} // Handled by parent onClick
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {option.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderArchitectureSection = (
    title: string, 
    category: keyof typeof requirements.architecture, 
    options: typeof architectureOptions.applicationArchitecture,
    icon: React.ComponentType<{ className?: string }>
  ) => {
    const IconComponent = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4 text-primary" />
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {requirements.architecture[category].length} selected
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {options.map((option) => (
            <div
              key={option.name}
              className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                requirements.architecture[category].includes(option.name)
                  ? 'border-primary bg-primary/5'
                  : 'border-muted'
              }`}
              onClick={() => toggleArchitectureOption(category, option.name)}
            >
              <Checkbox
                checked={requirements.architecture[category].includes(option.name)}
                onChange={() => {}} // Handled by parent onClick
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {option.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Project Requirements
              </CardTitle>
              <CardDescription>
                Describe your software project in detail. What problem does it solve? Who are your users?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your software project in detail. Include the problem it solves, target users, main functionality, and any specific requirements..."
                  value={requirements.description}
                  onChange={(e) => setRequirements(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{requirements.description.length} characters</span>
                  <span>Minimum 50 characters required</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleRefineWithAI(requirements.description)}
                  disabled={isRefining || !requirements.description.trim()}
                  variant="outline"
                  className="flex-1"
                >
                  {isRefining ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Refine with AI
                    </>
                  )}
                </Button>
                
                {refinedContent && (
                  <Button
                    onClick={() => setRequirements(prev => ({ ...prev, description: '' }))}
                    variant="ghost"
                    size="sm"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {refinedContent && (
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    AI has enhanced your project description with additional technical details and best practices.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Features & Scope
              </CardTitle>
              <CardDescription>
                AI has analyzed your project and suggested relevant features. You can unselect any features you don't need.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isGeneratingFeatures ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <div>
                      <p className="font-medium">AI is analyzing your project...</p>
                      <p className="text-sm text-muted-foreground">Generating relevant feature suggestions</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {hasGeneratedFeatures && (
                    <Alert>
                      <Wand2 className="h-4 w-4" />
                      <AlertDescription>
                        AI has suggested {featureSuggestions.filter(f => f.aiSuggested).length} features based on your project description. 
                        Core features are pre-selected, but you can customize any selections.
                      </AlertDescription>
                    </Alert>
                  )}

                  {!hasGeneratedFeatures && requirements.description.trim() && (
                    <div className="text-center py-8">
                      <Button onClick={generateFeatureSuggestions} className="mb-4">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate AI Feature Suggestions
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Let AI analyze your project description and suggest relevant features
                      </p>
                    </div>
                  )}

                  {featureSuggestions.length > 0 && (
                    <div className="space-y-6">
                      {/* Core Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Core Features</h4>
                          <Badge className={getCategoryColor('core')}>Essential</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'core')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Optional Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Optional Features</h4>
                          <Badge className={getCategoryColor('optional')}>Recommended</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'optional')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Advanced Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Advanced Features</h4>
                          <Badge className={getCategoryColor('advanced')}>Complex</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'advanced')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Selected Features Summary */}
                      {requirements.features.length > 0 && (
                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <Label>Selected Features ({requirements.features.length})</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFeatureSuggestions(prev => prev.map(f => ({ ...f, selected: false })));
                                setRequirements(prev => ({ ...prev, features: [] }));
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Clear All
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {requirements.features.map((feature) => {
                              const suggestion = featureSuggestions.find(f => f.name === feature);
                              return (
                                <Badge 
                                  key={feature} 
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {feature}
                                  {suggestion?.aiSuggested && (
                                    <Sparkles className="h-3 w-3" />
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Technical Preferences
              </CardTitle>
              <CardDescription>
                Select your preferred technologies and tools. You can choose multiple options from each category.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {renderTechSection('Programming Languages', 'programmingLanguages', technicalOptions.programmingLanguages, Code2)}
              {renderTechSection('Frontend Frameworks', 'frontendFrameworks', technicalOptions.frontendFrameworks, Monitor)}
              {renderTechSection('Backend Technologies', 'backendTechnologies', technicalOptions.backendTechnologies, Server)}
              {renderTechSection('Database Systems', 'databaseSystems', technicalOptions.databaseSystems, Database)}
              {renderTechSection('Cloud Platforms', 'cloudPlatforms', technicalOptions.cloudPlatforms, Cloud)}
              {renderTechSection('Development Tools', 'developmentTools', technicalOptions.developmentTools, Settings)}

              {/* Summary */}
              {Object.values(requirements.techStack).some(arr => arr.length > 0) && (
                <div className="space-y-3 pt-6 border-t">
                  <h4 className="font-medium">Technology Stack Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(requirements.techStack).map(([category, items]) => (
                      items.length > 0 && (
                        <div key={category} className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex flex-wrap gap-1">
                            {items.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Architecture & Data
              </CardTitle>
              <CardDescription>
                Define your system architecture patterns and project planning details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {renderArchitectureSection('Application Architecture', 'applicationArchitecture', architectureOptions.applicationArchitecture, Server)}
              {renderArchitectureSection('Data Storage Patterns', 'dataStoragePatterns', architectureOptions.dataStoragePatterns, Database)}
              {renderArchitectureSection('Integration Patterns', 'integrationPatterns', architectureOptions.integrationPatterns, Settings)}
              {renderArchitectureSection('Security Patterns', 'securityPatterns', architectureOptions.securityPatterns, Shield)}
              {renderArchitectureSection('Scalability Approaches', 'scalabilityApproaches', architectureOptions.scalabilityApproaches, TrendingUp)}
              {renderArchitectureSection('Monitoring Solutions', 'monitoringSolutions', architectureOptions.monitoringSolutions, Monitor)}

              {/* Project Planning */}
              <div className="space-y-4 pt-6 border-t">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Project Planning
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline *</Label>
                    <select
                      id="timeline"
                      value={requirements.timeline}
                      onChange={(e) => setRequirements(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select timeline</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="12+ months">12+ months</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <select
                      id="budget"
                      value={requirements.budget}
                      onChange={(e) => setRequirements(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select budget</option>
                      <option value="Under $10k">Under $10k</option>
                      <option value="$10k - $50k">$10k - $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k+">$100k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience *</Label>
                  <Textarea
                    id="audience"
                    placeholder="Describe your target users, their needs, and how they will use your application..."
                    value={requirements.targetAudience}
                    onChange={(e) => setRequirements(prev => ({ ...prev, targetAudience: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Architecture Summary */}
              {Object.values(requirements.architecture).some(arr => arr.length > 0) && (
                <div className="space-y-3 pt-6 border-t">
                  <h4 className="font-medium">Architecture Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(requirements.architecture).map(([category, items]) => (
                      items.length > 0 && (
                        <div key={category} className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex flex-wrap gap-1">
                            {items.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Review & Generate Blueprint
              </CardTitle>
              <CardDescription>
                Review your project details and generate your comprehensive blueprint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project Description</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {requirements.description.substring(0, 200)}...
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features ({requirements.features.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {requirements.features.map((feature) => {
                      const suggestion = featureSuggestions.find(f => f.name === feature);
                      return (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className="text-xs flex items-center gap-1"
                        >
                          {feature}
                          {suggestion?.aiSuggested && (
                            <Sparkles className="h-3 w-3" />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Technology Stack</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(requirements.techStack).map(([category, items]) => (
                      items.length > 0 && (
                        <div key={category} className="space-y-1">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex flex-wrap gap-1">
                            {items.map((item) => (
                              <Badge key={item} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Architecture Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(requirements.architecture).map(([category, items]) => (
                      items.length > 0 && (
                        <div key={category} className="space-y-1">
                          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <div className="flex flex-wrap gap-1">
                            {items.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Timeline</h4>
                    <p className="text-sm text-muted-foreground">{requirements.timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground">{requirements.budget || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Your blueprint will include: Architecture diagrams, database schema, component specifications, 
                  development roadmap, and deployment guidelines.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Blueprint - DevBlueprint AI</title>
        <meta name="description" content="Create a comprehensive development blueprint for your software project with our step-by-step wizard." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline">Blueprint Wizard</Badge>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercentage} className="w-32" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      index === currentStep
                        ? 'bg-primary border-primary text-primary-foreground'
                        : step.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-background border-muted-foreground text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        index === currentStep ? 'text-primary' : step.completed ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      step.completed ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Generate Blueprint
                    <Download className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}