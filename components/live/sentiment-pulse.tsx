"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SentimentData {
  timestamp: number;
  value: number;
  label: string;
}

interface SentimentPulseProps {
  isAnalyzing: boolean;
}

export function SentimentPulse({ isAnalyzing }: SentimentPulseProps) {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [currentSentiment, setCurrentSentiment] = useState(75);
  const [previousSentiment, setPreviousSentiment] = useState(75);
  const [alertThreshold] = useState(30);
  const [showAlert, setShowAlert] = useState(false);

  // Simulate live sentiment updates
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      const now = Date.now();

      // Generate more realistic sentiment fluctuations
      const trend = Math.random() - 0.5; // -0.5 to 0.5
      const volatility = Math.random() * 10; // 0 to 10
      const newValue = Math.max(0, Math.min(100, currentSentiment + (trend * volatility)));

      const newDataPoint: SentimentData = {
        timestamp: now,
        value: newValue,
        label: getSentimentLabel(newValue)
      };

      setPreviousSentiment(currentSentiment);
      setCurrentSentiment(newValue);

      setSentimentData(prev => {
        const updated = [...prev, newDataPoint];
        // Keep only last 20 data points for performance
        return updated.slice(-20);
      });

      // Check for alert threshold
      if (newValue < alertThreshold && currentSentiment >= alertThreshold) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isAnalyzing, currentSentiment, alertThreshold]);

  const getSentimentLabel = (value: number): string => {
    if (value >= 70) return "Very Positive";
    if (value >= 50) return "Positive";
    if (value >= 30) return "Neutral";
    if (value >= 10) return "Negative";
    return "Very Negative";
  };

  const getSentimentColor = (value: number): string => {
    if (value >= 70) return "text-green-600 dark:text-green-400";
    if (value >= 50) return "text-blue-600 dark:text-blue-400";
    if (value >= 30) return "text-yellow-600 dark:text-yellow-400";
    if (value >= 10) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getSentimentGradient = (value: number): string => {
    if (value >= 70) return "from-green-500 to-emerald-500";
    if (value >= 50) return "from-blue-500 to-indigo-500";
    if (value >= 30) return "from-yellow-500 to-amber-500";
    if (value >= 10) return "from-orange-500 to-red-500";
    return "from-red-500 to-rose-600";
  };

  const getTrendIcon = () => {
    const diff = currentSentiment - previousSentiment;
    if (Math.abs(diff) < 2) return null; // No significant change
    return diff > 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = () => {
    const diff = currentSentiment - previousSentiment;
    if (Math.abs(diff) < 2) return "text-muted-foreground";
    return diff > 0 ? "text-green-500" : "text-red-500";
  };

  const TrendIcon = getTrendIcon();

  // Create SVG path for sentiment curve
  const createSentimentPath = () => {
    if (sentimentData.length < 2) return "";

    const width = 280;
    const height = 120;
    const padding = 20;

    const xScale = (width - 2 * padding) / (sentimentData.length - 1);
    const yScale = (height - 2 * padding) / 100;

    let path = `M ${padding} ${height - padding - (sentimentData[0].value * yScale)}`;

    for (let i = 1; i < sentimentData.length; i++) {
      const x = padding + i * xScale;
      const y = height - padding - (sentimentData[i].value * yScale);
      path += ` L ${x} ${y}`;
    }

    return path;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          Sentiment Pulse
          {showAlert && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
              <Badge variant="destructive" className="animate-pulse">
                Alert: Low Sentiment
              </Badge>
            </motion.div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Sentiment Display */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <motion.span
              key={currentSentiment}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-4xl font-bold ${getSentimentColor(currentSentiment)}`}
            >
              {Math.round(currentSentiment)}%
            </motion.span>
            {TrendIcon && (
              <TrendIcon className={`h-6 w-6 ${getTrendColor()}`} />
            )}
          </div>

          <div className={`text-lg font-medium ${getSentimentColor(currentSentiment)}`}>
            {getSentimentLabel(currentSentiment)}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <Progress
              value={currentSentiment}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Negative</span>
              <span>Very Positive</span>
            </div>
          </div>
        </div>

        {/* Live Chart */}
        {sentimentData.length > 1 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Live Trend (Last 5min)</h4>
            <div className="relative bg-muted/20 rounded-lg p-4 h-32">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 280 120"
                className="overflow-visible"
              >
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Threshold line */}
                <line
                  x1="20"
                  y1={120 - 20 - (alertThreshold * 0.8)}
                  x2="260"
                  y2={120 - 20 - (alertThreshold * 0.8)}
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />

                {/* Sentiment curve */}
                <path
                  d={createSentimentPath()}
                  fill="none"
                  stroke="url(#sentimentGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* Data points */}
                {sentimentData.map((point, index) => (
                  <circle
                    key={point.timestamp}
                    cx={20 + index * ((280 - 40) / (sentimentData.length - 1))}
                    cy={120 - 20 - (point.value * 0.8)}
                    r="3"
                    fill="currentColor"
                    className={getSentimentColor(point.value)}
                  />
                ))}
              </svg>
            </div>
          </div>
        )}

        {/* Threshold Settings */}
        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Alert Threshold</span>
          </div>
          <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700">
            Below {alertThreshold}%
          </Badge>
        </div>

        {!isAnalyzing && (
          <div className="text-center text-muted-foreground text-sm">
            Analysis paused - Resume to see live updates
          </div>
        )}
      </CardContent>
    </Card>
  );
}