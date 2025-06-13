import { AIConcept, Tag } from '@/mocks/aiResponses';

export interface ScreenProps {
  onAnalyze?: (idea: string) => void;
  tags?: Tag[];
  concepts?: AIConcept[];
  onConceptSelect?: (concept: AIConcept) => void;
  onBack?: () => void;
  onNext?: () => void;
}

export interface Screen {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<ScreenProps>;
  complexity?: 'low' | 'medium' | 'high';
}
