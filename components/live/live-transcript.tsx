"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, User, Headphones, AlertTriangle, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptEntry {
  id: string;
  speaker: "user" | "agent";
  message: string;
  timestamp: Date;
  sentiment: "positive" | "neutral" | "negative";
  hasNegativePhrase?: boolean;
}

interface LiveTranscriptProps {
  isAnalyzing: boolean;
}

// Mock negative phrases for highlighting
const negativePatterns = [
  "terrible", "awful", "hate", "worst", "horrible", "frustrated",
  "angry", "disappointed", "upset", "unacceptable", "ridiculous",
  "cancel", "refund", "never again", "waste of time", "delays",
  "behind schedule", "missed deadline", "not acceptable", "concerned",
  "worried", "disappointing", "falling behind", "overdue", "late",
  "budget overrun", "scope creep", "blocking", "bottleneck"
];

// Mock transcript data with realistic conversation flow
const mockTranscriptEntries: Omit<TranscriptEntry, 'id' | 'timestamp'>[] = [
  { speaker: "agent", message: "Good morning! Thanks for joining the call. I wanted to discuss the current status of your digital transformation project.", sentiment: "positive" },
  { speaker: "user", message: "Hi there. Yes, I'm concerned about where we stand. We're supposed to launch in 6 weeks and I'm not seeing the progress I expected.", sentiment: "negative", hasNegativePhrase: true },
  { speaker: "agent", message: "I understand your concern. Let me walk you through what we've completed and what's remaining. We've finished the backend architecture and are currently in the frontend development phase.", sentiment: "neutral" },
  { speaker: "user", message: "That's good to hear, but what about the API integrations? Those were supposed to be done by now according to our timeline.", sentiment: "neutral" },
  { speaker: "agent", message: "You're absolutely right. The API integrations have taken longer than anticipated due to some unexpected complexity with your legacy systems.", sentiment: "neutral" },
  { speaker: "user", message: "This is really frustrating. We have stakeholders breathing down our necks and board presentations scheduled. These delays are unacceptable.", sentiment: "negative", hasNegativePhrase: true },
  { speaker: "agent", message: "I completely understand your frustration, and I take full responsibility for the communication gap. Let me propose a solution.", sentiment: "positive" },
  { speaker: "user", message: "I'm listening. What do you suggest we do to get back on track?", sentiment: "neutral" },
  { speaker: "agent", message: "I can allocate two additional senior developers to the API team and we'll work weekends to catch up. I'm also proposing a phased launch approach.", sentiment: "positive" },
  { speaker: "user", message: "A phased approach could work. Can you walk me through what that would look like?", sentiment: "neutral" },
  { speaker: "agent", message: "We'll launch core functionality on schedule, then roll out advanced features in week 2. This ensures you hit your board presentation timeline.", sentiment: "positive" },
  { speaker: "user", message: "That actually sounds reasonable. What guarantees do I have that we won't face more delays?", sentiment: "neutral" },
  { speaker: "agent", message: "I'll personally oversee daily standups and provide you with weekly progress reports. Plus, we'll include a service credit clause for any future delays.", sentiment: "positive" },
  { speaker: "user", message: "Alright, I appreciate the transparency and the proposed solution. Let's move forward with this plan.", sentiment: "positive" },
  { speaker: "agent", message: "Excellent. I'll send you the revised timeline and weekly reporting schedule by end of day. Thank you for your patience.", sentiment: "positive" }
];

export function LiveTranscript({ isAnalyzing }: LiveTranscriptProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simulate real-time transcript updates
  useEffect(() => {
    if (!isAnalyzing || currentIndex >= mockTranscriptEntries.length) return;

    // Add a small delay for the first entry to make the transition smoother
    const delay = currentIndex === 0 ? 1000 : Math.random() * 3000 + 2000;

    const timer = setTimeout(() => {
      const newEntry: TranscriptEntry = {
        ...mockTranscriptEntries[currentIndex],
        id: `entry-${currentIndex}`,
        timestamp: new Date()
      };

      setTranscript(prev => [...prev, newEntry]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isAnalyzing, currentIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [transcript]);

  const highlightNegativePhrases = (text: string) => {
    let highlightedText = text;

    negativePatterns.forEach(pattern => {
      const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-1 rounded underline decoration-red-500 decoration-2">$1</span>`);
    });

    return highlightedText;
  };

  const getSpeakerIcon = (speaker: string) => {
    return speaker === "user" ? User : Headphones;
  };

  const getSpeakerColor = (speaker: string) => {
    return speaker === "user"
      ? "bg-gradient-to-br from-blue-500 to-indigo-500"
      : "bg-gradient-to-br from-pink-500 to-rose-500";
  };

  const getSentimentBadge = (sentiment: string) => {
    const config = {
      positive: { color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", label: "Positive" },
      neutral: { color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300", label: "Neutral" },
      negative: { color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300", label: "Negative" }
    };

    return config[sentiment as keyof typeof config] || config.neutral;
  };

  return (
    <Card className="border-0 shadow-lg h-[600px] flex flex-col relative z-10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          Live Transcript
          {isAnalyzing && (
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
              Recording
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {transcript.map((entry, index) => {
              const SpeakerIcon = getSpeakerIcon(entry.speaker);
              const sentimentBadge = getSentimentBadge(entry.sentiment);

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 group"
                >
                  <div className={`p-2 rounded-full ${getSpeakerColor(entry.speaker)} shadow-sm flex-shrink-0`}>
                    <SpeakerIcon className="h-4 w-4 text-white" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize text-sm">
                        {entry.speaker === "user" ? "Client" : "Project Manager"}
                      </span>
                      <Badge variant="secondary" className={`text-xs ${sentimentBadge.color}`}>
                        {sentimentBadge.label}
                      </Badge>
                      {entry.hasNegativePhrase && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    <div
                      className="text-sm leading-relaxed p-3 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors"
                      dangerouslySetInnerHTML={{
                        __html: entry.hasNegativePhrase
                          ? highlightNegativePhrases(entry.message)
                          : entry.message
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {isAnalyzing && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                Listening...
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {transcript.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Waiting for conversation...</h3>
              <p className="text-muted-foreground">
                The transcript will appear here once the analysis begins.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}