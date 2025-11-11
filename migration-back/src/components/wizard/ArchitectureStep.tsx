import { Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectRequirements, Architecture } from "@/types/wizard";
import { architectureOptions } from "@/data/wizard-options";

interface ArchitectureStepProps {
  requirements: ProjectRequirements;
  onRequirementsChange: (requirements: ProjectRequirements) => void;
}

export function ArchitectureStep({
  requirements,
  onRequirementsChange,
}: ArchitectureStepProps) {
  const toggleArchitectureOption = (
    category: keyof Architecture,
    optionName: string,
  ) => {
    onRequirementsChange({
      ...requirements,
      architecture: {
        ...requirements.architecture,
        [category]: requirements.architecture[category].includes(optionName)
          ? requirements.architecture[category].filter(
              (item: string) => item !== optionName,
            )
          : [...requirements.architecture[category], optionName],
      },
    });
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Architecture & Data
        </CardTitle>
        <CardDescription>
          Define your system architecture patterns and project planning details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Architecture sections */}
        {Object.entries(architectureOptions).map(([category, options]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h4>
              <span className="text-xs font-medium text-muted-foreground">
                {
                  requirements.architecture[
                    category as keyof typeof requirements.architecture
                  ].length
                }{" "}
                selected
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {options.map((option) => (
                <div
                  key={option.name}
                  className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                    requirements.architecture[
                      category as keyof typeof requirements.architecture
                    ].includes(option.name)
                      ? "border-primary bg-primary/5"
                      : "border-muted"
                  }`}
                  onClick={() =>
                    toggleArchitectureOption(
                      category as keyof Architecture,
                      option.name,
                    )
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{option.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {option.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Project Planning */}
        <div className="space-y-4 pt-6 border-t">
          <h4 className="font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Project Planning
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium">
                Project Timeline *
              </label>
              <select
                id="timeline"
                value={requirements.timeline}
                onChange={(e) =>
                  onRequirementsChange({
                    ...requirements,
                    timeline: e.target.value,
                  })
                }
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
              <label htmlFor="budget" className="text-sm font-medium">
                Budget Range
              </label>
              <select
                id="budget"
                value={requirements.budget}
                onChange={(e) =>
                  onRequirementsChange({
                    ...requirements,
                    budget: e.target.value,
                  })
                }
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
            <label htmlFor="audience" className="text-sm font-medium">
              Target Audience *
            </label>
            <textarea
              id="audience"
              placeholder="Describe your target users, their needs, and how they will use your application..."
              value={requirements.targetAudience}
              onChange={(e) =>
                onRequirementsChange({
                  ...requirements,
                  targetAudience: e.target.value,
                })
              }
              className="w-full min-h-[100px] p-2 border rounded-md"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
