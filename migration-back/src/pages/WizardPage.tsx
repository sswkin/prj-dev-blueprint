import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Lightbulb, 
  Target, 
  Code2, 
  Database, 
  Download
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAI } from '@/hooks/useAI';
import { WizardStepper } from '@/components/wizard/WizardStepper';
import { WizardControls } from '@/components/wizard/WizardControls';
import { RequirementsStep } from '@/components/wizard/RequirementsStep';
import { FeaturesStep } from '@/components/wizard/FeaturesStep';
import { TechnicalStep } from '@/components/wizard/TechnicalStep';
import { ArchitectureStep } from '@/components/wizard/ArchitectureStep';
import { ReviewStep } from '@/components/wizard/ReviewStep';
import { 
  WizardStep, 
  ProjectRequirements, 
  FeatureSuggestion, 
  TechStack
} from '@/types/wizard';
import { technicalOptions } from '@/data/wizard-options';

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    description: '',
    features: [],
    techStack: {
      programmingLanguages: [],
      frontendFrameworks: [],
      backendTechnologies: [],
      databaseSystems: [],
      cloudPlatforms: [],
      developmentTools: []
    },
    architecture: {
      applicationArchitecture: [],
      dataStoragePatterns: [],
      integrationPatterns: [],
      securityPatterns: [],
      scalabilityApproaches: [],
      monitoringSolutions: []
    },
    timeline: '',
    budget: '',
    targetAudience: ''
  });
  const [isRefining, setIsRefining] = useState(false);
  const [refinedContent, setRefinedContent] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [featureSuggestions, setFeatureSuggestions] = useState<FeatureSuggestion[]>([]);
  const [isGeneratingFeatures, setIsGeneratingFeatures] = useState(false);
  const [hasGeneratedFeatures, setHasGeneratedFeatures] = useState(false);
  
  const navigate = useNavigate();
  const { execute } = useAI();

  const steps: WizardStep[] = [
    {
      id: 'requirements',
      title: 'Project Requirements',
      description: 'Describe your software project in detail',
      icon: Lightbulb,
      completed: completedSteps.has(0)
    },
    {
      id: 'features',
      title: 'Features & Scope',
      description: 'Define key features and functionality',
      icon: Target,
      completed: completedSteps.has(1)
    },
    {
      id: 'technical',
      title: 'Technical Preferences',
      description: 'Choose your technology stack',
      icon: Code2,
      completed: completedSteps.has(2)
    },
    {
      id: 'architecture',
      title: 'Architecture & Data',
      description: 'Define system architecture and data models',
      icon: Database,
      completed: completedSteps.has(3)
    },
    {
      id: 'review',
      title: 'Review & Generate',
      description: 'Review and generate your blueprint',
      icon: Download,
      completed: completedSteps.has(4)
    }
  ];

  // Generate AI feature suggestions when entering step 1
  useEffect(() => {
    if (currentStep === 1 && !hasGeneratedFeatures && requirements.description.trim()) {
      generateFeatureSuggestions();
    }
  }, [currentStep, requirements.description, hasGeneratedFeatures]);

  const generateFeatureSuggestions = async () => {
    setIsGeneratingFeatures(true);
    try {
      // Simulate AI analysis of project description to suggest relevant features
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Mock AI-generated feature suggestions based on project description
      const aiSuggestions: FeatureSuggestion[] = [
        // Core features (AI suggests these as essential)
        { name: 'User Authentication', category: 'core', description: 'Secure login and registration system', selected: true, aiSuggested: true },
        { name: 'User Profiles', category: 'core', description: 'Personal user accounts and settings', selected: true, aiSuggested: true },
        { name: 'Data Storage', category: 'core', description: 'Persistent data management', selected: true, aiSuggested: true },
        { name: 'Search Functionality', category: 'core', description: 'Find and filter content', selected: true, aiSuggested: true },
        
        // Optional features (AI suggests based on common patterns)
        { name: 'Real-time Chat', category: 'optional', description: 'Live messaging between users', selected: false, aiSuggested: true },
        { name: 'Push Notifications', category: 'optional', description: 'Engage users with timely updates', selected: false, aiSuggested: true },
        { name: 'File Upload', category: 'optional', description: 'Allow users to upload documents/images', selected: false, aiSuggested: true },
        { name: 'Social Login', category: 'optional', description: 'Login with Google, Facebook, etc.', selected: false, aiSuggested: true },
        
        // Advanced features
        { name: 'Payment Processing', category: 'advanced', description: 'Handle transactions and billing', selected: false, aiSuggested: true },
        { name: 'Admin Dashboard', category: 'advanced', description: 'Administrative control panel', selected: false, aiSuggested: true },
        { name: 'API Integration', category: 'advanced', description: 'Connect with third-party services', selected: false, aiSuggested: true },
        { name: 'Data Analytics', category: 'advanced', description: 'Track usage and performance metrics', selected: false, aiSuggested: true },
        
        // Additional common features (not AI suggested)
        { name: 'Email System', category: 'optional', description: 'Send automated emails', selected: false, aiSuggested: false },
        { name: 'Mobile App', category: 'advanced', description: 'Native mobile application', selected: false, aiSuggested: false },
        { name: 'Multi-language Support', category: 'advanced', description: 'Internationalization features', selected: false, aiSuggested: false },
        { name: 'Dark Mode', category: 'optional', description: 'Alternative UI theme', selected: false, aiSuggested: false }
      ];

      setFeatureSuggestions(aiSuggestions);
      
      // Update requirements with pre-selected core features
      const selectedFeatures = aiSuggestions.filter(f => f.selected).map(f => f.name);
      setRequirements(prev => ({ ...prev, features: selectedFeatures }));
      
      setHasGeneratedFeatures(true);
      toast.success('AI has analyzed your project and suggested relevant features!');
    } catch (error) {
      toast.error('Failed to generate feature suggestions');
    } finally {
      setIsGeneratingFeatures(false);
    }
  };

  const handleRefineWithAI = async (content: string) => {
    if (!content.trim()) {
      toast.error('Please enter some project requirements first');
      return;
    }

    setIsRefining(true);
    try {
      const result = await execute<{ refinedContent: string }>('generate');
      
      if (result.success && result.data) {
        // Simulate AI refinement - in real app this would use actual AI response
        const refined = `${content}\n\n[AI Refined]\nBased on your description, here are some enhanced details:\n\n• Clear user authentication and authorization system\n• Responsive design for mobile and desktop\n• Real-time data synchronization\n• Scalable backend architecture\n• Comprehensive error handling and logging\n• Performance optimization and caching strategies`;
        
        setRefinedContent(refined);
        setRequirements((prev: ProjectRequirements) => ({ ...prev, description: refined }));
        toast.success('Requirements refined with AI assistance!');
      }
    } catch (error) {
      toast.error('Failed to refine requirements. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  const toggleFeature = (featureName: string) => {
    setFeatureSuggestions((prev: FeatureSuggestion[]) => 
      prev.map((f: FeatureSuggestion) => 
        f.name === featureName 
          ? { ...f, selected: !f.selected }
          : f
      )
    );
    
    setRequirements((prev: ProjectRequirements) => ({
      ...prev,
      features: prev.features.includes(featureName)
        ? prev.features.filter(f => f !== featureName)
        : [...prev.features, featureName]
    }));
  };

  const toggleTechOption = (category: keyof TechStack, optionName: string) => {
    setRequirements((prev: ProjectRequirements) => ({
      ...prev,
      techStack: {
        ...prev.techStack,
        [category]: prev.techStack[category].includes(optionName)
          ? prev.techStack[category].filter((item: string) => item !== optionName)
          : [...prev.techStack[category], optionName]
      }
    }));
  };

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate blueprint and navigate to blueprint page
      navigate('/blueprint');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return requirements.description.trim().length > 50;
      case 1:
        return requirements.features.length > 0;
      case 2:
        return Object.values(requirements.techStack as unknown as Record<string, string[]>).some((arr: string[]) => arr.length > 0);
      case 3:
        return Object.values(requirements.architecture as unknown as Record<string, string[]>).some((arr: string[]) => arr.length > 0) && 
               requirements.timeline && requirements.targetAudience;
      default:
        return true;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <RequirementsStep
            requirements={requirements}
            onRequirementsChange={setRequirements}
            onRefineDescription={handleRefineWithAI}
            isRefining={isRefining}
            refinedContent={refinedContent}
          />
        );

      case 1:
        return (
          <FeaturesStep
            featureSuggestions={featureSuggestions}
            requirements={requirements}
            onFeatureToggle={toggleFeature}
            onGenerateFeatures={generateFeatureSuggestions}
            onClearFeatures={() => {
              setFeatureSuggestions(prev => prev.map(f => ({ ...f, selected: false })));
              setRequirements(prev => ({ ...prev, features: [] }));
            }}
            isGeneratingFeatures={isGeneratingFeatures}
            hasGeneratedFeatures={hasGeneratedFeatures}
          />
        );

      case 2:
        return (
          <TechnicalStep
            requirements={requirements}
            technicalOptions={technicalOptions}
            onTechOptionToggle={toggleTechOption}
          />
        );

      case 3:
        return (
          <ArchitectureStep
            requirements={requirements}
            onRequirementsChange={setRequirements}
          />
        );

      case 4:
        return (
          <ReviewStep
            requirements={requirements}
            featureSuggestions={featureSuggestions}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Blueprint - BlueprintForDev AI</title>
        <meta name="description" content="Create a comprehensive development blueprint for your software project with our step-by-step wizard." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-sm hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Blueprint Wizard</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress Steps */}
          <WizardStepper 
            steps={steps} 
            currentStep={currentStep} 
            onStepClick={(index) => {
              if (completedSteps.has(index - 1) || index === 0) {
                setCurrentStep(index);
              }
            }} 
          />

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <WizardControls 
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={handleBack}
            onNext={handleNext}
            nextDisabled={!canProceed()}
            nextLabel={currentStep === steps.length - 1 ? 'Generate Blueprint' : 'Next'}
            nextIcon={currentStep === steps.length - 1 ? <Download className="ml-2 h-4 w-4" /> : undefined}
          />
        </div>
      </div>
    </>
  );
}