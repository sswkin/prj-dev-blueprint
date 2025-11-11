import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  nextIcon?: React.ReactNode;
}

export const WizardControls: React.FC<WizardControlsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel,
  nextIcon
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={onBack}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button
        className={cn(buttonVariants({ variant: 'default' }))}
        onClick={onNext}
        disabled={nextDisabled || currentStep === totalSteps - 1}
      >
        {nextLabel || (currentStep === totalSteps - 2 ? 'Finish' : 'Next')}
        {nextIcon || <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};