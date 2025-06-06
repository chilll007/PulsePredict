import { AlertCircle, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OutcomeType = "positive" | "negative" | "at-risk";

interface OutcomeBadgeProps {
  outcome: OutcomeType;
  size?: "sm" | "md" | "lg";
}

export function OutcomeBadge({ outcome, size = "md" }: OutcomeBadgeProps) {
  const variants = {
    positive: {
      color: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
      icon: <Check className="h-3.5 w-3.5" />,
      label: "Positive"
    },
    negative: {
      color: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
      icon: <AlertCircle className="h-3.5 w-3.5" />,
      label: "Negative"
    },
    "at-risk": {
      color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      label: "At Risk"
    }
  };

  const { color, icon, label } = variants[outcome];
  
  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-2.5",
    lg: "text-base py-1.5 px-3"
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1 font-medium border",
        color,
        sizeClasses[size]
      )}
    >
      {icon}
      {label}
    </Badge>
  );
}