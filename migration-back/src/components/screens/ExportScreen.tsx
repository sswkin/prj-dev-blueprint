// External dependencies
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';

// Types
import type { ScreenProps } from '@/components/types';

export const ExportScreen: FC<ScreenProps> = ({ onBack }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Project Ready!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Your project has been successfully generated. You can now download the source code or explore the project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <Button className="w-full gap-2" variant="outline">
            <Download className="h-5 w-5" />
            Download Source Code
          </Button>
          <Button className="w-full" onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto text-left">
          <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-white">Next Steps</h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
              <span>Extract the downloaded ZIP file to your desired location</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
              <span>Run <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono">bun install</code> to install dependencies</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
              <span>Run <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono">bun dev</code> to start the development server</span>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
