"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ConfidenceMeter({
  value,
  size = "md",
  showLabel = true
}: ConfidenceMeterProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Determine color based on confidence value
  const getColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-500";
    if (confidence >= 60) return "text-blue-500";
    if (confidence >= 40) return "text-amber-500";
    return "text-red-500";
  };

  // Size classes
  const sizeClasses = {
    sm: {
      text: "text-xs",
      width: "w-16",
      height: "h-1.5",
    },
    md: {
      text: "text-sm",
      width: "w-24",
      height: "h-2",
    },
    lg: {
      text: "text-base",
      width: "w-32",
      height: "h-2.5",
    },
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", sizeClasses[size].text)}>
      {showLabel && (
        <span className={cn("font-medium", getColor(value))}>
          {value}% Confidence
        </span>
      )}
      <div
        className={cn(
          "bg-muted rounded-full overflow-hidden",
          sizeClasses[size].width,
          sizeClasses[size].height
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", getColor(value))}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}