"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackSection() {
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackSubmitted(true);
      setFeedback("");
    }
  };

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {feedbackSubmitted ? (
          <div className="text-center py-4">
            <h4 className="font-medium">Thank you for your feedback!</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Your insights help us improve our analysis algorithms.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Was this analysis helpful? Let us know your thoughts to help improve our predictions.
            </p>
            <div className="flex gap-2">
              <Textarea
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleFeedbackSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}