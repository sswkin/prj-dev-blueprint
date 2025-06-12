import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Play, Pause, RotateCcw, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Import screen components
import { IdeaCapture } from '@/components/screens/IdeaCapture';
import { AnalysisDashboard } from '@/components/screens/AnalysisDashboard';
import { useAI } from '@/hooks/useAI';
import { mockAnalysisResponse } from '@/mocks/aiResponses';

export default function WireframesPage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  const { execute, isLoading } = useAI();

  const screens = [
    {
      id: 'idea-capture',
      name: 'Idea Capture',
      description: 'Input and initial AI analysis',
      component: IdeaCapture
    },
    {
      id: 'analysis-dashboard',
      name: 'Analysis Dashboard',
      description: 'AI-generated concepts and validation',
      component: AnalysisDashboard
    }
  ];

  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  const handleIdeaAnalyze = async (idea: string) => {
    const result = await execute(idea, 'analyze');
    if (result.success) {
      setAnalysisData(result.data);
      setCurrentScreen(1);
    }
  };

  const handleConceptSelect = (concept: any) => {
    console.log('Concept selected:', concept);
    // Navigate to next screen or show research hub
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const renderCurrentScreen = () => {
    const ScreenComponent = screens[currentScreen]?.component;
    
    if (!ScreenComponent) return null;

    switch (currentScreen) {
      case 0:
        return <ScreenComponent onAnalyze={handleIdeaAnalyze} />;
      case 1:
        return (
          <ScreenComponent
            tags={analysisData?.tags || mockAnalysisResponse.tags}
            concepts={analysisData?.concepts || mockAnalysisResponse.concepts}
            onConceptSelect={handleConceptSelect}
            onBack={handleBack}
          />
        );
      default:
        return <ScreenComponent />;
    }
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
          <div className="flex items-center justify-center space-x-4 mb-8">
            {screens.map((screen, index) => (
              <motion.button
                key={screen.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
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
                  <div className="text-xs opacity-75">{screen.description}</div>
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