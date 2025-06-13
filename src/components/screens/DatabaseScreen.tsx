// External dependencies
import type { FC } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Types
import type { ScreenProps } from '@/components/types';

export const DatabaseScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Database Design</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Design your database schema and relationships
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Database Schema</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-mono text-sm">
                  <div className="text-emerald-600 dark:text-emerald-400">Table: users</div>
                  <div className="ml-4">id: <span className="text-blue-500">UUID</span> (PK)</div>
                  <div className="ml-4">email: <span className="text-blue-500">VARCHAR</span> (UNIQUE)</div>
                  <div className="ml-4">password: <span className="text-blue-500">VARCHAR</span></div>
                  <div className="ml-4">createdAt: <span className="text-blue-500">TIMESTAMP</span></div>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-mono text-sm">
                  <div className="text-emerald-600 dark:text-emerald-400">Table: posts</div>
                  <div className="ml-4">id: <span className="text-blue-500">UUID</span> (PK)</div>
                  <div className="ml-4">title: <span className="text-blue-500">VARCHAR</span></div>
                  <div className="ml-4">content: <span className="text-blue-500">TEXT</span></div>
                  <div className="ml-4">userId: <span className="text-blue-500">UUID</span> (FK)</div>
                  <div className="ml-4">createdAt: <span className="text-blue-500">TIMESTAMP</span></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Relationships</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-mono text-sm">
                  <div>users 1:N posts</div>
                  <div className="text-slate-500 text-xs mt-1">One user can have many posts</div>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <div className="font-mono text-sm">
                  <div>posts N:1 users</div>
                  <div className="text-slate-500 text-xs mt-1">Each post belongs to one user</div>
                </div>
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
          Export Project
        </Button>
      </div>
    </div>
  </div>
);
