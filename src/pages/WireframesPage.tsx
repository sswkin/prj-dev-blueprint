import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Lightbulb, 
  BarChart3, 
  Search, 
  Layers, 
  Puzzle, 
  Database, 
  Download,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const wireframes = [
  {
    id: 1,
    title: "Idea Capture Screen",
    description: "Entry point where users describe their project idea",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    nextScreen: "Analysis Dashboard",
    components: [
      "Hero text: 'Turn ideas into deployable blueprints'",
      "Input field (centered, 60% width): 'Describe your idea in one sentence...'",
      "Floating 'Analyze' button (fixed to keyboard on mobile)",
      "Background: Subtle animated nodes (connection metaphor)"
    ],
    annotations: [
      "On enter/button click, auto-advance to Analysis Dashboard with loading spinner"
    ]
  },
  {
    id: 2,
    title: "Analysis Dashboard",
    description: "AI analyzes the idea and presents validation insights",
    icon: BarChart3,
    color: "from-blue-500 to-purple-500",
    nextScreen: "Research Hub",
    components: [
      "Tag cloud (top-left): Dynamic AI-generated tags",
      "Idea expansion cards (3-column grid, swipeable on mobile)",
      "Risk panel (right drawer): Collapsible warnings",
      "Progress stepper: 'Step 2/7 - Validation'"
    ],
    annotations: [
      "Click any card → Research Hub pre-populated with selected concept"
    ]
  },
  {
    id: 3,
    title: "Research Hub",
    description: "Deep dive into market research and competitive analysis",
    icon: Search,
    color: "from-green-500 to-teal-500",
    nextScreen: "System Architect",
    components: [
      "Search interface with AI suggestions",
      "Competitor analysis grid",
      "Market trends visualization",
      "Research notes panel"
    ],
    annotations: [
      "Manual entry from dashboard",
      "Research completion triggers next step"
    ]
  },
  {
    id: 4,
    title: "System Architect",
    description: "Define system architecture and technology stack",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    nextScreen: "Component Forge",
    components: [
      "Architecture diagram builder",
      "Technology stack selector",
      "Scalability recommendations",
      "Integration points mapper"
    ],
    annotations: [
      "Linked from research completion",
      "Parallel access with Component Forge"
    ]
  },
  {
    id: 5,
    title: "Component Forge",
    description: "Design and specify individual components",
    icon: Puzzle,
    color: "from-red-500 to-orange-500",
    nextScreen: "Schema Lab",
    components: [
      "Component library browser",
      "Custom component designer",
      "Props and state manager",
      "Component relationship mapper"
    ],
    annotations: [
      "Accessed via system design",
      "Parallel access with Schema Lab"
    ]
  },
  {
    id: 6,
    title: "Schema Lab",
    description: "Database design and API specification",
    icon: Database,
    color: "from-indigo-500 to-blue-500",
    nextScreen: "Blueprint Exporter",
    components: [
      "Database schema designer",
      "API endpoint builder",
      "Data relationship visualizer",
      "Migration script generator"
    ],
    annotations: [
      "Parallel access with Component Forge",
      "Auto-sync with component requirements"
    ]
  },
  {
    id: 7,
    title: "Blueprint Exporter",
    description: "Final consolidation and export of the complete blueprint",
    icon: Download,
    color: "from-emerald-500 to-green-500",
    nextScreen: null,
    components: [
      "Blueprint preview with all sections",
      "Export format selector (PDF, JSON, Markdown)",
      "Sharing options and collaboration tools",
      "Implementation roadmap generator"
    ],
    annotations: [
      "Final consolidation screen",
      "Multiple export formats available"
    ]
  }
];

export default function WireframesPage() {
  const [currentWireframe, setCurrentWireframe] = useState(0);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const nextWireframe = () => {
    setCurrentWireframe((prev) => (prev + 1) % wireframes.length);
  };

  const prevWireframe = () => {
    setCurrentWireframe((prev) => (prev - 1 + wireframes.length) % wireframes.length);
  };

  const currentWire = wireframes[currentWireframe];

  return (
    <>
      <Helmet>
        <title>User Flow Wireframes - DevBlueprint AI</title>
        <meta name="description" content="Complete user flow wireframes showing the journey from idea input to blueprint export." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="border-b bg-background/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">User Flow Wireframes</h1>
                  <p className="text-muted-foreground">Complete journey from idea to blueprint</p>
                </div>
              </div>

              {/* View Mode Selector */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wireframe Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Screen Flow
                  </CardTitle>
                  <CardDescription>
                    Navigate through the complete user journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {wireframes.map((wireframe, index) => (
                    <motion.button
                      key={wireframe.id}
                      onClick={() => setCurrentWireframe(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        index === currentWireframe
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          index === currentWireframe
                            ? 'bg-primary-foreground/20'
                            : 'bg-muted'
                        }`}>
                          <wireframe.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{wireframe.title}</div>
                          <div className={`text-xs ${
                            index === currentWireframe
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}>
                            Step {wireframe.id}/7
                          </div>
                        </div>
                        {index === currentWireframe && (
                          <Play className="h-4 w-4" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Wireframe Display */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWireframe}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Wireframe Header */}
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${currentWire.color}`}>
                            <currentWire.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{currentWire.title}</CardTitle>
                            <CardDescription className="text-base">
                              {currentWire.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          Step {currentWire.id}/7
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Wireframe Mockup */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Wireframe Mockup
                        <Badge variant="outline" className="ml-auto">
                          {viewMode}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`mx-auto bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center ${
                        viewMode === 'mobile' ? 'w-80 h-96' :
                        viewMode === 'tablet' ? 'w-96 h-72' :
                        'w-full h-80'
                      }`}>
                        <div className="text-center p-8">
                          <currentWire.icon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-xl font-semibold mb-2">{currentWire.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            Interactive wireframe mockup would be displayed here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Components Section */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Components</CardTitle>
                      <CardDescription>
                        Key interface elements and layout structure
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentWire.components.map((component, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{component}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Annotations Section */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Annotations</CardTitle>
                      <CardDescription>
                        Interaction behaviors and flow logic
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentWire.annotations.map((annotation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm font-medium">{annotation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={prevWireframe}
                      disabled={currentWireframe === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {wireframes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentWireframe(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentWireframe
                              ? 'bg-primary w-8'
                              : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={nextWireframe}
                      disabled={currentWireframe === wireframes.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Next Screen Indicator */}
                  {currentWire.nextScreen && (
                    <Card className="border-2 border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Next Screen:</span>
                            <span className="text-sm">{currentWire.nextScreen}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={nextWireframe}
                            disabled={currentWireframe === wireframes.length - 1}
                          >
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}