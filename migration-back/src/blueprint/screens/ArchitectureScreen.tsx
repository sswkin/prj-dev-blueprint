// React and core dependencies
import type { FC } from "react";

// Third-party libraries
import { ArrowLeft, Monitor, FileText, Smartphone } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Types
import type { ScreenProps } from "@/blueprint/types/blueprint";

const ArchitectureScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">System Architecture</h1>
        <p className="text-xl text-muted-foreground">
          AI-generated architecture diagram and tech stack recommendations
        </p>
      </div>
      <Card className="p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Frontend</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>React Native</p>
              <p>TypeScript</p>
              <p>Redux Toolkit</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Backend</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Node.js</p>
              <p>Express.js</p>
              <p>Socket.io</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Monitor className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Database</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>PostgreSQL</p>
              <p>Redis</p>
              <p>MongoDB</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>Continue to Components</Button>
      </div>
    </div>
  </div>
);

export default ArchitectureScreen;
