// React and core dependencies
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Third-party libraries
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  CheckCircle, 
  Clock
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Screen Components
import { IdeaCapture } from '@/components/screens/IdeaCapture';
import { AnalysisDashboard } from '@/components/screens/AnalysisDashboard';
import ResearchScreen from '@/blueprint/screens/ResearchScreen';
import ArchitectureScreen from '@/blueprint/screens/ArchitectureScreen';
import ComponentsScreen from '@/blueprint/screens/ComponentsScreen';
import DatabaseScreen from '@/blueprint/screens/DatabaseScreen';
import ExportScreen from '@/blueprint/screens/ExportScreen';

// Hooks
import { useAI } from '@/hooks/useAI';

// Types
import type { 
  AIConcept, 
  AnalysisData, 
  ScreenProps,
  Tag
} from '@/blueprint/types/blueprint';

// Import mock data
import { mockAnalysisResponse } from '@/mocks/aiResponses';

// Type definitions
interface Screen {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  status: 'pending' | 'current' | 'completed';
}

type ViewportType = 'desktop' | 'tablet' | 'mobile';

export default function BlueprintPage() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [completedScreens, setCompletedScreens] = useState<Set<number>>(new Set());
  
  const { execute } = useAI();

  const screens: Screen[] = [
    {
      id: 'idea-capture',
      name: 'Idea Capture',
      description: 'Input and initial AI analysis',
      component: IdeaCapture,
      status: currentScreen === 0 ? 'current' : completedScreens.has(0) ? 'completed' : 'pending'
    },
    {
      id: 'analysis-dashboard',
      name: 'Validation',
      description: 'AI-generated concepts and validation',
      component: AnalysisDashboard,
      status: currentScreen === 1 ? 'current' : completedScreens.has(1) ? 'completed' : 'pending'
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Market analysis and competitive research',
      component: ResearchScreen,
      status: currentScreen === 2 ? 'current' : completedScreens.has(2) ? 'completed' : 'pending'
    },
    {
      id: 'architecture',
      name: 'Architecture',
      description: 'System design and tech stack',
      component: ArchitectureScreen,
      status: currentScreen === 3 ? 'current' : completedScreens.has(3) ? 'completed' : 'pending'
    },
    {
      id: 'components',
      name: 'Components',
      description: 'UI components and code templates',
      component: ComponentsScreen,
      status: currentScreen === 4 ? 'current' : completedScreens.has(4) ? 'completed' : 'pending'
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Schema design and relationships',
      component: DatabaseScreen,
      status: currentScreen === 5 ? 'current' : completedScreens.has(5) ? 'completed' : 'pending'
    },
    {
      id: 'export',
      name: 'Export',
      description: 'Download and export options',
      component: ExportScreen,
      status: currentScreen === 6 ? 'current' : completedScreens.has(6) ? 'completed' : 'pending'
    }
  ];

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

  const handleIdeaAnalyze = async (idea: string): Promise<void> => {
    const result = await execute<AnalysisData>(idea, 'analyze');
    if (result.success && result.data) {
      setAnalysisData(result.data);
      handleNext();
    }
  };

  const handleConceptSelect = (concept: AIConcept): void => {
    console.log('Concept selected:', concept);
    handleNext();
  };

  const handleNext = (): void => {
    setCompletedScreens(prev => new Set([...prev, currentScreen]));
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = (): void => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const renderCurrentScreen = (): React.ReactNode => {
    const ScreenComponent = screens[currentScreen]?.component;
    
    if (!ScreenComponent) return null;

    const screenProps: ScreenProps = {
      onAnalyze: handleIdeaAnalyze,
      tags: analysisData?.tags || mockAnalysisResponse.tags as Tag[],
      onNext: handleNext,
      onBack: handleBack
    };

    switch (currentScreen) {
      case 0:
        return <IdeaCapture {...screenProps as any} />;
      case 1:
        screenProps.concepts = analysisData?.concepts || mockAnalysisResponse.concepts as AIConcept[];
        screenProps.onConceptSelect = handleConceptSelect;
        return <AnalysisDashboard {...screenProps as any} />;
      default:
        return <ScreenComponent {...screenProps} />;
    }
  };

  const getStatusIcon = (status: Screen['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const progressPercentage = ((completedScreens.size + (currentScreen > 0 ? 1 : 0)) / screens.length) * 100;

  return (
    <>
      <Helmet>
        <title>Create Blueprint - DevBlueprint AI</title>
        <meta name="description" content="Create a comprehensive development blueprint for your app idea with AI-powered analysis and planning." />
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
                
                <div className="hidden md:flex items-center space-x-4">
                  <Badge variant="outline">Blueprint Creator</Badge>
                  <div className="flex items-center space-x-2">
                    <Progress value={progressPercentage} className="w-32" />
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Viewport Controls */}
                <div className="hidden lg:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <Button
                    variant={viewport === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewport('desktop')}
                    className="h-8 w-8 p-0"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewport('tablet')}
                    className="h-8 w-8 p-0"
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewport === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewport('mobile')}
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
                    onClick={() => {
                      setCurrentScreen(0);
                      setCompletedScreens(new Set());
                    }}
                    disabled={currentScreen === 0 && completedScreens.size === 0}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
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
            {screens.map((screen, index) => (
              <motion.button
                key={screen.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  screen.status === 'current'
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : screen.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => {
                  if (completedScreens.has(index) || index <= currentScreen) {
                    setCurrentScreen(index);
                  }
                }}
                disabled={!completedScreens.has(index) && index > currentScreen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getStatusIcon(screen.status)}
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
                  key={currentScreen}
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
                  {screens[currentScreen]?.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {screens[currentScreen]?.description}
                </p>
                
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <Badge variant="outline">
                    Step {currentScreen + 1} of {screens.length}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {viewport} View
                  </Badge>
                  <Badge variant={screens[currentScreen]?.status === 'completed' ? 'default' : 'secondary'}>
                    {screens[currentScreen]?.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}