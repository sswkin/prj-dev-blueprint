import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Lightbulb, 
  BarChart3, 
  Search, 
  Layers, 
  Puzzle, 
  Database, 
  Download,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Code,
  GitBranch,
  Settings,
  FileText,
  Share2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  Clock,
  Globe,
  Cpu,
  Cloud,
  Lock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const wireframes = [
  {
    id: 1,
    title: "Idea Capture Screen",
    description: "Entry point where users describe their project idea",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    nextScreen: "Analysis Dashboard",
    components: [
      "Hero text: 'Turn ideas into deployable blueprints'",
      "Input field (centered, 60% width): 'Describe your idea in one sentence...'",
      "Floating 'Analyze' button (fixed to keyboard on mobile)",
      "Background: Subtle animated nodes (connection metaphor)"
    ],
    annotations: [
      "On enter/button click, auto-advance to Analysis Dashboard with loading spinner"
    ]
  },
  {
    id: 2,
    title: "Analysis Dashboard",
    description: "AI analyzes the idea and presents validation insights",
    icon: BarChart3,
    color: "from-blue-500 to-purple-500",
    nextScreen: "Research Hub",
    components: [
      "Tag cloud (top-left): Dynamic AI-generated tags",
      "Idea expansion cards (3-column grid, swipeable on mobile)",
      "Risk panel (right drawer): Collapsible warnings",
      "Progress stepper: 'Step 2/7 - Validation'"
    ],
    annotations: [
      "Click any card → Research Hub pre-populated with selected concept"
    ]
  },
  {
    id: 3,
    title: "Research Hub",
    description: "Deep dive into market research and competitive analysis",
    icon: Search,
    color: "from-green-500 to-teal-500",
    nextScreen: "System Architect",
    components: [
      "Search interface with AI suggestions",
      "Competitor analysis grid",
      "Market trends visualization",
      "Research notes panel"
    ],
    annotations: [
      "Manual entry from dashboard",
      "Research completion triggers next step"
    ]
  },
  {
    id: 4,
    title: "System Architect",
    description: "Define system architecture and technology stack",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    nextScreen: "Component Forge",
    components: [
      "Architecture diagram builder",
      "Technology stack selector",
      "Scalability recommendations",
      "Integration points mapper"
    ],
    annotations: [
      "Linked from research completion",
      "Parallel access with Component Forge"
    ]
  },
  {
    id: 5,
    title: "Component Forge",
    description: "Design and specify individual components",
    icon: Puzzle,
    color: "from-red-500 to-orange-500",
    nextScreen: "Schema Lab",
    components: [
      "Component library browser",
      "Custom component designer",
      "Props and state manager",
      "Component relationship mapper"
    ],
    annotations: [
      "Accessed via system design",
      "Parallel access with Schema Lab"
    ]
  },
  {
    id: 6,
    title: "Schema Lab",
    description: "Database design and API specification",
    icon: Database,
    color: "from-indigo-500 to-blue-500",
    nextScreen: "Blueprint Exporter",
    components: [
      "Database schema designer",
      "API endpoint builder",
      "Data relationship visualizer",
      "Migration script generator"
    ],
    annotations: [
      "Parallel access with Component Forge",
      "Auto-sync with component requirements"
    ]
  },
  {
    id: 7,
    title: "Blueprint Exporter",
    description: "Final consolidation and export of the complete blueprint",
    icon: Download,
    color: "from-emerald-500 to-green-500",
    nextScreen: null,
    components: [
      "Blueprint preview with all sections",
      "Export format selector (PDF, JSON, Markdown)",
      "Sharing options and collaboration tools",
      "Implementation roadmap generator"
    ],
    annotations: [
      "Final consolidation screen",
      "Multiple export formats available"
    ]
  }
];

