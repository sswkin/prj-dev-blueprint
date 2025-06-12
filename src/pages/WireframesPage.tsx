import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  BarChart3,
  Search,
  Layers,
  Puzzle,
  Database,
  Download,
  Play,
  Pause,
  RotateCcw,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface WireframeScreen {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  nextScreen?: string;
  prevScreen?: string;
  keyFeatures: string[];
  navigationElements: string[];
  userActions: string[];
}

const wireframeScreens: WireframeScreen[] = [
  {
    id: 'idea-capture',
    title: 'Idea Capture Screen',
    description: 'Entry point where users input their project ideas and initial requirements',
    icon: Lightbulb,
    nextScreen: 'analysis-dashboard',
    keyFeatures: [
      'Hero text: "Turn ideas into deployable blueprints"',
      'Centered input field (60% width)',
      'Floating "Analyze" button (fixed to keyboard on mobile)',
      'Subtle animated nodes background (connection metaphor)',
      'Auto-advance to Analysis Dashboard on enter/button click'
    ],
    navigationElements: [
      'Minimal header with logo',
      'Clean, distraction-free interface',
      'Floating analyze button',
      'Subtle progress indication'
    ],
    userActions: [
      'Enter project idea in one sentence',
      'Press Enter or click Analyze button',
      'Auto-advance to Analysis Dashboard with loading spinner',
      'View animated connection nodes in background'
    ]
  },
  {
    id: 'analysis-dashboard',
    title: 'Analysis Dashboard',
    description: 'Auto-triggered after idea input, shows AI analysis results and project insights',
    icon: BarChart3,
    nextScreen: 'research-hub',
    prevScreen: 'idea-capture',
    keyFeatures: [
      'AI analysis summary cards',
      'Project complexity meter',
      'Technology recommendations',
      'Timeline estimation',
      'Risk assessment indicators'
    ],
    navigationElements: [
      'Back to idea editing',
      'Progress indicator (Step 2 of 7)',
      'Continue to Research button',
      'Export analysis option'
    ],
    userActions: [
      'Review AI analysis results',
      'Adjust project parameters if needed',
      'Proceed to research phase',
      'Return to edit idea if necessary'
    ]
  },
  {
    id: 'research-hub',
    title: 'Research Hub',
    description: 'Manual entry from dashboard for deep-dive research and competitive analysis',
    icon: Search,
    nextScreen: 'system-architect',
    prevScreen: 'analysis-dashboard',
    keyFeatures: [
      'Competitor analysis grid',
      'Technology trend insights',
      'Market research data',
      'Best practices library',
      'Reference project examples'
    ],
    navigationElements: [
      'Back to Analysis Dashboard',
      'Progress indicator (Step 3 of 7)',
      'Skip Research option',
      'Continue to Architecture button'
    ],
    userActions: [
      'Explore competitor solutions',
      'Review technology trends',
      'Select reference projects',
      'Add research notes',
      'Proceed to system design'
    ]
  },
  {
    id: 'system-architect',
    title: 'System Architect',
    description: 'Linked from research completion, design overall system architecture',
    icon: Layers,
    nextScreen: 'component-forge',
    prevScreen: 'research-hub',
    keyFeatures: [
      'Interactive architecture diagram',
      'Service layer definitions',
      'API endpoint planning',
      'Database relationship mapping',
      'Deployment architecture'
    ],
    navigationElements: [
      'Back to Research Hub',
      'Progress indicator (Step 4 of 7)',
      'Parallel access to Schema Lab',
      'Continue to Components button'
    ],
    userActions: [
      'Design system architecture',
      'Define service boundaries',
      'Plan API structure',
      'Set up data flow',
      'Move to component design'
    ]
  },
  {
    id: 'component-forge',
    title: 'Component Forge',
    description: 'Accessed via system design, create and organize individual components',
    icon: Puzzle,
    nextScreen: 'schema-lab',
    prevScreen: 'system-architect',
    keyFeatures: [
      'Component library builder',
      'UI/UX wireframe tools',
      'Component relationship mapper',
      'Reusable pattern library',
      'Responsive design preview'
    ],
    navigationElements: [
      'Back to System Architect',
      'Progress indicator (Step 5 of 7)',
      'Switch to Schema Lab',
      'Continue to Schema button'
    ],
    userActions: [
      'Create UI components',
      'Define component hierarchy',
      'Set up component relationships',
      'Design responsive layouts',
      'Proceed to data modeling'
    ]
  },
  {
    id: 'schema-lab',
    title: 'Schema Lab',
    description: 'Parallel access with component forge, design data models and database schema',
    icon: Database,
    nextScreen: 'blueprint-exporter',
    prevScreen: 'component-forge',
    keyFeatures: [
      'Visual database designer',
      'Entity relationship diagrams',
      'Data validation rules',
      'Migration planning',
      'Performance optimization hints'
    ],
    navigationElements: [
      'Back to Component Forge',
      'Progress indicator (Step 6 of 7)',
      'Switch to Components view',
      'Generate Blueprint button'
    ],
    userActions: [
      'Design database schema',
      'Create entity relationships',
      'Define data validation',
      'Plan migrations',
      'Finalize data structure'
    ]
  },
  {
    id: 'blueprint-exporter',
    title: 'Blueprint Exporter',
    description: 'Final consolidation screen where users review and export their complete blueprint',
    icon: Download,
    prevScreen: 'schema-lab',
    keyFeatures: [
      'Complete blueprint preview',
      'Export format options (PDF, MD, JSON)',
      'Blueprint sharing options',
      'Implementation roadmap',
      'Next steps recommendations'
    ],
    navigationElements: [
      'Back to Schema Lab',
      'Progress indicator (Step 7 of 7)',
      'Start New Project button',
      'Export Blueprint button (primary CTA)'
    ],
    userActions: [
      'Review complete blueprint',
      'Select export format',
      'Download blueprint files',
      'Share with team members',
      'Start implementation or create new project'
    ]
  }
];

