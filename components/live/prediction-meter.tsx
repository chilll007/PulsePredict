"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ArrowUp, ArrowDown, Minus, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PredictionData {
  positive: number;
  neutral: number;
  escalation: number;
  cancellation: number;
}

export function PredictionMeter() {
  const [predictions, setPredictions] = useState<PredictionData>({
    positive: 83,
    neutral: 5,
    escalation: 12,
    cancellation: 0
  });

  const [previousPredictions, setPreviousPredictions] = useState<PredictionData>({
    positive: 83,
    neutral: 5,
    escalation: 12,
    cancellation: 0
  });

  // Simulate live prediction updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousPredictions(predictions);

      // Generate realistic prediction changes based on conversation flow
      const volatility = 3; // How much predictions can change
      const trend = Math.random() - 0.5; // -0.5 to 0.5

      const newPredictions = {
        positive: Math.max(0, Math.min(100, predictions.positive + (Math.random() - 0.4) * volatility)),
        neutral: Math.max(0, Math.min(100, predictions.neutral + (Math.random() - 0.5) * volatility)),
        escalation: Math.max(0, Math.min(100, predictions.escalation + (Math.random() - 0.6) * volatility)),
        cancellation: Math.max(0, Math.min(100, predictions.cancellation + (Math.random() - 0.8) * volatility))
      };

      // Normalize to ensure they add up to 100%
      const total = Object.values(newPredictions).reduce((sum, val) => sum + val, 0);
      if (total > 0) {
        Object.keys(newPredictions).forEach(key => {
          newPredictions[key as keyof PredictionData] = (newPredictions[key as keyof PredictionData] / total) * 100;
        });
      }

      setPredictions(newPredictions);
    }, 7000); // Update every 7 seconds

    return () => clearInterval(interval);
  }, [predictions]);

  const getTrendIcon = (current: number, previous: number) => {
    const diff = current - previous;
    if (Math.abs(diff) < 1) return Minus;
    return diff > 0 ? ArrowUp : ArrowDown;
  };

  const getTrendColor = (current: number, previous: number) => {
    const diff = current - previous;
    if (Math.abs(diff) < 1) return "text-muted-foreground";
    return diff > 0 ? "text-green-500" : "text-red-500";
  };

  const getPredictionColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'neutral': return 'text-blue-600 dark:text-blue-400';
      case 'escalation': return 'text-orange-600 dark:text-orange-400';
      case 'cancellation': return 'text-red-600 dark:text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getPredictionGradient = (type: string) => {
    switch (type) {
      case 'positive': return 'from-green-500 to-emerald-500';
      case 'neutral': return 'from-blue-500 to-indigo-500';
      case 'escalation': return 'from-orange-500 to-amber-500';
      case 'cancellation': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'positive': return CheckCircle;
      case 'neutral': return Minus;
      case 'escalation': return AlertCircle;
      case 'cancellation': return AlertCircle;
      default: return Target;
    }
  };

  const getConfidenceLevel = () => {
    const maxPrediction = Math.max(...Object.values(predictions));
    if (maxPrediction >= 80) return { level: "High", color: "text-green-600 dark:text-green-400" };
    if (maxPrediction >= 60) return { level: "Medium", color: "text-yellow-600 dark:text-yellow-400" };
    return { level: "Low", color: "text-red-600 dark:text-red-400" };
  };

  const confidence = getConfidenceLevel();

  const predictionTypes = [
    { key: 'positive', label: 'Positive Resolution', description: 'Customer satisfaction likely' },
    { key: 'neutral', label: 'Neutral Outcome', description: 'Neither positive nor negative' },
    { key: 'escalation', label: 'Escalation Risk', description: 'May require supervisor' },
    { key: 'cancellation', label: 'Cancellation Risk', description: 'Customer may leave' }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          Outcome Predictions
          <Badge variant="outline" className={confidence.color}>
            {confidence.level} Confidence
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Prediction */}
        <div className="text-center space-y-3">
          <motion.div
            key={predictions.positive}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-4xl font-bold ${getPredictionColor('positive')}`}>
                {Math.round(predictions.positive)}%
              </span>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const TrendIcon = getTrendIcon(predictions.positive, previousPredictions.positive);
                  return <TrendIcon className={`h-6 w-6 ${getTrendColor(predictions.positive, previousPredictions.positive)}`} />;
                })()}
              </motion.div>
            </div>
            <div className="text-lg font-medium text-green-600 dark:text-green-400">
              Positive Resolution
            </div>
          </motion.div>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${predictions.positive}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* All Predictions Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Detailed Breakdown</h4>

          {predictionTypes.map((type) => {
            const current = predictions[type.key as keyof PredictionData];
            const previous = previousPredictions[type.key as keyof PredictionData];
            const TrendIcon = getTrendIcon(current, previous);
            const PredictionIcon = getPredictionIcon(type.key);

            return (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${getPredictionGradient(type.key)} shadow-sm`}>
                    <PredictionIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getPredictionColor(type.key)}`}>
                    {Math.round(current)}%
                  </span>
                  <TrendIcon className={`h-4 w-4 ${getTrendColor(current, previous)}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Risk Assessment */}
        <div className="p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-sm text-orange-700 dark:text-orange-300">Risk Assessment</span>
          </div>

          <div className="text-sm text-orange-600 dark:text-orange-400">
            {predictions.escalation > 20 ? (
              "High escalation risk detected. Consider involving supervisor."
            ) : predictions.cancellation > 10 ? (
              "Customer retention at risk. Focus on value proposition."
            ) : predictions.positive > 70 ? (
              "Conversation trending positively. Continue current approach."
            ) : (
              "Neutral conversation. Look for opportunities to improve sentiment."
            )}
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Prediction Confidence</span>
            <Badge variant="outline" className={confidence.color}>
              {confidence.level}
            </Badge>
          </div>
          <Progress
            value={Math.max(...Object.values(predictions))}
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}