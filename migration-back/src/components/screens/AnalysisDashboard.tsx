// External dependencies
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, AlertTriangle } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TagCloud } from "@/components/ui-kit/TagCloud";
import { ConceptCard } from "@/components/ui-kit/ConceptCard";

// Types
import type { ScreenProps, AIConcept, Tag } from "../types";

export interface AnalysisDashboardProps extends ScreenProps {
  tags: Tag[];
  concepts: AIConcept[];
  onConceptSelect: (concept: AIConcept) => void;
  onBack?: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  tags = [],
  concepts = [],
  onConceptSelect,
  onBack,
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const risks = [
    {
      id: "1",
      title: "Market Saturation",
      severity: "high",
      description: "High competition in the social media space",
      mitigation: "Focus on unique value proposition and niche targeting",
    },
    {
      id: "2",
      title: "Technical Complexity",
      severity: "medium",
      description: "Real-time features require advanced infrastructure",
      mitigation: "Start with MVP and scale gradually",
    },
    {
      id: "3",
      title: "User Acquisition",
      severity: "medium",
      description: "Challenging to build initial user base",
      mitigation: "Implement referral system and community building",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300";
    }
  };

  return (
    <>
      <Helmet>
        <title>Analysis Dashboard - BlueprintForDev AI</title>
        <meta
          name="description"
          content="AI-powered analysis of your app idea with concept validation and risk assessment."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Idea Capture
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">Step 2/7</Badge>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Validation
              </span>
            </div>
          </motion.div>

          {/* Progress Stepper */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {[
                "Capture",
                "Validation",
                "Research",
                "Architecture",
                "Components",
                "Schema",
                "Export",
              ].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= 1
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {step}
                  </span>
                  {index < 6 && (
                    <div
                      className={`w-12 h-0.5 mx-4 ${
                        index < 1
                          ? "bg-indigo-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tag Cloud */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-fit">
                <CardContent className="p-6">
                  <TagCloud
                    tags={tags}
                    onTagClick={(tag) => console.log("Tag clicked:", tag)}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Concept Cards */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  AI-Generated Concepts
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {concepts.map((concept, index) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <ConceptCard
                        {...concept}
                        onClick={() => onConceptSelect(concept)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Risk Panel */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Potential challenges and mitigation strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {risks.map((risk) => (
                    <motion.div
                      key={risk.id}
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() =>
                        setSelectedRisk(
                          selectedRisk === risk.id ? null : risk.id,
                        )
                      }
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-slate-900 dark:text-white">
                          {risk.title}
                        </h4>
                        <Badge className={getSeverityColor(risk.severity)}>
                          {risk.severity}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        {risk.description}
                      </p>

                      {selectedRisk === risk.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-slate-200 dark:border-slate-700"
                        >
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
