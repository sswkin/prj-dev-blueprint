// React and core dependencies
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

// Third-party libraries
import { ArrowLeft, CheckCircle, Download, FileText } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Types
import type { ScreenProps } from '@/blueprint/types/blueprint';

const ExportScreen: FC<ScreenProps> = ({ onBack }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Blueprint Complete!</h1>
          <p className="text-xl text-muted-foreground">Your comprehensive development blueprint is ready</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Download PDF</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete blueprint documentation</p>
            <Button className="w-full">Download PDF</Button>
          </Card>
          <Card className="p-6">
            <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Export Code</h3>
            <p className="text-sm text-muted-foreground mb-4">Starter templates and boilerplate</p>
            <Button variant="outline" className="w-full">Export Code</Button>
          </Card>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => navigate('/')}>Create New Blueprint</Button>
        </div>
      </div>
    </div>
  );
};

export default ExportScreen; 