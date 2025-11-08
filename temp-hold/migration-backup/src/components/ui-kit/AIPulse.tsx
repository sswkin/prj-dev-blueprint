import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AIPulseProps {
  children: React.ReactNode;
  intensity?: 'low' | 'high';
  className?: string;
}

export const AIPulse: React.FC<AIPulseProps> = ({ 
  children, 
  intensity = 'low', 
  className 
}) => {
  const pulseVariants = {
    low: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 1, 0.8],
    },
    high: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
    }
  };

  return (
    <motion.div
      className={cn(
        "relative",
        intensity === 'high' && "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-indigo-500/20 before:to-purple-500/20 before:blur-sm",
        className
      )}
      animate={pulseVariants[intensity]}
      transition={{
        duration: intensity === 'high' ? 2 : 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};