// Animated Nodes Component for Background
const AnimatedNodes = () => {
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const nodeCount = 20;
    const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setNodes(newNodes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection Lines */}
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 25) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={otherNode.x}
                  y2={otherNode.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: node.delay }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.5"
            fill="hsl(var(--primary))"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ 
              duration: 1, 
              delay: node.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Idea Capture Screen Component
const IdeaCaptureScreen = ({ onAnalyze }: { onAnalyze: () => void }) => {
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyze();
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-background via-background/95 to-muted/20 rounded-lg overflow-hidden">
      {/* Animated Background */}
      <AnimatedNodes />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] p-8">
        {/* Hero Text */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Turn ideas into deployable blueprints
        </motion.h1>

        {/* Input Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your idea in one sentence..."
              className="w-full h-16 text-lg px-6 py-4 rounded-xl border-2 border-muted-foreground/20 focus:border-primary bg-background/80 backdrop-blur-sm shadow-lg"
              disabled={isAnalyzing}
            />
            
            {/* Floating Analyze Button */}
            <motion.div
              className="absolute right-2 top-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={!idea.trim() || isAnalyzing}
                className="h-12 px-6 rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
            </motion.div>
          </div>
        </motion.form>

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing your idea and preparing blueprint...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Hint */}
        <motion.p 
          className="text-sm text-muted-foreground mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Press Enter or click Analyze to continue
        </motion.p>
      </div>
    </div>
  );
};

