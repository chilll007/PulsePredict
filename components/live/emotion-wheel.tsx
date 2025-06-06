"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Frown, Smile, Meh, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Emotion {
  name: string;
  value: number;
  color: string;
  bgColor: string;
  icon: React.ComponentType<any>;
  description: string;
}

export function EmotionWheel() {
  const [emotions, setEmotions] = useState<Emotion[]>([
    { name: 'Joy', value: 45, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'from-yellow-500 to-amber-500', icon: Smile, description: 'Happiness & satisfaction' },
    { name: 'Anger', value: 15, color: 'text-red-600 dark:text-red-400', bgColor: 'from-red-500 to-rose-500', icon: Zap, description: 'Frustration & irritation' },
    { name: 'Sadness', value: 8, color: 'text-blue-600 dark:text-blue-400', bgColor: 'from-blue-500 to-indigo-500', icon: Frown, description: 'Disappointment & sorrow' },
    { name: 'Neutral', value: 25, color: 'text-gray-600 dark:text-gray-400', bgColor: 'from-gray-500 to-slate-500', icon: Meh, description: 'Calm & composed' },
    { name: 'Anxiety', value: 7, color: 'text-purple-600 dark:text-purple-400', bgColor: 'from-purple-500 to-violet-500', icon: AlertTriangle, description: 'Worry & concern' }
  ]);

  // Simulate real-time emotion updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEmotions(prev => {
        const newEmotions = prev.map(emotion => {
          // More realistic emotion changes based on conversation flow
          let change = 0;

          // Simulate conversation dynamics
          if (emotion.name === 'Joy') {
            change = (Math.random() - 0.3) * 8; // Slightly positive bias
          } else if (emotion.name === 'Anger') {
            change = (Math.random() - 0.6) * 6; // Negative bias (decreasing over time)
          } else if (emotion.name === 'Neutral') {
            change = (Math.random() - 0.5) * 4; // Small changes
          } else {
            change = (Math.random() - 0.5) * 5;
          }

          const newValue = Math.max(0, Math.min(100, emotion.value + change));
          return { ...emotion, value: newValue };
        });

        // Normalize values to ensure they make sense proportionally
        const total = newEmotions.reduce((sum, emotion) => sum + emotion.value, 0);
        if (total > 0) {
          return newEmotions.map(emotion => ({
            ...emotion,
            value: (emotion.value / total) * 100
          }));
        }

        return newEmotions;
      });
    }, 6000); // Update every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate primary emotion
  const primaryEmotion = emotions.reduce((prev, current) =>
    current.value > prev.value ? current : prev
  );

  // Calculate SVG paths for the emotion wheel
  const createEmotionArc = (emotion: Emotion, index: number, total: number) => {
    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const innerRadius = 30;

    const percentage = emotion.value / 100;
    const angle = (percentage * 360);
    const startAngle = emotions.slice(0, index).reduce((sum, e) => sum + (e.value / 100 * 360), 0);
    const endAngle = startAngle + angle;

    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  const getEmotionHSL = (emotion: Emotion) => {
    switch (emotion.name) {
      case 'Joy': return '45, 100%, 60%';
      case 'Anger': return '0, 85%, 55%';
      case 'Sadness': return '220, 85%, 55%';
      case 'Neutral': return '0, 0%, 60%';
      case 'Anxiety': return '270, 70%, 60%';
      default: return '0, 0%, 50%';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
            <Heart className="h-5 w-5 text-white" />
          </div>
          Emotion Analysis
          <Badge variant="outline" className={primaryEmotion.color}>
            Primary: {primaryEmotion.name}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Emotion Wheel Visualization */}
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="relative">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="transform -rotate-90"
            >
              {emotions.map((emotion, index) => (
                <motion.path
                  key={emotion.name}
                  d={createEmotionArc(emotion, index, emotions.length)}
                  fill={`hsl(${getEmotionHSL(emotion)})`}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: emotion.value > 1 ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="hover:brightness-110 transition-all cursor-pointer"
                />
              ))}

              {/* Center circle */}
              <circle
                cx="100"
                cy="100"
                r="25"
                fill="currentColor"
                className="text-muted"
              />
              <text
                x="100"
                y="105"
                textAnchor="middle"
                className="text-xs font-medium fill-muted-foreground"
                transform="rotate(90 100 100)"
              >
                Live
              </text>
            </svg>

            {/* Pulsing animation for primary emotion */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-pink-400"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Emotion Breakdown */}
          <div className="flex-1 space-y-3 w-full">
            {emotions
              .sort((a, b) => b.value - a.value)
              .map((emotion) => {
                const Icon = emotion.icon;
                return (
                  <motion.div
                    key={emotion.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${emotion.bgColor} shadow-sm`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{emotion.name}</span>
                        <span className={`font-bold text-sm ${emotion.color}`}>
                          {Math.round(emotion.value)}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${emotion.bgColor} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${emotion.value}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground mt-1">
                        {emotion.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Emotion Insights */}
        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-sm text-blue-700 dark:text-blue-300">Emotional Insights</span>
          </div>

          <div className="text-sm text-blue-600 dark:text-blue-400">
            {primaryEmotion.value > 50 ? (
              primaryEmotion.name === 'Joy' ? (
                "Customer is expressing strong positive emotions. Great opportunity to strengthen relationship."
              ) : primaryEmotion.name === 'Anger' ? (
                "High anger detected. Focus on active listening and de-escalation techniques."
              ) : (
                `Primary emotion is ${primaryEmotion.name.toLowerCase()}. Adjust your communication style accordingly.`
              )
            ) : (
              "Mixed emotional state detected. Customer may be conflicted - provide clear, empathetic responses."
            )}
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <motion.div
            className="w-2 h-2 bg-pink-500 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Real-time emotion analysis active
        </div>
      </CardContent>
    </Card>
  );
}