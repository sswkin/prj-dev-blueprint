import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - DevBlueprint AI</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to DevBlueprint AI to continue building amazing projects." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Code2 className="h-12 w-12 text-primary" />
            <span className="text-3xl font-bold">DevBlueprint AI</span>
          </div>
          
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="javascript:history.back()">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}