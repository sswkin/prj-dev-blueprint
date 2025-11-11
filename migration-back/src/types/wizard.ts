import { LucideIcon } from "lucide-react";

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  completed: boolean;
}

export interface ProjectRequirements {
  description: string;
  features: string[];
  techStack: TechStack;
  architecture: Architecture;
  timeline: string;
  budget: string;
  targetAudience: string;
}

export interface TechStack {
  programmingLanguages: string[];
  frontendFrameworks: string[];
  backendTechnologies: string[];
  databaseSystems: string[];
  cloudPlatforms: string[];
  developmentTools: string[];
}

export interface Architecture {
  applicationArchitecture: string[];
  dataStoragePatterns: string[];
  integrationPatterns: string[];
  securityPatterns: string[];
  scalabilityApproaches: string[];
  monitoringSolutions: string[];
}

export interface FeatureSuggestion {
  name: string;
  category: "core" | "optional" | "advanced";
  description: string;
  selected: boolean;
  aiSuggested: boolean;
}

export interface TechOption {
  name: string;
  description: string;
  category: keyof TechStack;
  selected: boolean;
}

export interface ArchitectureOption {
  name: string;
  description: string;
  category: keyof Architecture;
  selected: boolean;
}
