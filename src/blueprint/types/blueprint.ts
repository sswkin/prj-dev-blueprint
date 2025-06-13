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
  complexity?: 'low' | 'medium' | 'high' | string;
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
  onAnalyze: (idea: string) => void;
  tags: Tag[];
  concepts?: AIConcept[];
  onConceptSelect?: (concept: AIConcept) => void;
  onBack?: () => void;
  onNext?: () => void;
} 