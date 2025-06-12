import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Lightbulb, 
  Target, 
  Code2, 
  Database, 
  Download,
  CheckCircle,
  Loader2,
  Sparkles,
  Wand2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAI } from '@/hooks/useAI';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
}

interface ProjectRequirements {
  description: string;
  features: string[];
  techStack: string[];
  timeline: string;
  budget: string;
  targetAudience: string;
}

interface FeatureSuggestion {
  name: string;
  category: 'core' | 'optional' | 'advanced';
  description: string;
  selected: boolean;
  aiSuggested: boolean;
}

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    description: '',
    features: [],
    techStack: [],
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
      const result = await execute(
        `Refine and improve this project description: ${content}. Make it more detailed, structured, and comprehensive for software development planning.`,
        'generate'
      );
      
      if (result.success) {
        // Simulate AI refinement - in real app this would use actual AI response
        const refined = `${content}\n\n[AI Refined]\nBased on your description, here are some enhanced details:\n\n• Clear user authentication and authorization system\n• Responsive design for mobile and desktop\n• Real-time data synchronization\n• Scalable backend architecture\n• Comprehensive error handling and logging\n• Performance optimization and caching strategies`;
        
        setRefinedContent(refined);
        setRequirements(prev => ({ ...prev, description: refined }));
        toast.success('Requirements refined with AI assistance!');
      }
    } catch (error) {
      toast.error('Failed to refine requirements. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  const toggleFeature = (featureName: string) => {
    setFeatureSuggestions(prev => 
      prev.map(f => 
        f.name === featureName 
          ? { ...f, selected: !f.selected }
          : f
      )
    );
    
    setRequirements(prev => ({
      ...prev,
      features: prev.features.includes(featureName)
        ? prev.features.filter(f => f !== featureName)
        : [...prev.features, featureName]
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
        return requirements.techStack.length > 0;
      case 3:
        return requirements.timeline && requirements.targetAudience;
      default:
        return true;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300';
      case 'optional':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Project Requirements
              </CardTitle>
              <CardDescription>
                Describe your software project in detail. What problem does it solve? Who are your users?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your software project in detail. Include the problem it solves, target users, main functionality, and any specific requirements..."
                  value={requirements.description}
                  onChange={(e) => setRequirements(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{requirements.description.length} characters</span>
                  <span>Minimum 50 characters required</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleRefineWithAI(requirements.description)}
                  disabled={isRefining || !requirements.description.trim()}
                  variant="outline"
                  className="flex-1"
                >
                  {isRefining ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Refine with AI
                    </>
                  )}
                </Button>
                
                {refinedContent && (
                  <Button
                    onClick={() => setRequirements(prev => ({ ...prev, description: '' }))}
                    variant="ghost"
                    size="sm"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {refinedContent && (
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    AI has enhanced your project description with additional technical details and best practices.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Features & Scope
              </CardTitle>
              <CardDescription>
                AI has analyzed your project and suggested relevant features. You can unselect any features you don't need.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isGeneratingFeatures ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <div>
                      <p className="font-medium">AI is analyzing your project...</p>
                      <p className="text-sm text-muted-foreground">Generating relevant feature suggestions</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {hasGeneratedFeatures && (
                    <Alert>
                      <Wand2 className="h-4 w-4" />
                      <AlertDescription>
                        AI has suggested {featureSuggestions.filter(f => f.aiSuggested).length} features based on your project description. 
                        Core features are pre-selected, but you can customize any selections.
                      </AlertDescription>
                    </Alert>
                  )}

                  {!hasGeneratedFeatures && requirements.description.trim() && (
                    <div className="text-center py-8">
                      <Button onClick={generateFeatureSuggestions} className="mb-4">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate AI Feature Suggestions
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Let AI analyze your project description and suggest relevant features
                      </p>
                    </div>
                  )}

                  {featureSuggestions.length > 0 && (
                    <div className="space-y-6">
                      {/* Core Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Core Features</h4>
                          <Badge className={getCategoryColor('core')}>Essential</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'core')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Optional Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Optional Features</h4>
                          <Badge className={getCategoryColor('optional')}>Recommended</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'optional')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Advanced Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Advanced Features</h4>
                          <Badge className={getCategoryColor('advanced')}>Complex</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {featureSuggestions
                            .filter(f => f.category === 'advanced')
                            .map((feature) => (
                              <div
                                key={feature.name}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  feature.selected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted hover:border-primary/50'
                                }`}
                                onClick={() => toggleFeature(feature.name)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{feature.name}</span>
                                      {feature.aiSuggested && (
                                        <Sparkles className="h-3 w-3 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                  {feature.selected && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Selected Features Summary */}
                      {requirements.features.length > 0 && (
                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <Label>Selected Features ({requirements.features.length})</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFeatureSuggestions(prev => prev.map(f => ({ ...f, selected: false })));
                                setRequirements(prev => ({ ...prev, features: [] }));
                              }}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Clear All
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {requirements.features.map((feature) => {
                              const suggestion = featureSuggestions.find(f => f.name === feature);
                              return (
                                <Badge 
                                  key={feature} 
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {feature}
                                  {suggestion?.aiSuggested && (
                                    <Sparkles className="h-3 w-3" />
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Technical Preferences
              </CardTitle>
              <CardDescription>
                Choose your preferred technology stack and development approach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Technology Stack (select your preferences)</Label>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['React', 'Vue.js', 'Angular', 'Next.js', 'React Native', 'Flutter', 'Svelte', 'Vanilla JS'].map((tech) => (
                        <Button
                          key={tech}
                          variant={requirements.techStack.includes(tech) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setRequirements(prev => ({
                              ...prev,
                              techStack: prev.techStack.includes(tech)
                                ? prev.techStack.filter(t => t !== tech)
                                : [...prev.techStack, tech]
                            }));
                          }}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust'].map((tech) => (
                        <Button
                          key={tech}
                          variant={requirements.techStack.includes(tech) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setRequirements(prev => ({
                              ...prev,
                              techStack: prev.techStack.includes(tech)
                                ? prev.techStack.filter(t => t !== tech)
                                : [...prev.techStack, tech]
                            }));
                          }}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Database</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'DynamoDB'].map((tech) => (
                        <Button
                          key={tech}
                          variant={requirements.techStack.includes(tech) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setRequirements(prev => ({
                              ...prev,
                              techStack: prev.techStack.includes(tech)
                                ? prev.techStack.filter(t => t !== tech)
                                : [...prev.techStack, tech]
                            }));
                          }}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {requirements.techStack.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Technologies ({requirements.techStack.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {requirements.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Architecture & Planning
              </CardTitle>
              <CardDescription>
                Define project timeline, budget, and target audience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline *</Label>
                  <select
                    id="timeline"
                    value={requirements.timeline}
                    onChange={(e) => setRequirements(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <select
                    id="budget"
                    value={requirements.budget}
                    onChange={(e) => setRequirements(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select budget</option>
                    <option value="Under $10k">Under $10k</option>
                    <option value="$10k - $50k">$10k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience *</Label>
                <Textarea
                  id="audience"
                  placeholder="Describe your target users, their needs, and how they will use your application..."
                  value={requirements.targetAudience}
                  onChange={(e) => setRequirements(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Review & Generate Blueprint
              </CardTitle>
              <CardDescription>
                Review your project details and generate your comprehensive blueprint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project Description</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {requirements.description.substring(0, 200)}...
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features ({requirements.features.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {requirements.features.map((feature) => {
                      const suggestion = featureSuggestions.find(f => f.name === feature);
                      return (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className="text-xs flex items-center gap-1"
                        >
                          {feature}
                          {suggestion?.aiSuggested && (
                            <Sparkles className="h-3 w-3" />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Technology Stack ({requirements.techStack.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {requirements.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Timeline</h4>
                    <p className="text-sm text-muted-foreground">{requirements.timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground">{requirements.budget || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  Your blueprint will include: Architecture diagrams, database schema, component specifications, 
                  development roadmap, and deployment guidelines.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Blueprint - DevBlueprint AI</title>
        <meta name="description" content="Create a comprehensive development blueprint for your software project with our step-by-step wizard." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline">Blueprint Wizard</Badge>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercentage} className="w-32" />
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      index === currentStep
                        ? 'bg-primary border-primary text-primary-foreground'
                        : step.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-background border-muted-foreground text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        index === currentStep ? 'text-primary' : step.completed ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      step.completed ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

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
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Generate Blueprint
                    <Download className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}