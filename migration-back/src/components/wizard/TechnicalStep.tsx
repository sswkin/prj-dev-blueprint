import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Code2, Monitor, Server, Database, Cloud, Settings } from 'lucide-react';
import { ProjectRequirements } from '@/types/wizard';

interface TechnicalStepProps {
  requirements: ProjectRequirements;
  technicalOptions: Record<string, Array<{ name: string; description: string; category: string }>>;
  onTechOptionToggle: (category: keyof ProjectRequirements['techStack'], optionName: string) => void;
}

export const TechnicalStep: React.FC<TechnicalStepProps> = ({
  requirements,
  technicalOptions,
  onTechOptionToggle
}) => {
  const renderTechSection = (
    title: string, 
    category: keyof ProjectRequirements['techStack'], 
    options: typeof technicalOptions.programmingLanguages,
    icon: React.ComponentType<{ className?: string }>
  ) => {
    const IconComponent = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4 text-primary" />
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline" className="text-xs">
            {requirements.techStack[category].length} selected
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {options.map((option) => (
            <div
              key={option.name}
              className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                requirements.techStack[category].includes(option.name)
                  ? 'border-primary bg-primary/5'
                  : 'border-muted'
              }`}
              onClick={() => onTechOptionToggle(category, option.name)}
            >
              <Checkbox
                checked={requirements.techStack[category].includes(option.name)}
                onChange={() => {}} // Handled by parent onClick
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {option.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          Technical Preferences
        </CardTitle>
        <CardDescription>
          Select your preferred technologies and tools. You can choose multiple options from each category.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {renderTechSection('Programming Languages', 'programmingLanguages', technicalOptions.programmingLanguages, Code2)}
        {renderTechSection('Frontend Frameworks', 'frontendFrameworks', technicalOptions.frontendFrameworks, Monitor)}
        {renderTechSection('Backend Technologies', 'backendTechnologies', technicalOptions.backendTechnologies, Server)}
        {renderTechSection('Database Systems', 'databaseSystems', technicalOptions.databaseSystems, Database)}
        {renderTechSection('Cloud Platforms', 'cloudPlatforms', technicalOptions.cloudPlatforms, Cloud)}
        {renderTechSection('Development Tools', 'developmentTools', technicalOptions.developmentTools, Settings)}

        {/* Summary */}
        {Object.values(requirements.techStack).some(arr => arr.length > 0) && (
          <div className="space-y-3 pt-6 border-t">
            <h4 className="font-medium">Technology Stack Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(requirements.techStack).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {items.map((item: { id: string; name: string; description: string }) => (
                        <Badge key={item.id} variant="outline" className="text-xs">
                          {item.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};