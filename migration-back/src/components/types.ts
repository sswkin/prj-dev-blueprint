import {
  AIConcept as AIConceptBase,
  Tag as TagBase,
} from "@/pages/WireframesPage";

export interface Tag extends Omit<TagBase, "category" | "aiGenerated"> {
  category?: TagBase["category"];
  aiGenerated?: boolean;
}

export interface AIConcept
  extends Omit<AIConceptBase, "marketSize" | "timeToMarket" | "complexity"> {
  marketSize?: string;
  timeToMarket?: string;
  complexity?: "low" | "medium" | "high";
}

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

export type ViewportType = "mobile" | "tablet" | "desktop";
