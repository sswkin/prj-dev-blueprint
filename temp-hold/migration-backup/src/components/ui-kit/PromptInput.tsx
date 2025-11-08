import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptInputProps {
  suggestions?: string[];
  onCommand: (command: string) => void;
  placeholder?: string;
  className?: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  suggestions = [],
  onCommand,
  placeholder = "Ask AI to help with your project...",
  className
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.startsWith('/')) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onCommand(value.trim());
      setValue('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Command className="absolute left-4 h-5 w-5 text-indigo-500" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500"
            onFocus={() => value.startsWith('/') && setShowSuggestions(true)}
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="absolute right-2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
          >
            {value.trim() ? (
              <Send className="h-5 w-5 text-white" />
            ) : (
              <Sparkles className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-slate-700 first:rounded-t-xl last:rounded-b-xl transition-colors duration-150"
              >
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                  {suggestion}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};