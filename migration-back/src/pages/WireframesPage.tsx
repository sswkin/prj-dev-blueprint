// React & Hooks
import { useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Animation
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { 
  ArrowLeft, 
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  Pause,
  Play
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Import screen components and their prop types
import { IdeaCapture, IdeaCaptureProps } from '@/components/screens/IdeaCapture';
import { AnalysisDashboard, AnalysisDashboardProps } from '@/components/screens/AnalysisDashboard';
import ResearchScreen from '@/blueprint/screens/ResearchScreen';
import ArchitectureScreen from '@/blueprint/screens/ArchitectureScreen';
import ComponentsScreen from '@/blueprint/screens/ComponentsScreen';
import DatabaseScreen from '@/blueprint/screens/DatabaseScreen';
import ExportScreen from '@/blueprint/screens/ExportScreen';

// Re-export types for other components to use
export type { IdeaCaptureProps, AnalysisDashboardProps };

// Types & Data
import { Helmet } from 'react-helmet';

// Types
type ViewportType = 'mobile' | 'tablet' | 'desktop';
export type TagCategory = 'market' | 'technology' | 'feature' | 'risk';
export type Complexity = 'low' | 'medium' | 'high';

export interface Tag {
  id: string;
  text: string;
  weight: number;
  category: TagCategory;
  aiGenerated: boolean;
}

export interface AIConcept {
  id: string;
  title: string;
  description: string;
  viability: number;
  marketSize: string;
  timeToMarket: string;
  complexity: Complexity;
}

// Define flexible screen props that can accommodate all screen types
interface WireframeScreenProps {
  onAnalyze?: (idea: string) => void;
  tags?: Tag[];
  concepts?: AIConcept[];
  onConceptSelect?: (concept: AIConcept) => void;
  onBack?: () => void;
  onNext?: () => void;
  isAnalyzing?: boolean;
  [key: string]: unknown; // Allow additional props
}

// Define screen configuration
interface Screen {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<WireframeScreenProps>;
  requiredProps: Record<string, unknown>;
  complexity?: Complexity;
}

// Mock data
const mockTags: Tag[] = [
  { id: '1', text: 'AI-Powered', weight: 0.9, category: 'technology', aiGenerated: true },
  { id: '2', text: 'E-commerce', weight: 0.8, category: 'market', aiGenerated: true },
  { id: '3', text: 'Mobile-First', weight: 0.85, category: 'feature', aiGenerated: true },
];

const mockConcepts: AIConcept[] = [
  {
    id: '1',
    title: 'AI Shopping Assistant',
    description: 'An intelligent shopping assistant that learns user preferences',
    viability: 0.85,
    marketSize: 'Large',
    timeToMarket: '6-9 months',
    complexity: 'medium'
  },
  {
    id: '2',
    title: 'AR Virtual Try-On',
    description: 'Augmented reality feature for virtual product try-ons',
    viability: 0.7,
    marketSize: 'Medium',
    timeToMarket: '9-12 months',
    complexity: 'high'
  }
];

const WireframesPage: FC = () => {
  // Navigation handler for future use
  const _navigate = useNavigate();
  // Mark as used to avoid lint warnings
  void _navigate;
  
  // State management
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [isAnalyzing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [tags] = useState<Tag[]>(mockTags);
  const [concepts] = useState<AIConcept[]>(mockConcepts);

  // Screen definitions
  const screens: Screen[] = [
    {
      id: 'idea-capture',
      name: 'Idea Capture',
      description: 'Describe your app idea and get AI-powered analysis',
      component: IdeaCapture as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    },
    {
      id: 'analysis-dashboard',
      name: 'Analysis Dashboard',
      description: 'Review AI-generated analysis and concepts',
      component: AnalysisDashboard as React.ComponentType<WireframeScreenProps>,
      requiredProps: { tags: [], concepts: [], onConceptSelect: () => {}, onBack: () => {} }
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Explore market research and competitor analysis',
      component: ResearchScreen as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    },
    {
      id: 'architecture',
      name: 'Architecture',
      description: 'Define your app architecture and tech stack',
      component: ArchitectureScreen as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    },
    {
      id: 'components',
      name: 'Components',
      description: 'Design your UI components and screens',
      component: ComponentsScreen as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Design your database schema',
      component: DatabaseScreen as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    },
    {
      id: 'export',
      name: 'Export',
      description: 'Export your project files',
      component: ExportScreen as React.ComponentType<WireframeScreenProps>,
      requiredProps: {}
    }
  ];

  // Get the current screen with proper type assertion
  const currentScreen = screens[currentScreenIndex];
  
  const getViewportClass = (): string => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };
  
  const handleConceptSelect = (concept: AIConcept): void => {
    console.log('Concept selected:', concept);
    // Move to research screen when a concept is selected
    setCurrentScreenIndex(2);
  };

  const handleNext = (): void => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(prev => prev + 1);
    }
  };

  const handleBack = (): void => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(prev => prev - 1);
    }
  };
  
  const renderCurrentScreen = (): React.ReactNode => {
    if (!currentScreen) return null;
    
    const ScreenComponent = currentScreen.component;
    const isFirstScreen = currentScreenIndex === 0;
    const isLastScreen = currentScreenIndex === screens.length - 1;
    
    // Prepare base props
    const baseProps: WireframeScreenProps = {
      onNext: !isLastScreen ? handleNext : undefined,
      onBack: !isFirstScreen ? handleBack : undefined,
      onConceptSelect: handleConceptSelect,
      isAnalyzing,
      tags,
      concepts
    };

    // Merge with required props for the specific screen
    const screenProps = {
      ...currentScreen.requiredProps,
      ...baseProps
    };
    
    return (
      <div className="flex flex-col h-full">
        <ScreenComponent {...screenProps} />
      </div>
    );
  };
  
  const handleScreenSelect = (index: number) => {
    setCurrentScreenIndex(index);
  };
  
  const handleDeviceChange = (newViewport: ViewportType) => {
    setViewport(newViewport);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleRestart = () => {
    setCurrentScreenIndex(0);
    setIsPlaying(false);
  };

  return (
    <>
      <Helmet>
        <title>Interactive Wireframes - BlueprintForDev AI</title>
        <meta name="description" content="Experience the complete BlueprintForDev AI workflow through interactive wireframes and prototypes." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header Controls */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                
                <div className="hidden md:flex items-center space-x-2">
                  <Badge variant="outline">Interactive Demo</Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {screens[currentScreenIndex]?.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Viewport Controls */}
                <div className="hidden lg:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <Button
                    variant={viewport === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('desktop')}
                    className="h-8 w-8 p-0"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('tablet')}
                    className="h-8 w-8 p-0"
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('mobile')}
                    className="h-8 w-8 p-0"
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestart}
                    disabled={currentScreenIndex === 0}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-8 overflow-x-auto">
            {screens.map((screen: Screen, index: number) => (
              <motion.button
                key={screen.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  index === currentScreenIndex
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => handleScreenSelect(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">{index + 1}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">{screen.name}</div>
                  <div className="text-xs opacity-75 hidden md:block">{screen.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Screen Display */}
        <div className={`transition-all duration-300 ${getViewportClass()}`}>
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[600px]"
                >
                  {renderCurrentScreen()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Screen Info Panel */}
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentScreen?.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {currentScreen?.description}
                </p>
                
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <Badge variant="outline">
                    Screen {currentScreenIndex + 1} of {screens.length}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {viewport} View
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Export the component for use in other files
export default WireframesPage;