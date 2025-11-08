import React from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'gradient';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className,
  showText = true,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const iconClass = cn(
    sizeClasses[size],
    variant === 'gradient' ? 'text-primary' : 'text-primary'
  );

  const textClass = cn(
    'font-bold',
    textSizeClasses[size],
    variant === 'gradient' 
      ? 'bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'
      : 'text-foreground'
  );

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="relative">
        <Code2 className={iconClass} />
        {variant === 'gradient' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur opacity-75"></div>
        )}
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={textClass}>
            DevBlueprint
          </span>
          {size !== 'sm' && (
            <span className={cn(
              'text-xs font-medium text-muted-foreground -mt-1',
              size === 'xl' ? 'text-sm' : 'text-xs'
            )}>
              AI
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
export { Logo };
export type { LogoProps };