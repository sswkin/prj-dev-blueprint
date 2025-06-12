import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { ProjectRequirements } from '@/types/wizard';

interface RequirementsStepProps {
  requirements: ProjectRequirements;
  onRequirementsChange: (requirements: ProjectRequirements) => void;
  onRefineDescription: (content: string) => Promise<void>;
  isRefining: boolean;
  refinedContent: string;
}

export const RequirementsStep: React.FC<RequirementsStepProps> = ({
  requirements,
  onRequirementsChange,
  onRefineDescription,
  isRefining,
  refinedContent
}) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Project Requirements
        </CardTitle>
        <CardDescription>
          Describe your software project in detail. Be as specific as possible about your goals, target audience, and key features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Project Description *
          </label>
          <Textarea
            id="description"
            placeholder="Describe your project, its purpose, and what you want to achieve..."
            value={requirements.description}
            onChange={(e) => onRequirementsChange({ ...requirements, description: e.target.value })}
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground">
            Minimum 50 characters required. The more detailed your description, the better we can assist you.
          </p>
        </div>

        {requirements.description.length > 50 && (
          <div className="flex justify-end">
            <Button
              onClick={() => onRefineDescription(requirements.description)}
              disabled={isRefining}
              variant="outline"
            >
              {isRefining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refining with AI...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Refine with AI
                </>
              )}
            </Button>
          </div>
        )}

        {refinedContent && (
          <div className="space-y-2">
            <label className="text-sm font-medium">AI-Refined Description</label>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{refinedContent}</p>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRequirementsChange({ ...requirements, description: refinedContent })}
              >
                Use Refined Version
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};