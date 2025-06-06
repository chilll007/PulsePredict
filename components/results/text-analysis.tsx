"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock conversation data
const conversation = [
  {
    speaker: "Alex",
    role: "Client",
    message: "I'm concerned about the timeline for this project. Can we realistically meet the deadline?",
    sentimentScore: 30,
    keyPhrases: ["concerned", "timeline", "deadline"],
    timestamp: "00:01:24"
  },
  {
    speaker: "Sam",
    role: "Account Manager",
    message: "I understand your concern. We've allocated additional resources to ensure we meet the deadline. Our team is committed to delivering on time.",
    sentimentScore: 75,
    keyPhrases: ["understand", "additional resources", "committed", "delivering on time"],
    timestamp: "00:02:10"
  },
  {
    speaker: "Alex",
    role: "Client",
    message: "That's good to hear. What about the budget implications of these additional resources?",
    sentimentScore: 50,
    keyPhrases: ["budget implications", "additional resources"],
    timestamp: "00:02:35"
  },
  {
    speaker: "Sam",
    role: "Account Manager",
    message: "There won't be any impact on your budget. We're absorbing these costs as part of our commitment to the project's success.",
    sentimentScore: 85,
    keyPhrases: ["no impact", "budget", "commitment", "success"],
    timestamp: "00:03:15"
  },
  {
    speaker: "Alex",
    role: "Client",
    message: "That's excellent news! I appreciate your team going the extra mile. I'm feeling much more confident about the project now.",
    sentimentScore: 90,
    keyPhrases: ["excellent", "appreciate", "confident"],
    timestamp: "00:03:42"
  }
];

export function TextAnalysis() {
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  
  // Function to get color based on sentiment score
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-blue-500";
    return "text-amber-500";
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Conversation Transcript</h3>
        <p className="text-sm text-muted-foreground">
          Analysis of text content with sentiment scoring and key phrase detection.
        </p>
      </div>
      
      <div className="space-y-4">
        {conversation.map((message, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">{message.speaker}</span>
                    <span className="text-xs text-muted-foreground ml-2">({message.role})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getSentimentColor(message.sentimentScore)}`}>
                      Sentiment: {message.sentimentScore}%
                    </span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-sm">
                  {message.message}
                </p>
                
                <button 
                  className="text-xs text-primary mt-2"
                  onClick={() => setExpandedMessage(expandedMessage === index ? null : index)}
                >
                  {expandedMessage === index ? "Hide Analysis" : "Show Analysis"}
                </button>
              </div>
              
              {expandedMessage === index && (
                <>
                  <Separator />
                  <div className="p-4 bg-muted/30">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-xs font-medium">Key Phrases:</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {message.keyPhrases.map((phrase, i) => (
                            <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {phrase}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium">Insights:</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.sentimentScore >= 70 
                            ? "This message conveys a positive sentiment with confidence and satisfaction."
                            : message.sentimentScore >= 40
                            ? "This message has a neutral tone with some concern or questioning."
                            : "This message expresses concern or uncertainty that should be addressed."}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}