// Design components for each wireframe
const WireframeDesigns = {
  1: ({ viewMode }: { viewMode: string }) => (
    <div className={`relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl border ${
      viewMode === 'mobile' ? 'h-[600px]' : viewMode === 'tablet' ? 'h-[500px]' : 'h-[600px]'
    }`}>
      {/* Animated background nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className={`font-bold text-gray-900 dark:text-gray-100 mb-6 ${
            viewMode === 'mobile' ? 'text-3xl' : 'text-5xl'
          }`}>
            Turn ideas into deployable blueprints
          </h1>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <Input
              placeholder="Describe your idea in one sentence..."
              className={`text-center bg-white/80 backdrop-blur-sm border-2 border-yellow-200 focus:border-yellow-400 shadow-lg ${
                viewMode === 'mobile' ? 'text-base py-4' : 'text-lg py-6'
              }`}
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-500" />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg">
              <Zap className="mr-2 h-5 w-5" />
              Analyze Idea
            </Button>
          </motion.div>

          <p className="text-gray-600 dark:text-gray-400 mt-6 text-sm">
            AI-powered analysis in under 30 seconds
          </p>
        </motion.div>
      </div>
    </div>
  ),

  2: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Progress Stepper */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Step 2 of 7</span>
          <span className="text-sm text-gray-500">Validation</span>
        </div>
        <Progress value={28} className="h-2" />
      </div>

      {/* Tag Cloud */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">AI-Generated Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['E-commerce', 'React', 'Node.js', 'Scalable', 'Mobile-first', 'API', 'Database'].map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Idea Expansion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: 'Market Opportunity', icon: TrendingUp, score: 85, color: 'green' },
          { title: 'Technical Feasibility', icon: Code, score: 92, color: 'blue' },
          { title: 'Competition Level', icon: Users, score: 67, color: 'yellow' }
        ].map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    card.color === 'green' ? 'bg-green-100 text-green-600' :
                    card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{card.title}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span className="font-bold">{card.score}%</span>
                  </div>
                  <Progress value={card.score} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Risk Panel */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <span>High competition in e-commerce space</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>Complex payment integration required</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),

  3: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Search Interface */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search competitors, market trends, technologies..."
            className="pl-10 bg-white/80 backdrop-blur-sm border-green-200 focus:border-green-400"
          />
        </div>
        <div className="flex gap-2 mt-3">
          {['Shopify competitors', 'E-commerce trends 2024', 'React best practices'].map((suggestion) => (
            <Badge key={suggestion} variant="outline" className="text-xs cursor-pointer hover:bg-green-100">
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs for different research areas */}
      <Tabs defaultValue="competitors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="notes">Research Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="competitors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Shopify', strength: 'High', users: '2M+', funding: '$2.9B' },
              { name: 'WooCommerce', strength: 'Medium', users: '5M+', funding: 'Open Source' },
              { name: 'BigCommerce', strength: 'Medium', users: '60K+', funding: '$200M' },
              { name: 'Magento', strength: 'High', users: '250K+', funding: 'Adobe Owned' }
            ].map((competitor) => (
              <Card key={competitor.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{competitor.name}</h4>
                    <Badge variant={competitor.strength === 'High' ? 'destructive' : 'secondary'}>
                      {competitor.strength}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Users: {competitor.users}</div>
                    <div>Funding: {competitor.funding}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="space-y-4">
            {[
              { trend: 'Headless Commerce Growth', impact: '+45%', timeframe: '2024' },
              { trend: 'Mobile Commerce Dominance', impact: '73%', timeframe: 'Current' },
              { trend: 'AI-Powered Personalization', impact: '+32%', timeframe: '2024-2025' }
            ].map((item) => (
              <Card key={item.trend}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{item.trend}</h4>
                      <p className="text-sm text-gray-600">{item.timeframe}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {item.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Key Insight</p>
                    <p className="text-sm text-gray-600">Mobile-first approach is crucial - 73% of e-commerce traffic is mobile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Opportunity</p>
                    <p className="text-sm text-gray-600">Headless commerce growing 45% - good timing for modern architecture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Challenge</p>
                    <p className="text-sm text-gray-600">High competition requires strong differentiation strategy</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),

  4: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Architecture Diagram */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">System Architecture</h3>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border-2 border-purple-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Frontend */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-2">
                <Monitor className="h-8 w-8 mx-auto text-blue-600" />
              </div>
              <h4 className="font-medium">Frontend</h4>
              <p className="text-sm text-gray-600">React + TypeScript</p>
            </div>
            
            {/* Backend */}
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-2">
                <Cpu className="h-8 w-8 mx-auto text-green-600" />
              </div>
              <h4 className="font-medium">Backend</h4>
              <p className="text-sm text-gray-600">Node.js + Express</p>
            </div>
            
            {/* Database */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-2">
                <Database className="h-8 w-8 mx-auto text-purple-600" />
              </div>
              <h4 className="font-medium">Database</h4>
              <p className="text-sm text-gray-600">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Selector */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'React', category: 'Frontend', selected: true },
            { name: 'Node.js', category: 'Backend', selected: true },
            { name: 'PostgreSQL', category: 'Database', selected: true },
            { name: 'Redis', category: 'Cache', selected: false },
            { name: 'Docker', category: 'DevOps', selected: true },
            { name: 'AWS', category: 'Cloud', selected: false },
            { name: 'Stripe', category: 'Payment', selected: true },
            { name: 'Jest', category: 'Testing', selected: false }
          ].map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                tech.selected 
                  ? 'border-purple-300 bg-purple-50 dark:bg-purple-950/30' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="text-center">
                <div className={`w-8 h-8 mx-auto mb-2 rounded ${
                  tech.selected ? 'bg-purple-500' : 'bg-gray-300'
                }`} />
                <p className="text-sm font-medium">{tech.name}</p>
                <p className="text-xs text-gray-500">{tech.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scalability Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Scalability Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Microservices architecture recommended for user management and payment processing
              </AlertDescription>
            </Alert>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Consider CDN integration for static assets and global performance
              </AlertDescription>
            </Alert>
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Implement caching strategy with Redis for session management
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  ),

  5: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Component Library Browser */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Component Library</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Header', type: 'Layout', icon: '🏠' },
            { name: 'Product Card', type: 'Display', icon: '🛍️' },
            { name: 'Cart', type: 'Interactive', icon: '🛒' },
            { name: 'Button', type: 'Input', icon: '🔘' },
            { name: 'Modal', type: 'Overlay', icon: '📱' },
            { name: 'Form', type: 'Input', icon: '📝' },
            { name: 'Navigation', type: 'Layout', icon: '🧭' },
            { name: 'Footer', type: 'Layout', icon: '📄' }
          ].map((component) => (
            <motion.div
              key={component.name}
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-lg border hover:border-red-300 cursor-pointer transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{component.icon}</div>
                <p className="text-sm font-medium">{component.name}</p>
                <p className="text-xs text-gray-500">{component.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Component Designer */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Component Designer</h3>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-3">Properties</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Component Name</label>
                    <Input placeholder="ProductCard" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Props</label>
                    <div className="space-y-2 mt-1">
                      {['title: string', 'price: number', 'image: string', 'onAddToCart: function'].map((prop) => (
                        <div key={prop} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{prop}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Preview</h4>
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
                    <h5 className="font-medium text-sm">Sample Product</h5>
                    <p className="text-sm text-gray-600">$29.99</p>
                    <Button size="sm" className="mt-2 w-full">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Relationships */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Component Relationships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Header → Navigation → UserMenu</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>ProductGrid → ProductCard → AddToCartButton</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Cart → CartItem → QuantitySelector</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),

  6: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Database Schema Designer */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Database Schema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              table: 'users',
              fields: ['id (UUID)', 'email (VARCHAR)', 'password_hash (VARCHAR)', 'created_at (TIMESTAMP)']
            },
            {
              table: 'products',
              fields: ['id (UUID)', 'name (VARCHAR)', 'price (DECIMAL)', 'description (TEXT)', 'image_url (VARCHAR)']
            },
            {
              table: 'orders',
              fields: ['id (UUID)', 'user_id (UUID)', 'total (DECIMAL)', 'status (ENUM)', 'created_at (TIMESTAMP)']
            },
            {
              table: 'order_items',
              fields: ['id (UUID)', 'order_id (UUID)', 'product_id (UUID)', 'quantity (INTEGER)', 'price (DECIMAL)']
            }
          ].map((table) => (
            <Card key={table.table} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  {table.table}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {table.fields.map((field) => (
                    <div key={field} className="text-xs font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                      {field}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Endpoint Builder */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[
                { method: 'GET', endpoint: '/api/products', description: 'Fetch all products' },
                { method: 'POST', endpoint: '/api/products', description: 'Create new product' },
                { method: 'GET', endpoint: '/api/orders/:id', description: 'Fetch order details' },
                { method: 'POST', endpoint: '/api/orders', description: 'Create new order' },
                { method: 'PUT', endpoint: '/api/users/:id', description: 'Update user profile' }
              ].map((api) => (
                <div key={`${api.method}-${api.endpoint}`} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <Badge variant={
                    api.method === 'GET' ? 'secondary' :
                    api.method === 'POST' ? 'default' :
                    'outline'
                  } className="text-xs">
                    {api.method}
                  </Badge>
                  <code className="text-sm font-mono flex-1">{api.endpoint}</code>
                  <span className="text-xs text-gray-600">{api.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Relationships */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Data Relationships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>users.id → orders.user_id (One-to-Many)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>orders.id → order_items.order_id (One-to-Many)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>products.id → order_items.product_id (One-to-Many)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),

  7: ({ viewMode }: { viewMode: string }) => (
    <div className={`bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl border p-6 ${
      viewMode === 'mobile' ? 'h-[600px]' : 'h-[600px]'
    } overflow-y-auto`}>
      {/* Blueprint Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Blueprint Preview</h3>
        <Card className="border-2 border-green-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { section: 'Architecture', status: 'Complete', items: 7 },
                { section: 'Components', status: 'Complete', items: 12 },
                { section: 'Database', status: 'Complete', items: 4 },
                { section: 'API Docs', status: 'Complete', items: 15 },
                { section: 'Deployment', status: 'Generated', items: 3 },
                { section: 'Testing', status: 'Generated', items: 8 }
              ].map((section) => (
                <div key={section.section} className="text-center p-3 bg-white/80 rounded-lg border">
                  <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <h4 className="font-medium text-sm">{section.section}</h4>
                  <p className="text-xs text-gray-600">{section.items} items</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {section.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Export Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { format: 'PDF', icon: FileText, description: 'Complete documentation', size: '2.4 MB' },
            { format: 'JSON', icon: Code, description: 'Machine-readable data', size: '156 KB' },
            { format: 'Markdown', icon: FileText, description: 'Developer-friendly docs', size: '89 KB' }
          ].map((format) => (
            <motion.div
              key={format.format}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <Card className="border-2 hover:border-green-300 transition-colors">
                <CardContent className="p-4 text-center">
                  <format.icon className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h4 className="font-medium">{format.format}</h4>
                  <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                  <Badge variant="outline" className="text-xs">{format.size}</Badge>
                  <Button size="sm" className="w-full mt-3">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sharing & Collaboration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Blueprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Enter email address" className="flex-1" />
                <Button size="sm">Invite</Button>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Public link sharing</span>
                <Button variant="outline" size="sm">Copy Link</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Implementation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Week 1-2: Setup & Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Week 3-4: Core Components</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Week 5-6: Database & API</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Week 7-8: Testing & Deployment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export default function WireframesPage() {
  const [currentWireframe, setCurrentWireframe] = useState(0);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const nextWireframe = () => {
    setCurrentWireframe((prev) => (prev + 1) % wireframes.length);
  };

  const prevWireframe = () => {
    setCurrentWireframe((prev) => (prev - 1 + wireframes.length) % wireframes.length);
  };

  const currentWire = wireframes[currentWireframe];
  const DesignComponent = WireframeDesigns[currentWire.id as keyof typeof WireframeDesigns];

  return (
    <>
      <Helmet>
        <title>User Flow Designs - DevBlueprint AI</title>
        <meta name="description" content="Complete user flow designs showing the journey from idea input to blueprint export with modern web design principles." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">User Flow Designs</h1>
                  <p className="text-muted-foreground">Complete journey from idea to blueprint</p>
                </div>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="transition-all"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="transition-all"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="transition-all"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Wireframe Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Screen Flow
                  </CardTitle>
                  <CardDescription>
                    Navigate through the complete user journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {wireframes.map((wireframe, index) => (
                    <motion.button
                      key={wireframe.id}
                      onClick={() => setCurrentWireframe(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        index === currentWireframe
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-muted hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          index === currentWireframe
                            ? 'bg-primary-foreground/20'
                            : 'bg-muted'
                        }`}>
                          <wireframe.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{wireframe.title}</div>
                          <div className={`text-xs ${
                            index === currentWireframe
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}>
                            Step {wireframe.id}/7
                          </div>
                        </div>
                        {index === currentWireframe && (
                          <Play className="h-4 w-4" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Design Display */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWireframe}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Design Header */}
                  <Card className="border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${currentWire.color} shadow-lg`}>
                            <currentWire.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{currentWire.title}</CardTitle>
                            <CardDescription className="text-base">
                              {currentWire.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="font-medium">
                            Step {currentWire.id}/7
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {viewMode}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Fully Designed Interface */}
                  <Card className="border-2 shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-primary" />
                        Live Design Preview
                        <Badge variant="outline" className="ml-auto">
                          Interactive
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className={`mx-auto transition-all duration-300 ${
                        viewMode === 'mobile' ? 'max-w-sm' :
                        viewMode === 'tablet' ? 'max-w-2xl' :
                        'w-full'
                      }`}>
                        <DesignComponent viewMode={viewMode} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Design Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Components Section */}
                    <Card className="border-2 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Puzzle className="h-5 w-5 text-blue-500" />
                          Components
                        </CardTitle>
                        <CardDescription>
                          Key interface elements and layout structure
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {currentWire.components.map((component, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{component}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Annotations Section */}
                    <Card className="border-2 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Settings className="h-5 w-5 text-green-500" />
                          Interactions
                        </CardTitle>
                        <CardDescription>
                          Behavior patterns and user flow logic
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {currentWire.annotations.map((annotation, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm font-medium leading-relaxed">{annotation}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                    <Button
                      variant="outline"
                      onClick={prevWireframe}
                      disabled={currentWireframe === 0}
                      className="transition-all hover:shadow-md"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {wireframes.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentWireframe(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === currentWireframe
                              ? 'bg-primary w-8'
                              : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={nextWireframe}
                      disabled={currentWireframe === wireframes.length - 1}
                      className="transition-all hover:shadow-md"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Next Screen Indicator */}
                  {currentWire.nextScreen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5 shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <ArrowRight className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <span className="text-sm font-medium">Next Screen:</span>
                                <p className="text-sm text-muted-foreground">{currentWire.nextScreen}</p>
                              </div>
                            </div>
                            <Button
                              onClick={nextWireframe}
                              disabled={currentWireframe === wireframes.length - 1}
                              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                            >
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}