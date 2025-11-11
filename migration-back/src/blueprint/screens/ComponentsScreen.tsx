// React and core dependencies
import type { FC } from "react";

// Third-party libraries
import { ArrowLeft } from "lucide-react";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data
import { mockComponentsResponse } from "@/mocks/aiResponses";

// Types
import type { ScreenProps } from "@/blueprint/types/blueprint";

const ComponentsScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Component Library</h1>
        <p className="text-xl text-muted-foreground">
          AI-generated component specifications and code templates
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {mockComponentsResponse.screens.slice(0, 4).map((screen, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{screen.name}</h3>
              <Badge
                variant={
                  screen.complexity === "high"
                    ? "destructive"
                    : screen.complexity === "medium"
                      ? "secondary"
                      : "default"
                }
              >
                {screen.complexity || "low"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {screen.description}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Components:
              </p>
              <div className="flex flex-wrap gap-1">
                {screen.components.map((comp, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {comp.name}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>Continue to Database</Button>
      </div>
    </div>
  </div>
);

export default ComponentsScreen;
