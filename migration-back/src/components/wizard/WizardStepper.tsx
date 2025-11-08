import React from 'react';
import { motion } from 'framer-motion';
import { WizardStep } from '@/types/wizard';

interface WizardStepperProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onStepClick(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${currentStep === index ? 'bg-primary text-primary-foreground' : step.completed ? 'bg-green-500 text-white' : 'bg-muted'}`}>
            <step.icon className="w-6 h-6" />
          </div>
          <span className={`text-sm font-medium ${currentStep === index ? 'text-primary' : 'text-muted-foreground'}`}>
            {step.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
};