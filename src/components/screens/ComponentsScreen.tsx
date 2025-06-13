// External dependencies
import type { FC } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Types
import type { ScreenProps } from '@/components/types';

export const ComponentsScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">UI Components</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Design and organize your UI components
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Layout Components</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded">Header</div>
              <div className="flex space-x-4">
                <div className="w-1/4 p-3 bg-slate-100 dark:bg-slate-700 rounded">Sidebar</div>
                <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded">Main Content</div>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded">Footer</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">UI Elements</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button variant="default">Primary</Button>
                <Button variant="outline">Secondary</Button>
                <Button variant="ghost">Tertiary</Button>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-300">Card component</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  placeholder="Input field" 
                  className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next: Database Design
        </Button>
      </div>
    </div>
  </div>
);
