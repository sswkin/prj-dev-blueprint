import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building2, Users, FolderOpen, Target, ArrowRight, Edit, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { OnboardingData } from '@/types/onboarding';

interface CompletionStepProps {
  onboardingData: Partial<OnboardingData>;
  completedSteps: Set<number>;
  skippedSteps: Set<number>;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  onboardingData,
  completedSteps,
  skippedSteps
}) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real application, you would save the onboarding data here
    console.log('Onboarding completed with data:', onboardingData);
    navigate('/wizard');
  };

  const handleEditStep = (stepIndex: number) => {
    // Navigate back to specific step for editing
    window.location.hash = `step-${stepIndex}`;
  };

  const steps = [
    {
      id: 'organization',
      title: 'Organization Setup',
      icon: Building2,
      data: onboardingData.organization,
      completed: completedSteps.has(0),
      skipped: skippedSteps.has(0)
    },
    {
      id: 'team',
      title: 'Team Configuration',
      icon: Users,
      data: onboardingData.team,
      completed: completedSteps.has(1),
      skipped: skippedSteps.has(1)
    },
    {
      id: 'workspace',
      title: 'Workspace Creation',
      icon: FolderOpen,
      data: onboardingData.workspace,
      completed: completedSteps.has(2),
      skipped: skippedSteps.has(2)
    },
    {
      id: 'project',
      title: 'Project Initialization',
      icon: Target,
      data: onboardingData.project,
      completed: completedSteps.has(3),
      skipped: skippedSteps.has(3)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Success Header */}
      <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4">
            Setup Complete!
          </h1>
          
          <p className="text-lg text-green-700 dark:text-green-300 mb-6">
            Congratulations! Your organization is now ready for collaboration.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="text-green-700 border-green-300">
              {completedSteps.size} steps completed
            </Badge>
            {skippedSteps.size > 0 && (
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                {skippedSteps.size} steps skipped
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Setup Summary */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Setup Summary</CardTitle>
          <CardDescription>
            Review your configuration and make any final adjustments before getting started.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border rounded-lg ${
                step.completed 
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : step.skipped
                  ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                  : 'border-muted bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    step.completed 
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : step.skipped
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : 'bg-muted'
                  }`}>
                    <step.icon className={`h-5 w-5 ${
                      step.completed 
                        ? 'text-green-600 dark:text-green-400'
                        : step.skipped
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {step.title}
                      {step.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {step.skipped && <SkipForward className="h-4 w-4 text-yellow-600" />}
                    </h3>
                    
                    {step.completed && step.data && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {step.id === 'organization' && step.data.name && (
                          <span>{step.data.name} • {step.data.industry}</span>
                        )}
                        {step.id === 'team' && step.data.name && (
                          <span>{step.data.name} • {step.data.members?.length || 0} members</span>
                        )}
                        {step.id === 'workspace' && step.data.name && (
                          <span>{step.data.name} • {step.data.type}</span>
                        )}
                        {step.id === 'project' && step.data.name && (
                          <span>{step.data.name} • {step.data.objectives?.length || 0} objectives</span>
                        )}
                      </div>
                    )}
                    
                    {step.skipped && (
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Skipped - can be configured later
                      </p>
                    )}
                  </div>
                </div>
                
                {(step.completed || step.skipped) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditStep(index)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>
            Here are some recommended next steps to get the most out of your collaboration platform.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Invite More Team Members</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Add more colleagues to your team and assign them to projects.
              </p>
              <Button variant="outline" size="sm">
                Manage Team
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Configure Integrations</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Connect your favorite tools and services to streamline workflows.
              </p>
              <Button variant="outline" size="sm">
                Setup Integrations
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Create More Projects</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Start additional projects and organize your work effectively.
              </p>
              <Button variant="outline" size="sm">
                New Project
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Explore Features</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Take a guided tour to discover all the platform capabilities.
              </p>
              <Button variant="outline" size="sm">
                Take Tour
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <div className="text-center">
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your organization setup is complete! You can always modify these settings later from your dashboard.
          </AlertDescription>
        </Alert>
        
        <Button onClick={handleGetStarted} size="lg" className="px-8">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};