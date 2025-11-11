// External dependencies
import type { FC } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Types
import type { ScreenProps } from "@/components/types";

export const ResearchScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">
        Research & Discovery
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
        Analyze your idea and gather insights before proceeding to architecture.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Market Analysis</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Research existing solutions and market gaps.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">User Research</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Understand your target audience and their needs.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next: Architecture</Button>
      </div>
    </div>
  </div>
);
