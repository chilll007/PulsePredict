"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  MessageCircle,
  Heart,
  Shield,
  Gift,
  Phone,
  Pause,
  Play,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface SuggestedResponse {
  id: string;
  text: string;
  category: "empathy" | "solution" | "escalation" | "retention";
  icon: React.ComponentType<any>;
  confidence: number;
  reasoning: string;
}

export function ActionSection() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [suggestedResponses, setSuggestedResponses] = useState<SuggestedResponse[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  // Generate dynamic suggested responses based on conversation context
  useEffect(() => {
    const responses: SuggestedResponse[] = [
      {
        id: "empathy-1",
        text: "I understand your concerns about the timeline and take full responsibility for the communication gap.",
        category: "empathy",
        icon: Heart,
        confidence: 94,
        reasoning: "Client expressed timeline concerns - acknowledge responsibility"
      },
      {
        id: "solution-1",
        text: "I can allocate two additional senior developers and implement weekend sprints to accelerate delivery.",
        category: "solution",
        icon: Gift,
        confidence: 91,
        reasoning: "Concrete resource allocation addresses delivery timeline"
      },
      {
        id: "solution-2",
        text: "Let's implement a phased launch approach - core features first, then advanced functionality.",
        category: "solution",
        icon: Gift,
        confidence: 88,
        reasoning: "Phased approach ensures meeting critical deadlines"
      },
      {
        id: "retention-1",
        text: "I'll provide weekly progress reports and include a service credit clause for future delays.",
        category: "retention",
        icon: Shield,
        confidence: 87,
        reasoning: "Enhanced communication and guarantees improve client confidence"
      },
      {
        id: "escalation-1",
        text: "Would you like me to schedule a call with our CTO to discuss technical architecture decisions?",
        category: "escalation",
        icon: Phone,
        confidence: 72,
        reasoning: "Technical leadership involvement for complex discussions"
      }
    ];

    // Simulate dynamic responses that change based on conversation
    const timer = setTimeout(() => {
      setSuggestedResponses(responses.sort((a, b) => b.confidence - a.confidence));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'empathy': return 'text-pink-600 dark:text-pink-400';
      case 'solution': return 'text-green-600 dark:text-green-400';
      case 'escalation': return 'text-orange-600 dark:text-orange-400';
      case 'retention': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'empathy': return 'from-pink-500 to-rose-500';
      case 'solution': return 'from-green-500 to-emerald-500';
      case 'escalation': return 'from-orange-500 to-amber-500';
      case 'retention': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'empathy': return 'Empathy';
      case 'solution': return 'Solution';
      case 'escalation': return 'Escalate';
      case 'retention': return 'Retain';
      default: return 'General';
    }
  };

  const handleResponseSelect = (responseId: string) => {
    setSelectedResponse(responseId);
    // Simulate copying to clipboard or other action
    setTimeout(() => setSelectedResponse(null), 2000);
  };

  return (
    <Card className="border-0 shadow-lg relative z-10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            Suggested Actions
          </div>

          {/* Privacy & Control Toggles */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="privacy-mode" className="text-sm font-medium text-muted-foreground">
                Privacy Mode
              </label>
              <Switch
                id="privacy-mode"
                checked={isPrivacyMode}
                onCheckedChange={setIsPrivacyMode}
              />
              {isPrivacyMode ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Analysis Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
            <span className="text-sm font-medium">
              {isPaused ? 'Analysis Paused' : 'Real-time Analysis Active'}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700"
          >
            {isPaused ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            )}
          </Button>
        </div>

        {!isPrivacyMode && !isPaused ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Recommended Responses</h4>
              <Badge variant="outline" className="text-xs">
                AI-Powered
              </Badge>
            </div>

            {/* Suggested Responses */}
            <div className="space-y-3">
              {suggestedResponses.map((response, index) => {
                const Icon = response.icon;
                const isSelected = selectedResponse === response.id;

                return (
                  <motion.div
                    key={response.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`relative group overflow-hidden ${isSelected ? 'ring-2 ring-pink-400' : ''}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-left h-auto p-4 hover:bg-muted/50 transition-all duration-200 hover:shadow-md relative"
                      onClick={() => handleResponseSelect(response.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryGradient(response.category)} shadow-sm flex-shrink-0`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>

                        <div className="flex-1 text-left space-y-2 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getCategoryColor(response.category)} flex-shrink-0`}
                            >
                              {getCategoryLabel(response.category)}
                            </Badge>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <span className="text-xs text-muted-foreground">Confidence:</span>
                              <span className={`text-xs font-medium ${response.confidence > 85 ? 'text-green-600 dark:text-green-400' : response.confidence > 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                {response.confidence}%
                              </span>
                            </div>
                          </div>

                          <div className="text-sm font-medium leading-relaxed break-words whitespace-normal">
                            &ldquo;{response.text}&rdquo;
                          </div>

                          <div className="text-xs text-muted-foreground break-words whitespace-normal">
                            {response.reasoning}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 z-10"
                        >
                          <MessageCircle className="h-3 w-3" />
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:border-blue-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Share Timeline
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950/30 dark:hover:border-green-700"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Review
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="flex justify-center">
              {isPrivacyMode ? (
                <EyeOff className="h-12 w-12 text-muted-foreground" />
              ) : (
                <Pause className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <div className="text-muted-foreground">
              {isPrivacyMode
                ? "Privacy mode enabled - AI suggestions disabled"
                : "Analysis paused - Resume to see suggestions"
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}