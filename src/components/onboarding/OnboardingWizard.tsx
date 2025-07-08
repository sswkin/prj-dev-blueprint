import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  Users, 
  FolderOpen, 
  Target,
  ArrowLeft,
  ArrowRight,
  Check,
  SkipForward,
  HelpCircle,
  X
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { OrganizationStep } from './steps/OrganizationStep';
import { TeamStep } from './steps/TeamStep';
import { WorkspaceStep } from './steps/WorkspaceStep';
import { ProjectStep } from './steps/ProjectStep';
import { CompletionStep } from './steps/CompletionStep';

import type { OnboardingStep, OnboardingData } from '@/types/onboarding';

const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [skippedSteps, setSkippedSteps] = useState<Set<number>>(new Set());
  const [showHelp, setShowHelp] = useState(false);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const steps: OnboardingStep[] = [
    {
      id: 'organization',
      title: 'Organization Setup',
      description: 'Set up your company profile and basic information',
      icon: Building2,
      completed: completedSteps.has(0),
      skippable: false
    },
    {
      id: 'team',
      title: 'Team Configuration',
      description: 'Create your first team and invite members',
      icon: Users,
      completed: completedSteps.has(1),
      skippable: true
    },
    {
      id: 'workspace',
      title: 'Workspace Creation',
      description: 'Set up your collaborative workspace',
      icon: FolderOpen,
      completed: completedSteps.has(2),
      skippable: true
    },
    {
      id: 'project',
      title: 'Project Initialization',
      description: 'Create your first project and define objectives',
      icon: Target,
      completed: completedSteps.has(3),
      skippable: true
    }
  ];

  const progressPercentage = ((completedSteps.size + skippedSteps.size) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (steps[currentStep].skippable && currentStep < steps.length) {
      setSkippedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <OrganizationStep
            data={onboardingData.organization}
            onUpdate={(data) => updateOnboardingData({ organization: data })}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <TeamStep
            data={onboardingData.team}
            organizationData={onboardingData.organization}
            onUpdate={(data) => updateOnboardingData({ team: data })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <WorkspaceStep
            data={onboardingData.workspace}
            teamData={onboardingData.team}
            onUpdate={(data) => updateOnboardingData({ workspace: data })}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <ProjectStep
            data={onboardingData.project}
            workspaceData={onboardingData.workspace}
            teamData={onboardingData.team}
            onUpdate={(data) => updateOnboardingData({ project: data })}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <CompletionStep
            onboardingData={onboardingData}
            completedSteps={completedSteps}
            skippedSteps={skippedSteps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Welcome to DevBlueprint AI - Setup Your Organization</title>
        <meta name="description" content="Complete your organization setup to start collaborating with your team." />
      </Helmet>

      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-semibold">Organization Setup</span>
                  </div>
                  {currentStep < steps.length && (
                    <Badge variant="outline">
                      Step {currentStep + 1} of {steps.length}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary transition-all duration-300" 
                        style={{ width: `${progressPercentage}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowHelp(!showHelp)}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help with this step</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* Help Panel */}
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 border-b"
              >
                <div className="max-w-6xl mx-auto px-4 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        {currentStep < steps.length ? steps[currentStep].title : 'Setup Complete'}
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        {currentStep < steps.length ? steps[currentStep].description : 'Your organization setup is complete!'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHelp(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Step Navigation */}
            {currentStep < steps.length && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.button
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          index === currentStep
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : index < currentStep || completedSteps.has(index)
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : skippedSteps.has(index)
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                        onClick={() => handleStepClick(index)}
                        disabled={index > currentStep && !completedSteps.has(index - 1)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <step.icon className="h-5 w-5" />
                          {(completedSteps.has(index) || skippedSteps.has(index)) && (
                            <div className="absolute -top-1 -right-1">
                              {completedSteps.has(index) ? (
                                <Check className="h-3 w-3 text-green-600" />
                              ) : (
                                <SkipForward className="h-3 w-3 text-yellow-600" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs opacity-75 hidden lg:block">
                            {step.description}
                          </div>
                        </div>
                      </motion.button>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          index < currentStep || completedSteps.has(index)
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {currentStep < steps.length && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <div className="flex items-center gap-3">
                  {steps[currentStep].skippable && (
                    <Button
                      variant="ghost"
                      onClick={handleSkip}
                    >
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip for now
                    </Button>
                  )}
                  
                  <Button onClick={handleNext}>
                    {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default OnboardingWizard;