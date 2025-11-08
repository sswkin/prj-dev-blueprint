import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { PromptInput } from './PromptInput';
import { cn } from '@/lib/utils';

interface InputHeroProps {
  placeholder?: string;
  onAnalyze: (input: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const InputHero: React.FC<InputHeroProps> = ({
  placeholder = "Describe your app idea in detail...",
  onAnalyze,
  isLoading = false,
  className
}) => {
  const [input, setInput] = useState('');

  const suggestions = [
    '/generate "social media app for pet owners"',
    '/analyze "e-commerce platform with AI recommendations"',
    '/create "productivity tool for remote teams"',
    '/build "fitness tracking app with gamification"'
  ];

  const handleCommand = (command: string) => {
    setInput(command);
    onAnalyze(command);
  };

  const exampleIdeas = [
    "A social platform for local community events",
    "AI-powered personal finance advisor",
    "Collaborative project management tool",
    "Sustainable lifestyle tracking app"
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-8", className)}>
      {/* Hero Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(99, 102, 241, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.4)",
                "0 0 20px rgba(99, 102, 241, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Transform Your Idea
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Describe your app concept and watch AI generate a comprehensive development blueprint
        </p>
      </motion.div>

      {/* Main Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PromptInput
          suggestions={suggestions}
          onCommand={handleCommand}
          placeholder={placeholder}
          className="mb-6"
        />

        <div className="flex items-center justify-center">
          <motion.button
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => input && onAnalyze(input)}
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Idea</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Example Ideas */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          Or try one of these examples:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleIdeas.map((idea, index) => (
            <motion.button
              key={index}
              className="p-4 text-left bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 group"
              onClick={() => {
                setInput(idea);
                onAnalyze(idea);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {idea}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};