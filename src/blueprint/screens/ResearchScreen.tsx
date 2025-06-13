// React and core dependencies
import type { FC } from 'react';

// Third-party libraries
import { ArrowLeft } from 'lucide-react';

// UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Types
import type { ScreenProps } from '@/blueprint/types/blueprint';

const ResearchScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Market Research</h1>
        <p className="text-xl text-muted-foreground">AI-powered competitive analysis and market insights</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Competitive Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Instagram</span>
              <Badge variant="destructive">High Competition</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>TikTok</span>
              <Badge variant="destructive">High Competition</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>BeReal</span>
              <Badge variant="secondary">Medium Competition</Badge>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Market Opportunities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-medium text-green-800 dark:text-green-300">Niche Communities</p>
              <p className="text-sm text-green-600 dark:text-green-400">Focus on specific interests</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-300">Privacy-First</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Growing demand for privacy</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Architecture
        </Button>
      </div>
    </div>
  </div>
);

export default ResearchScreen; 