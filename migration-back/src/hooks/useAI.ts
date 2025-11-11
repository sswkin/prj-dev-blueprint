import { useState, useCallback } from "react";

interface AIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  progress?: number;
}

interface UseAIOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

export interface AnalysisData {
  tags: Array<{
    id: string;
    text: string;
    weight: number;
    category?: "technology" | "market" | "feature" | "risk";
    aiGenerated?: boolean;
  }>;
  concepts: Array<{
    id: string;
    title: string;
    description: string;
    viability: number;
    marketSize?: string;
    timeToMarket?: string;
    complexity?: "low" | "medium" | "high";
  }>;
}

interface ArchitectureData {
  architecture: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
  };
  components: Array<{
    name: string;
    type: string;
    complexity: string;
  }>;
}

interface GenerationData {
  message: string;
}

export type AIExecuteType = "analyze" | "generate" | "validate";

export const useAI = (options: UseAIOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async <T = unknown>(
      type: AIExecuteType = "generate",
    ): Promise<AIResponse<T>> => {
      setIsLoading(true);
      setError(null);
      setProgress(0);

      try {
        // Simulate AI processing with progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = Math.min(prev + Math.random() * 20, 90);
            options.onProgress?.(newProgress);
            return newProgress;
          });
        }, 200);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        clearInterval(progressInterval);
        setProgress(100);

        // Mock AI responses based on type
        let mockData: unknown;

        switch (type) {
          case "analyze":
            mockData = {
              tags: [
                {
                  id: "1",
                  text: "Social Media",
                  weight: 0.9,
                  category: "market",
                  aiGenerated: true,
                },
                {
                  id: "2",
                  text: "React Native",
                  weight: 0.8,
                  category: "technology",
                  aiGenerated: true,
                },
                {
                  id: "3",
                  text: "Real-time Chat",
                  weight: 0.7,
                  category: "feature",
                  aiGenerated: true,
                },
                {
                  id: "4",
                  text: "User Authentication",
                  weight: 0.6,
                  category: "feature",
                  aiGenerated: true,
                },
                {
                  id: "5",
                  text: "Data Privacy",
                  weight: 0.5,
                  category: "risk",
                  aiGenerated: true,
                },
              ],
              concepts: [
                {
                  id: "1",
                  title: "Community-Focused Social Platform",
                  description:
                    "A social media app that connects people based on shared interests and local communities, featuring event planning and group discussions.",
                  viability: 85,
                  marketSize: "Large",
                  timeToMarket: "6-8 months",
                  complexity: "medium" as const,
                },
                {
                  id: "2",
                  title: "Professional Networking Hub",
                  description:
                    "LinkedIn-style platform with enhanced features for skill sharing, mentorship matching, and project collaboration.",
                  viability: 72,
                  marketSize: "Medium",
                  timeToMarket: "8-12 months",
                  complexity: "high" as const,
                },
                {
                  id: "3",
                  title: "Niche Interest Communities",
                  description:
                    "Specialized social platform for specific hobbies or interests with expert-led content and marketplace integration.",
                  viability: 68,
                  marketSize: "Small",
                  timeToMarket: "4-6 months",
                  complexity: "low" as const,
                },
              ],
            } satisfies AnalysisData;
            break;

          case "generate":
            mockData = {
              architecture: {
                frontend: ["React Native", "TypeScript", "Redux Toolkit"],
                backend: ["Node.js", "Express", "PostgreSQL"],
                infrastructure: ["AWS", "Docker", "Redis"],
              },
              components: [
                { name: "UserProfile", type: "screen", complexity: "medium" },
                {
                  name: "ChatInterface",
                  type: "component",
                  complexity: "high",
                },
                {
                  name: "FeedComponent",
                  type: "component",
                  complexity: "medium",
                },
              ],
            } satisfies ArchitectureData;
            break;

          default:
            mockData = {
              message: "AI processing complete",
            } satisfies GenerationData;
        }

        options.onSuccess?.(mockData);

        return {
          success: true,
          data: mockData as T,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "AI processing failed";
        setError(errorMessage);
        options.onError?.(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setError(null);
  }, []);

  return {
    execute,
    reset,
    isLoading,
    progress,
    error,
  };
};
