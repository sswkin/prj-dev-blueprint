// External dependencies
import type { FC } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Types
import type { ScreenProps } from '@/components/types';

export const ArchitectureScreen: FC<ScreenProps> = ({ onNext, onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">System Architecture</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Design the high-level structure of your application
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Frontend</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• React 18 with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• React Router for navigation</li>
              <li>• React Query for data fetching</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Backend</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Node.js with Express</li>
              <li>• TypeScript for type safety</li>
              <li>• Prisma as ORM</li>
              <li>• JWT for authentication</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">Infrastructure</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Docker for containerization</li>
              <li>• PostgreSQL for database</li>
              <li>• Redis for caching</li>
              <li>• AWS/GCP for hosting</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next: Components
        </Button>
      </div>
    </div>
  </div>
);
