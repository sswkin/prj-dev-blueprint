import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ProjectRequirements, FeatureSuggestion } from '@/types/wizard';

interface ReviewStepProps {
  requirements: ProjectRequirements;
  featureSuggestions: FeatureSuggestion[];
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  requirements,
  featureSuggestions
}) => {
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
                  <span 
                    key={feature} 
                    className="text-xs flex items-center gap-1 px-2 py-1 rounded-full border bg-muted"
                  >
                    {feature}
                    {suggestion?.aiSuggested && (
                      <Sparkles className="h-3 w-3" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Technology Stack</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(requirements.techStack).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {items.map((item: string) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full bg-muted">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Architecture Patterns</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(requirements.architecture).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {items.map((item: string) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full border bg-muted">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )
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
}; 