export default function WireframesPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);

  const currentWireframe = wireframeScreens[currentScreen];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % wireframeScreens.length);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + wireframeScreens.length) % wireframeScreens.length);
  };

  const goToScreen = (index: number) => {
    setCurrentScreen(index);
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsPlaying(false);
    } else {
      const interval = setInterval(() => {
        setCurrentScreen((prev) => (prev + 1) % wireframeScreens.length);
      }, 4000);
      setAutoPlayInterval(interval);
      setIsPlaying(true);
    }
  };

  const resetToStart = () => {
    setCurrentScreen(0);
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
    setIsPlaying(false);
  };

  const handleIdeaAnalyze = () => {
    // Auto-advance to Analysis Dashboard
    setCurrentScreen(1);
  };

  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [autoPlayInterval]);

  return (
    <>
      <Helmet>
        <title>User Flow Wireframes - DevBlueprint AI</title>
        <meta name="description" content="Complete user flow wireframes showing the journey from idea input to blueprint export in DevBlueprint AI." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              DevBlueprint AI - User Flow Wireframes
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Complete journey from idea input to blueprint export
            </p>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button onClick={toggleAutoPlay} variant="outline" size="sm">
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Tour
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Auto Play
                  </>
                )}
              </Button>
              <Button onClick={resetToStart} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">
                  {currentScreen + 1} of {wireframeScreens.length}
                </span>
              </div>
              <Progress value={((currentScreen + 1) / wireframeScreens.length) * 100} className="h-2" />
            </div>
          </motion.div>

          {/* Screen Navigation */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {wireframeScreens.map((screen, index) => (
              <button
                key={screen.id}
                onClick={() => goToScreen(index)}
                className={`p-2 rounded-lg transition-all ${
                  index === currentScreen
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                title={screen.title}
              >
                <screen.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Main Wireframe Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wireframe Mockup */}
            <div className="lg:col-span-2">
              <Card className="border-2 h-full">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <currentWireframe.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{currentWireframe.title}</CardTitle>
                        <CardDescription>{currentWireframe.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      Step {currentScreen + 1}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Wireframe Mockup */}
                      <div className="bg-muted/30 rounded-lg p-6 min-h-[400px] border-2 border-dashed border-muted-foreground/20">
                        <div className="space-y-4">
                          {/* Idea Capture Screen - Special Implementation */}
                          {currentScreen === 0 ? (
                            <IdeaCaptureScreen onAnalyze={handleIdeaAnalyze} />
                          ) : (
                            <>
                              {/* Header Mockup */}
                              <div className="flex items-center justify-between p-3 bg-background rounded border">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-primary/20 rounded"></div>
                                  <div className="w-24 h-4 bg-muted rounded"></div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="w-16 h-6 bg-muted rounded"></div>
                                  <div className="w-20 h-6 bg-primary/20 rounded"></div>
                                </div>
                              </div>

                              {/* Progress Indicator */}
                              <div className="p-3 bg-background rounded border">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="w-16 h-3 bg-muted rounded"></div>
                                  <div className="w-12 h-3 bg-muted rounded"></div>
                                </div>
                                <div className="w-full h-2 bg-muted rounded">
                                  <div 
                                    className="h-full bg-primary rounded transition-all duration-300"
                                    style={{ width: `${((currentScreen + 1) / wireframeScreens.length) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Main Content Area */}
                              <div className="p-6 bg-background rounded border min-h-[250px]">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3 mb-4">
                                    <currentWireframe.icon className="h-8 w-8 text-primary" />
                                    <div className="w-48 h-6 bg-muted rounded"></div>
                                  </div>
                                  
                                  {/* Dynamic content based on screen */}
                                  {currentScreen === 1 && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-3">
                                        <div className="h-16 bg-muted/50 rounded"></div>
                                        <div className="h-16 bg-muted/50 rounded"></div>
                                      </div>
                                      <div className="space-y-3">
                                        <div className="h-16 bg-muted/50 rounded"></div>
                                        <div className="h-16 bg-muted/50 rounded"></div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {currentScreen === 2 && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-4 gap-2">
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                      </div>
                                      <div className="h-20 bg-muted/50 rounded"></div>
                                    </div>
                                  )}
                                  
                                  {currentScreen === 3 && (
                                    <div className="space-y-4">
                                      <div className="h-32 bg-muted/50 rounded border-2 border-dashed flex items-center justify-center">
                                        <Layers className="h-12 w-12 text-muted-foreground" />
                                      </div>
                                      <div className="grid grid-cols-3 gap-2">
                                        <div className="h-8 bg-muted/50 rounded"></div>
                                        <div className="h-8 bg-muted/50 rounded"></div>
                                        <div className="h-8 bg-muted/50 rounded"></div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {currentScreen === 4 && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-6 gap-2">
                                        {[...Array(12)].map((_, i) => (
                                          <div key={i} className="h-8 bg-muted/50 rounded"></div>
                                        ))}
                                      </div>
                                      <div className="h-16 bg-muted/50 rounded"></div>
                                    </div>
                                  )}
                                  
                                  {currentScreen === 5 && (
                                    <div className="space-y-4">
                                      <div className="h-24 bg-muted/50 rounded border-2 border-dashed flex items-center justify-center">
                                        <Database className="h-8 w-8 text-muted-foreground" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                        </div>
                                        <div className="space-y-2">
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                          <div className="h-4 bg-muted/50 rounded"></div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {currentScreen === 6 && (
                                    <div className="space-y-4">
                                      <div className="h-20 bg-muted/50 rounded"></div>
                                      <div className="grid grid-cols-3 gap-3">
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                        <div className="h-12 bg-muted/50 rounded"></div>
                                        <div className="h-12 bg-primary/20 rounded"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Navigation Footer */}
                              <div className="flex items-center justify-between p-3 bg-background rounded border">
                                <Button variant="outline" size="sm" disabled={currentScreen === 0} onClick={prevScreen}>
                                  <ChevronLeft className="h-4 w-4 mr-1" />
                                  Back
                                </Button>
                                <div className="flex gap-1">
                                  {wireframeScreens.map((_, index) => (
                                    <div
                                      key={index}
                                      className={`w-2 h-2 rounded-full ${
                                        index === currentScreen ? 'bg-primary' : 'bg-muted'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <Button size="sm" disabled={currentScreen === wireframeScreens.length - 1} onClick={nextScreen}>
                                  {currentScreen === wireframeScreens.length - 1 ? 'Export' : 'Continue'}
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>

            {/* Screen Details */}
            <div className="space-y-6">
              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentWireframe.keyFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Navigation Elements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentWireframe.navigationElements.map((element, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        <span>{element}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* User Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentWireframe.userActions.map((action, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span>{action}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Flow Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flow Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentWireframe.prevScreen && (
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Previous:</span>
                      <span className="font-medium">
                        {wireframeScreens.find(s => s.id === currentWireframe.prevScreen)?.title}
                      </span>
                    </div>
                  )}
                  {currentWireframe.nextScreen && (
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next:</span>
                      <span className="font-medium">
                        {wireframeScreens.find(s => s.id === currentWireframe.nextScreen)?.title}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={prevScreen}
              disabled={currentScreen === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Screen
            </Button>
            
            <div className="flex items-center gap-2">
              {wireframeScreens.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToScreen(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentScreen
                      ? 'bg-primary scale-125'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextScreen}
              disabled={currentScreen === wireframeScreens.length - 1}
            >
              Next Screen
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}