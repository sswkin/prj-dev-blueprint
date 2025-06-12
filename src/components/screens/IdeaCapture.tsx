import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { InputHero } from '@/components/ui-kit/InputHero';
import { AIIndicator } from '@/components/ui-kit/AIIndicator';

interface IdeaCaptureProps {
  onAnalyze: (idea: string) => void;
}

export const IdeaCapture: React.FC<IdeaCaptureProps> = ({ onAnalyze }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async (idea: string) => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          onAnalyze(idea);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <>
      <Helmet>
        <title>Idea Capture - DevBlueprint AI</title>
        <meta name="description" content="Transform your app idea into a comprehensive development blueprint with AI-powered analysis." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <InputHero
              placeholder="Describe your app idea in detail..."
              onAnalyze={handleAnalyze}
              isLoading={isAnalyzing}
            />

            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
              >
                <AIIndicator
                  status="generating"
                  progress={progress}
                  message="Analyzing your idea with AI..."
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};