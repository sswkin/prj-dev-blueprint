import React from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIIndicatorProps {
  status: "idle" | "generating" | "success" | "error";
  progress?: number;
  message?: string;
  className?: string;
}

export const AIIndicator: React.FC<AIIndicatorProps> = ({
  status,
  progress = 0,
  message,
  className,
}) => {
  const getIcon = () => {
    switch (status) {
      case "generating":
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-indigo-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "generating":
        return "text-indigo-600 dark:text-indigo-400";
      case "success":
        return "text-emerald-600 dark:text-emerald-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  const getStatusMessage = () => {
    if (message) return message;

    switch (status) {
      case "generating":
        return "AI is thinking...";
      case "success":
        return "Generated successfully";
      case "error":
        return "Something went wrong";
      default:
        return "Ready";
    }
  };

  return (
    <motion.div
      className={cn(
        "flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600",
        className,
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0">{getIcon()}</div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium", getStatusColor())}>
          {getStatusMessage()}
        </p>

        {status === "generating" && progress > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <motion.div
                className="bg-indigo-500 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
