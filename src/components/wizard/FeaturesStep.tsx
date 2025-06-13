// React and core dependencies
import React from 'react';

// Third-party libraries
import { CheckCircle, Loader2, Sparkles, X } from 'lucide-react';

// UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Types
import type { ProjectRequirements, FeatureSuggestion } from '@/types/wizard';

interface FeaturesStepProps {
  featureSuggestions: FeatureSuggestion[];
  requirements: ProjectRequirements;
  onFeatureToggle: (featureName: string) => void;
  onGenerateFeatures: () => Promise<void>;
  onClearFeatures: () => void;
  isGeneratingFeatures: boolean;
  hasGeneratedFeatures: boolean;
}

export const FeaturesStep: React.FC<FeaturesStepProps> = ({
  featureSuggestions,
  requirements,
  onFeatureToggle,
  onGenerateFeatures,
  onClearFeatures,
  isGeneratingFeatures,
  hasGeneratedFeatures
}) => {
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

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Features & Scope
        </CardTitle>
        <CardDescription>
          Select the features you want to include in your project. AI-suggested features are marked with a sparkle icon.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {!hasGeneratedFeatures ? (
          <div className="text-center py-8">
            <Button
              onClick={onGenerateFeatures}
              disabled={isGeneratingFeatures}
              size="lg"
            >
              {isGeneratingFeatures ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Features...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Feature Suggestions
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
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
                      onClick={() => onFeatureToggle(feature.name)}
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
                      onClick={() => onFeatureToggle(feature.name)}
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
                      onClick={() => onFeatureToggle(feature.name)}
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
                  <span className="text-sm font-medium">Selected Features ({requirements.features.length})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFeatures}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};