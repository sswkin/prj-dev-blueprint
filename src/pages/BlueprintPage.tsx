// React and core dependencies
import { useState, useCallback, useMemo } from 'react';
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
import { Progress } from '@/components/ui/progress';

// Screen Components
import { IdeaCapture } from '@/components/screens/IdeaCapture';
import { AnalysisDashboard, AnalysisDashboardProps } from '@/components/screens/AnalysisDashboard';
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
  Tag,
  ScreenProps
} from '@/components/types';

// Import mock data
import { mockAnalysisResponse } from '@/mocks/aiResponses';

// Constants
const SCREEN_TITLES = {
  IDEA_CAPTURE: 'Idea Capture',
  VALIDATION: 'Validation',
  RESEARCH: 'Research',
  ARCHITECTURE: 'Architecture',
  COMPONENTS: 'Components',
  DATABASE: 'Database',
  EXPORT: 'Export'
} as const;

type ScreenName = keyof typeof SCREEN_TITLES;

interface BaseScreen {
  name: ScreenName;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface IdeaCaptureScreen extends BaseScreen {
  name: 'IDEA_CAPTURE';
  component: typeof IdeaCapture;
  props: ScreenProps & { onAnalyze: (idea: string) => void };
}

interface AnalysisDashboardScreen extends BaseScreen {
  name: 'VALIDATION';
  component: typeof AnalysisDashboard;
  props: AnalysisDashboardProps;
}

interface GenericScreen extends BaseScreen {
  name: Exclude<ScreenName, 'IDEA_CAPTURE' | 'VALIDATION'>;
  component: React.ComponentType<ScreenProps>;
  props: ScreenProps;
}

type Screen = IdeaCaptureScreen | AnalysisDashboardScreen | GenericScreen;

export default function BlueprintPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('IDEA_CAPTURE');
  const [completedScreens, setCompletedScreens] = useState<Set<ScreenName>>(new Set());
  const [analysisData, setAnalysisData] = useState<{ tags: Tag[]; concepts: AIConcept[] } | null>(null);
  const [originalIdea, setOriginalIdea] = useState<string>('');
  const { execute, isLoading: isAnalyzing } = useAI();

  const handleScreenChange = useCallback((screen: ScreenName) => {
    setCurrentScreen(screen);
    setCompletedScreens(prev => new Set([...prev, screen]));
  }, []);

  const handleIdeaAnalyze = useCallback(async (idea: string) => {
    setOriginalIdea(idea);
    const result = await execute<{ tags: Tag[]; concepts: AIConcept[] }>('analyze');
    if (result.success && result.data) {
      setAnalysisData(result.data);
      handleScreenChange('VALIDATION');
    }
  }, [execute, handleScreenChange]);

  const handleConceptSelect = useCallback((concept: AIConcept) => {
    console.log('Selected concept:', concept);
    handleScreenChange('RESEARCH');
  }, [handleScreenChange]);

  const screens = useMemo<Screen[]>(() => [
    {
      name: 'IDEA_CAPTURE',
      title: SCREEN_TITLES.IDEA_CAPTURE,
      component: IdeaCapture,
      status: completedScreens.has('IDEA_CAPTURE') ? 'completed' : currentScreen === 'IDEA_CAPTURE' ? 'in-progress' : 'pending',
      props: {
        onAnalyze: handleIdeaAnalyze,
        tags: [],
        concepts: [],
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'VALIDATION',
      title: SCREEN_TITLES.VALIDATION,
      component: AnalysisDashboard,
      status: completedScreens.has('VALIDATION') ? 'completed' : currentScreen === 'VALIDATION' ? 'in-progress' : 'pending',
      props: {
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        onBack: () => handleScreenChange('IDEA_CAPTURE'),
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'RESEARCH',
      title: SCREEN_TITLES.RESEARCH,
      component: ResearchScreen,
      status: completedScreens.has('RESEARCH') ? 'completed' : currentScreen === 'RESEARCH' ? 'in-progress' : 'pending',
      props: {
        onNext: () => handleScreenChange('ARCHITECTURE'),
        onBack: () => handleScreenChange('VALIDATION'),
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'ARCHITECTURE',
      title: SCREEN_TITLES.ARCHITECTURE,
      component: ArchitectureScreen,
      status: completedScreens.has('ARCHITECTURE') ? 'completed' : currentScreen === 'ARCHITECTURE' ? 'in-progress' : 'pending',
      props: {
        onNext: () => handleScreenChange('COMPONENTS'),
        onBack: () => handleScreenChange('RESEARCH'),
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'COMPONENTS',
      title: SCREEN_TITLES.COMPONENTS,
      component: ComponentsScreen,
      status: completedScreens.has('COMPONENTS') ? 'completed' : currentScreen === 'COMPONENTS' ? 'in-progress' : 'pending',
      props: {
        onNext: () => handleScreenChange('DATABASE'),
        onBack: () => handleScreenChange('ARCHITECTURE'),
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'DATABASE',
      title: SCREEN_TITLES.DATABASE,
      component: DatabaseScreen,
      status: completedScreens.has('DATABASE') ? 'completed' : currentScreen === 'DATABASE' ? 'in-progress' : 'pending',
      props: {
        onNext: () => handleScreenChange('EXPORT'),
        onBack: () => handleScreenChange('COMPONENTS'),
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    },
    {
      name: 'EXPORT',
      title: SCREEN_TITLES.EXPORT,
      component: ExportScreen,
      status: completedScreens.has('EXPORT') ? 'completed' : currentScreen === 'EXPORT' ? 'in-progress' : 'pending',
      props: {
        onBack: () => handleScreenChange('DATABASE'),
        tags: analysisData?.tags || mockAnalysisResponse.tags,
        concepts: analysisData?.concepts || mockAnalysisResponse.concepts,
        onConceptSelect: handleConceptSelect,
        isAnalyzing,
        originalIdea
      }
    }
  ], [currentScreen, completedScreens, analysisData, handleIdeaAnalyze, handleConceptSelect, handleScreenChange, isAnalyzing, originalIdea]);

  const currentScreenConfig = useMemo(() => 
    screens.find(screen => screen.name === currentScreen),
    [screens, currentScreen]
  );

  const progressPercentage = useMemo(() => 
    Math.round((completedScreens.size / screens.length) * 100),
    [completedScreens.size, screens.length]
  );

  if (!currentScreenConfig) {
    return null;
  }

  const { component: CurrentScreen, props } = currentScreenConfig;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Project Blueprint - {currentScreenConfig.title}</title>
      </Helmet>

      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/wizard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Wizard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <Tablet className="h-4 w-4 text-muted-foreground" />
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Pause className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Progress</span>
                        <span className="text-sm font-medium">{progressPercentage}%</span>
                      </div>
                      <Progress value={progressPercentage} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Screens</h3>
                    <div className="space-y-2">
                      {screens.map((screen) => (
                        <div
                          key={screen.name}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                            screen.name === currentScreen
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleScreenChange(screen.name)}
                        >
                          {screen.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : screen.status === 'in-progress' ? (
                            <Clock className="h-4 w-4 text-blue-500" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                          )}
                          <span className="text-sm">{screen.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CurrentScreen {...props} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}