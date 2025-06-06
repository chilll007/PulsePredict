import Link from "next/link";
import {
  BarChart,
  Download,
  MessageSquare,
  ThumbsUp,
  Share2,
  MessageCircle,
  Mic,
  Video,
  BarChart3,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutcomeBadge } from "@/components/ui/outcome-badge";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import { SentimentGraph } from "@/components/results/sentiment-graph";
import { EmotionTimeline } from "@/components/results/emotion-timeline";
import { WordFrequency } from "@/components/results/word-frequency";
import { TextAnalysis } from "@/components/results/text-analysis";
import { AudioAnalysis } from "@/components/results/audio-analysis";
import { mockResults, mockAnalyses } from "@/lib/mock-data";
import { FeedbackSection } from "@/components/results/feedback-section";

export function generateStaticParams() {
  return mockAnalyses.map((analysis) => ({
    id: analysis.id,
  }));
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  // Use mock data for the demo
  const result = mockResults;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{result.title}</h1>
          <p className="text-muted-foreground mt-1">{result.date}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Link href="/dashboard">
            <Button size="sm">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="text-sm text-muted-foreground">Predicted Outcome</div>
                <div className="flex items-center gap-2">
                  <OutcomeBadge outcome={result.outcome} size="lg" />
                  <ConfidenceMeter value={result.confidence} size="lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                <Card className="bg-muted/50">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{result.metrics.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{result.metrics.speakers}</div>
                    <div className="text-xs text-muted-foreground">Speakers</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{result.metrics.messages}</div>
                    <div className="text-xs text-muted-foreground">Messages</div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{result.metrics.keyTopics}</div>
                    <div className="text-xs text-muted-foreground">Key Topics</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment & Emotion Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentGraph />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Topics & Phrases</CardTitle>
          </CardHeader>
          <CardContent>
            <WordFrequency />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Emotion Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <EmotionTimeline />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="text">
              <TabsList className="w-full bg-muted/50 p-0 rounded-none justify-start">
                <TabsTrigger value="text" className="py-3 px-6 data-[state=active]:bg-background rounded-none">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Text Analysis
                </TabsTrigger>
                <TabsTrigger value="audio" className="py-3 px-6 data-[state=active]:bg-background rounded-none">
                  <Mic className="mr-2 h-4 w-4" />
                  Audio Analysis
                </TabsTrigger>
                <TabsTrigger value="visual" className="py-3 px-6 data-[state=active]:bg-background rounded-none">
                  <Video className="mr-2 h-4 w-4" />
                  Visual Analysis
                </TabsTrigger>
                <TabsTrigger value="insights" className="py-3 px-6 data-[state=active]:bg-background rounded-none">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Insights
                </TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="text">
                  <TextAnalysis />
                </TabsContent>
                <TabsContent value="audio">
                  <AudioAnalysis />
                </TabsContent>
                <TabsContent value="visual">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Visual analysis is only available for video conversations.</p>
                  </div>
                </TabsContent>
                <TabsContent value="insights">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Key Insights</h3>
                    <div className="space-y-4">
                      {result.insights.map((insight, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                                <ThumbsUp className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{insight.title}</h4>
                                <p className="text-sm text-muted-foreground">{insight.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <FeedbackSection />
      </div>
    </div>
  );
}