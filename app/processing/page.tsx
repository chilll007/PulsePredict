"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Status message stages
const statusMessages = [
  "Initializing analysis...",
  "Extracting conversation data...",
  "Analyzing sentiment patterns...",
  "Detecting voice tone variations...",
  "Processing conversation flow...",
  "Identifying key phrases and topics...",
  "Calculating outcome probabilities...",
  "Generating insights and recommendations...",
  "Finalizing analysis results...",
  "Analysis complete!"
];

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Simulate processing stages
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Calculate new progress
        const newProgress = prev + 1;

        // Update stage based on progress
        const stageIndex = Math.min(
          Math.floor(newProgress / (100 / statusMessages.length)),
          statusMessages.length - 1
        );

        if (stageIndex !== currentStage) {
          setCurrentStage(stageIndex);
        }

        // When complete, navigate to results page
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            router.push("/results/demo");
          }, 1000);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [router, currentStage]);

  return (
    <div className="max-w-md mx-auto py-16 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 h-16 w-16 flex items-center justify-center animate-pulse">
                  <BrainCog className="h-8 w-8 text-primary" />
                </div>
              </div>
              <svg
                className="h-16 w-16 rotate-[-90deg]"
                viewBox="0 0 100 100"
              >
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${progress * 2.51} 251`}
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Processing Your Conversation</h2>
              <p className="text-muted-foreground">
                {statusMessages[currentStage]}
              </p>
            </div>

            <div className="w-full space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Analysis in progress</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}