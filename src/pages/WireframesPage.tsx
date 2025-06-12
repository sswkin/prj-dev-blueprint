import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Play, Pause, RotateCcw, Monitor, Tablet, Smartphone, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

// Import screen components
import { IdeaCapture } from '@/components/screens/IdeaCapture';
import { AnalysisDashboard } from '@/components/screens/AnalysisDashboard';
import { useAI } from '@/hooks/useAI';
import { mockAnalysisResponse, mockComponentsResponse, mockSchemaResponse } from '@/mocks/aiResponses';

// Type definitions
interface Tag {
  id: string;
  text: string;
  weight: number;
  category?: 'technology' | 'market' | 'feature' | 'risk';
  aiGenerated?: boolean;
}

interface AIConcept {
  id: string;
  title: string;
  description: string;
  viability: number;
  marketSize?: string;
  timeToMarket?: string;
  complexity?: 'low' | 'medium' | 'high';
}

interface AnalysisData {
  tags: Tag[];
  concepts: AIConcept[];
  risks?: Array<{
    id: string;
    title: string;
    severity: string;
    description: string;
    mitigation: string;
  }>;
}

interface Screen {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<ScreenProps>;
}

interface ScreenProps {
  onAnalyze?: (idea: string) => void;
  tags?: Tag[];
  concepts?: AIConcept[];
  onConceptSelect?: (concept: AIConcept) => void;
  onBack?: () => void;
  onNext?: () => void;
}

type ViewportType = 'desktop' | 'tablet' | 'mobile';

// Mock screens for demonstration
const ResearchScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Market Research</h1>
        <p className="text-xl text-muted-foreground">AI-powered competitive analysis and market insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Competitive Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Instagram</span>
              <Badge variant="destructive">High Competition</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>TikTok</span>
              <Badge variant="destructive">High Competition</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>BeReal</span>
              <Badge variant="secondary">Medium Competition</Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Market Opportunities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-medium text-green-800 dark:text-green-300">Niche Communities</p>
              <p className="text-sm text-green-600 dark:text-green-400">Focus on specific interests</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-300">Privacy-First</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Growing demand for privacy</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Architecture
        </Button>
      </div>
    </div>
  </div>
);

const ArchitectureScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">System Architecture</h1>
        <p className="text-xl text-muted-foreground">AI-generated architecture diagram and tech stack recommendations</p>
      </div>
      
      <Card className="p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Frontend</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>React Native</p>
              <p>TypeScript</p>
              <p>Redux Toolkit</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Backend</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Node.js</p>
              <p>Express.js</p>
              <p>Socket.io</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Monitor className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Database</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>PostgreSQL</p>
              <p>Redis</p>
              <p>MongoDB</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Components
        </Button>
      </div>
    </div>
  </div>
);

const ComponentsScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Component Library</h1>
        <p className="text-xl text-muted-foreground">AI-generated component specifications and code templates</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {mockComponentsResponse.screens.slice(0, 4).map((screen, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{screen.name}</h3>
              <Badge variant={screen.complexity === 'high' ? 'destructive' : screen.complexity === 'medium' ? 'secondary' : 'default'}>
                {screen.complexity}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{screen.description}</p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Components:</p>
              <div className="flex flex-wrap gap-1">
                {screen.components.map((comp, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{comp}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Database
        </Button>
      </div>
    </div>
  </div>
);

const DatabaseScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Database Schema</h1>
        <p className="text-xl text-muted-foreground">AI-generated database design and relationships</p>
      </div>
      
      <Card className="p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSchemaResponse.tables.slice(0, 6).map((table, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">{table.name}</h3>
              <div className="space-y-2">
                {table.columns.slice(0, 4).map((column, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={column.primaryKey ? 'font-semibold text-primary' : ''}>{column.name}</span>
                    <span className="text-muted-foreground text-xs">{column.type}</span>
                  </div>
                ))}
                {table.columns.length > 4 && (
                  <p className="text-xs text-muted-foreground text-center">+{table.columns.length - 4} more</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Generate Blueprint
        </Button>
      </div>
    </div>
  </div>
);

const ExportScreen: React.FC<ScreenProps> = ({ onBack }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Blueprint Complete!</h1>
          <p className="text-xl text-muted-foreground">Your comprehensive development blueprint is ready</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Download PDF</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete blueprint documentation</p>
            <Button className="w-full">Download PDF</Button>
          </Card>
          
          <Card className="p-6">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Export Code</h3>
            <p className="text-sm text-muted-foreground mb-4">Starter templates and boilerplate</p>
            <Button variant="outline" className="w-full">Export Code</Button>
          </Card>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => navigate('/')}>
            Create New Blueprint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function WireframesPage() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  
  const { execute } = useAI();

  const screens: Screen[] = [
    {
      id: 'idea-capture',
      name: 'Idea Capture',
      description: 'Input and initial AI analysis',
      component: IdeaCapture
    },
    {
      id: 'analysis-dashboard',
      name: 'Validation',
      description: 'AI-generated concepts and validation',
      component: AnalysisDashboard
    },
    {
      id: 'research',
      name: 'Research',
      description: 'Market analysis and competitive research',
      component: ResearchScreen
    },
    {
      id: 'architecture',
      name: 'Architecture',
      description: 'System design and tech stack',
      component: ArchitectureScreen
    },
    {
      id: 'components',
      name: 'Components',
      description: 'UI components and code templates',
      component: ComponentsScreen
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Schema design and relationships',
      component: DatabaseScreen
    },
    {
      id: 'export',
      name: 'Export',
      description: 'Download and export options',
      component: ExportScreen
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
      setCurrentScreen(1);
    }
  };

  const handleConceptSelect = (concept: AIConcept): void => {
    console.log('Concept selected:', concept);
    setCurrentScreen(2); // Move to research screen
  };

  const handleNext = (): void => {
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
      onNext: handleNext,
      onBack: handleBack
    };

    switch (currentScreen) {
      case 0:
        screenProps.onAnalyze = handleIdeaAnalyze;
        break;
      case 1:
        screenProps.tags = analysisData?.tags || mockAnalysisResponse.tags;
        screenProps.concepts = analysisData?.concepts || mockAnalysisResponse.concepts;
        screenProps.onConceptSelect = handleConceptSelect;
        break;
      default:
        break;
    }

    return <ScreenComponent {...screenProps} />;
  };

  return (
    <>
      <Helmet>
        <title>Interactive Wireframes - DevBlueprint AI</title>
        <meta name="description" content="Experience the complete DevBlueprint AI workflow through interactive wireframes and prototypes." />
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
                    {screens[currentScreen]?.name}
                  </span>
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
                    onClick={() => setCurrentScreen(0)}
                    disabled={currentScreen === 0}
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
                  index === currentScreen
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => setCurrentScreen(index)}
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
                    Screen {currentScreen + 1} of {screens.length}
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
}