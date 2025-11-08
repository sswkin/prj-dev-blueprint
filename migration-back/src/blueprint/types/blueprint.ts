export interface Tag {
  id: string;
  text: string;
  weight: number;
  category?: 'technology' | 'market' | 'feature' | 'risk' | string;
  aiGenerated?: boolean;
}

export interface AIConcept {
  id: string;
  title: string;
  description: string;
  viability: number;
  marketSize?: string;
  timeToMarket?: string;
  complexity?: 'low' | 'medium' | 'high';
}

export interface AnalysisData {
  tags: Tag[];
  concepts: AIConcept[];
  risks?: Array<{
    id: string;
    title: string;
    severity: string;
    description: string;
    mitigation: string;
    primaryKey?: boolean;
  }>;
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