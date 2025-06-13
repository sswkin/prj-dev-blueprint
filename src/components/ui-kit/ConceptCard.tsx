import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import { AIPulse } from './AIPulse';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  title: string;
  description: string;
  viability: number;
  marketSize?: string;
  timeToMarket?: string;
  complexity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  className?: string;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  description,
  viability,
  marketSize,
  timeToMarket,
  complexity = 'medium',
  onClick,
  className
}) => {
  const getComplexityColor = () => {
    switch (complexity) {
      case 'low':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    }
  };

  const getViabilityColor = () => {
    if (viability >= 80) return 'bg-emerald-500';
    if (viability >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <AIPulse intensity={viability > 80 ? 'high' : 'low'}>
      <motion.div
        className={cn(
          "group cursor-pointer border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 hover:shadow-lg",
          className
        )}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
            {title}
          </h3>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium capitalize",
            getComplexityColor()
          )}>
            {complexity}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Viability Score
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {viability}%
            </span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              className={cn("h-2 rounded-full", getViabilityColor())}
              initial={{ width: 0 }}
              animate={{ width: `${viability}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>

          {(marketSize || timeToMarket) && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
              {marketSize && (
                <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                  <Users className="h-3 w-3" />
                  <span>{marketSize}</span>
                </div>
              )}
              {timeToMarket && (
                <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{timeToMarket}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AIPulse>
  );
};