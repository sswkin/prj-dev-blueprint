import { AIConcept as AIConceptBase, Tag as TagBase } from '@/pages/WireframesPage';

export interface Tag extends TagBase {}
export interface AIConcept extends AIConceptBase {}

export interface ScreenProps {
  onAnalyze?: (idea: string) => void;
  onNext?: () => void;
  onBack?: () => void;
  onConceptSelect?: (concept: AIConcept) => void;
  isAnalyzing?: boolean;
  tags?: Tag[];
  concepts?: AIConcept[];
  originalIdea?: string;
}

export type ViewportType = 'mobile' | 'tablet' | 'desktop';
