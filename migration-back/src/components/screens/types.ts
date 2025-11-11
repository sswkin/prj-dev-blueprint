import { AIConcept, Tag } from "@/mocks/aiResponses";

export interface ScreenProps {
  onAnalyze?: (idea: string) => void;
  onNext?: () => void;
  onBack?: () => void;
  onConceptSelect: (concept: AIConcept) => void;
  isAnalyzing?: boolean;
  tags: Tag[];
  concepts: AIConcept[];
  originalIdea?: string;
}

export interface Screen {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<ScreenProps>;
  complexity?: "low" | "medium" | "high";
}
