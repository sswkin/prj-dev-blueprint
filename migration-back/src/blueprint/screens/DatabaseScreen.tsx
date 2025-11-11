// React and core dependencies
import type { FC } from "react";

// Third-party libraries
import { ArrowLeft } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data
import { mockSchemaResponse } from "@/mocks/aiResponses";

// Types
import type { ScreenProps } from "@/blueprint/types/blueprint";

const DatabaseScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Database Schema</h1>
        <p className="text-xl text-muted-foreground">
          AI-generated database design and relationships
        </p>
      </div>
      <Card className="p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSchemaResponse.tables.slice(0, 6).map((table, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 text-center">{table.name}</h3>
              <div className="space-y-2">
                {table.columns.slice(0, 4).map((column, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span
                      className={
                        column.required ? "font-semibold text-primary" : ""
                      }
                    >
                      {column.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {column.type}
                    </span>
                  </div>
                ))}
                {table.columns.length > 4 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{table.columns.length - 4} more
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>Generate Blueprint</Button>
      </div>
    </div>
  </div>
);

export default DatabaseScreen;
