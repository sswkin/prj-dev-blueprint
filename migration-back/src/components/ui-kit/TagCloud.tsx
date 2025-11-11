import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tag {
  id: string;
  text: string;
  weight: number;
  category?: "technology" | "market" | "feature" | "risk";
  aiGenerated?: boolean;
}

interface TagCloudProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
  onTagRemove?: (tagId: string) => void;
  className?: string;
  maxTags?: number;
}

export const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  onTagClick,
  onTagRemove,
  className,
  maxTags = 20,
}) => {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "technology":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700";
      case "market":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700";
      case "feature":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700";
      case "risk":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
    }
  };

  const getTagSize = (weight: number) => {
    if (weight >= 0.8) return "text-lg px-4 py-2";
    if (weight >= 0.6) return "text-base px-3 py-2";
    if (weight >= 0.4) return "text-sm px-3 py-1.5";
    return "text-xs px-2 py-1";
  };

  const displayTags = tags.slice(0, maxTags);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          AI-Generated Tags
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {tags.length} tags
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {displayTags.map((tag, index) => (
            <motion.button
              key={tag.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                "relative group border rounded-full font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                getTagSize(tag.weight),
                getCategoryColor(tag.category),
                tag.aiGenerated &&
                  "ring-1 ring-indigo-300 dark:ring-indigo-600",
              )}
              onClick={() => onTagClick?.(tag)}
              onMouseEnter={() => setHoveredTag(tag.id)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              <span className="flex items-center gap-1">
                {tag.aiGenerated && (
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                )}
                {tag.text}
              </span>

              {onTagRemove && hoveredTag === tag.id && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagRemove(tag.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </motion.button>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {tags.length > maxTags && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          +{tags.length - maxTags} more tags
        </p>
      )}
    </div>
  );
};
