"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  Activity,
  Eye,
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  User,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
  intensity: number;
  facialExpressions: {
    eyebrows: number;
    eyes: number;
    mouth: number;
    overall: number;
  };
}

interface SentimentData {
  score: number;
  trend: "up" | "down" | "stable";
  history: number[];
}

interface VoiceData {
  pitch: number;
  frequency: number;
  waveform: number[];
}

interface FacialCue {
  id: string;
  type: "eye_contact" | "smile" | "frown" | "attention";
  x: number;
  y: number;
  intensity: number;
}

interface TranscriptLine {
  id: string;
  timestamp: Date;
  speaker: string;
  text: string;
  emotion: string;
  sentiment: number;
  tone: string;
  intent: string;
}

interface EmotionHistory {
  emotion: string;
  timestamp: Date;
  confidence: number;
  intensity: number;
}

export function VideoAnalysisDashboard() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData>({
    emotion: "Focused",
    confidence: 87,
    color: "text-blue-600",
    intensity: 0.7,
    facialExpressions: {
      eyebrows: 0.6,
      eyes: 0.8,
      mouth: 0.5,
      overall: 0.7
    }
  });
  const [sentiment, setSentiment] = useState<SentimentData>({
    score: 0.65,
    trend: "up",
    history: [0.2, 0.3, 0.45, 0.52, 0.61, 0.65]
  });
  const [voiceData, setVoiceData] = useState<VoiceData>({
    pitch: 185,
    frequency: 440,
    waveform: Array.from({ length: 50 }, () => Math.random() * 100)
  });
  const [confidence, setConfidence] = useState(87);
  const [facialCues, setFacialCues] = useState<FacialCue[]>([
    { id: "1", type: "eye_contact", x: 45, y: 35, intensity: 0.8 },
    { id: "2", type: "attention", x: 55, y: 65, intensity: 0.9 }
  ]);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 30000),
      speaker: "Client",
      text: "I'm really concerned about the project timeline. Can we discuss the delays?",
      emotion: "Concerned",
      sentiment: -0.3,
      tone: "Formal",
      intent: "Question"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 15000),
      speaker: "You",
      text: "Absolutely, I understand your concerns and I want to address them directly.",
      emotion: "Professional",
      sentiment: 0.4,
      tone: "Reassuring",
      intent: "Acknowledgment"
    },
    {
      id: "3",
      timestamp: new Date(),
      speaker: "Client",
      text: "That's good to hear. What specific steps are you taking to get back on track?",
      emotion: "Interested",
      sentiment: 0.2,
      tone: "Inquisitive",
      intent: "Information Seeking"
    }
  ]);
  const [emotionHistory, setEmotionHistory] = useState<EmotionHistory[]>([
    { emotion: "Neutral", timestamp: new Date(Date.now() - 10000), confidence: 82, intensity: 0.5 },
    { emotion: "Interested", timestamp: new Date(Date.now() - 8000), confidence: 89, intensity: 0.7 },
    { emotion: "Focused", timestamp: new Date(), confidence: 87, intensity: 0.7 }
  ]);
  const [emotionBreakdown, setEmotionBreakdown] = useState([
    { emotion: "Happy", percentage: 35, color: "bg-yellow-400" },
    { emotion: "Confident", percentage: 25, color: "bg-green-400" },
    { emotion: "Focused", percentage: 20, color: "bg-blue-400" },
    { emotion: "Curious", percentage: 15, color: "bg-purple-400" },
    { emotion: "Concerned", percentage: 5, color: "bg-red-400" }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update emotion with more comprehensive categories
      const emotions = [
        {
          emotion: "Happy",
          confidence: 85 + Math.random() * 10,
          color: "text-yellow-600",
          intensity: 0.8 + Math.random() * 0.2,
          facialExpressions: {
            eyebrows: 0.7 + Math.random() * 0.2,
            eyes: 0.9 + Math.random() * 0.1,
            mouth: 0.8 + Math.random() * 0.2,
            overall: 0.8 + Math.random() * 0.2
          }
        },
        {
          emotion: "Confident",
          confidence: 80 + Math.random() * 15,
          color: "text-green-600",
          intensity: 0.7 + Math.random() * 0.2,
          facialExpressions: {
            eyebrows: 0.6 + Math.random() * 0.2,
            eyes: 0.8 + Math.random() * 0.2,
            mouth: 0.6 + Math.random() * 0.2,
            overall: 0.7 + Math.random() * 0.2
          }
        },
        {
          emotion: "Focused",
          confidence: 75 + Math.random() * 20,
          color: "text-blue-600",
          intensity: 0.6 + Math.random() * 0.3,
          facialExpressions: {
            eyebrows: 0.5 + Math.random() * 0.2,
            eyes: 0.7 + Math.random() * 0.2,
            mouth: 0.4 + Math.random() * 0.2,
            overall: 0.6 + Math.random() * 0.3
          }
        },
        {
          emotion: "Curious",
          confidence: 82 + Math.random() * 12,
          color: "text-purple-600",
          intensity: 0.6 + Math.random() * 0.3,
          facialExpressions: {
            eyebrows: 0.8 + Math.random() * 0.2,
            eyes: 0.9 + Math.random() * 0.1,
            mouth: 0.5 + Math.random() * 0.2,
            overall: 0.7 + Math.random() * 0.2
          }
        },
        {
          emotion: "Concerned",
          confidence: 78 + Math.random() * 15,
          color: "text-red-600",
          intensity: 0.4 + Math.random() * 0.4,
          facialExpressions: {
            eyebrows: 0.3 + Math.random() * 0.3,
            eyes: 0.5 + Math.random() * 0.3,
            mouth: 0.2 + Math.random() * 0.3,
            overall: 0.4 + Math.random() * 0.4
          }
        },
        {
          emotion: "Thoughtful",
          confidence: 83 + Math.random() * 12,
          color: "text-indigo-600",
          intensity: 0.5 + Math.random() * 0.3,
          facialExpressions: {
            eyebrows: 0.4 + Math.random() * 0.3,
            eyes: 0.6 + Math.random() * 0.3,
            mouth: 0.3 + Math.random() * 0.3,
            overall: 0.5 + Math.random() * 0.3
          }
        }
      ];

      const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(newEmotion);

      // Add to emotion history
      setEmotionHistory(prev => [
        ...prev.slice(-9), // Keep last 9 entries
        {
          emotion: newEmotion.emotion,
          timestamp: new Date(),
          confidence: newEmotion.confidence,
          intensity: newEmotion.intensity
        }
      ]);

      // Update emotion breakdown
      setEmotionBreakdown(prev =>
        prev.map(item => ({
          ...item,
          percentage: Math.max(5, Math.min(50, item.percentage + (Math.random() - 0.5) * 10))
        }))
      );

      // Update sentiment
      setSentiment(prev => {
        const newScore = Math.max(-1, Math.min(1, prev.score + (Math.random() - 0.5) * 0.2));
        return {
          score: newScore,
          trend: newScore > prev.score ? "up" : newScore < prev.score ? "down" : "stable",
          history: [...prev.history.slice(-19), newScore]
        };
      });

      // Update voice waveform
      setVoiceData(prev => ({
        ...prev,
        pitch: 150 + Math.random() * 100,
        waveform: Array.from({ length: 50 }, () => Math.random() * 100)
      }));

      // Update confidence
      setConfidence(75 + Math.random() * 20);

      // Occasionally update facial cues
      if (Math.random() > 0.7) {
        setFacialCues([
          { id: "1", type: "eye_contact", x: 40 + Math.random() * 20, y: 30 + Math.random() * 15, intensity: 0.7 + Math.random() * 0.3 },
          { id: "2", type: "attention", x: 50 + Math.random() * 15, y: 60 + Math.random() * 20, intensity: 0.8 + Math.random() * 0.2 }
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600";
    if (score < -0.3) return "text-red-600";
    return "text-yellow-600";
  };

  const getSentimentBg = (score: number) => {
    if (score > 0.3) return "bg-green-100 dark:bg-green-900/30";
    if (score < -0.3) return "bg-red-100 dark:bg-red-900/30";
    return "bg-yellow-100 dark:bg-yellow-900/30";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-screen max-h-screen p-4">
      {/* Main Video Feed */}
      <div className="xl:col-span-2 space-y-4">
        <Card className="border-0 shadow-xl h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                  <Video className="h-5 w-5 text-white" />
                </div>
                Live Video Analysis
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`${isVideoOn ? 'hover:bg-red-50 hover:border-red-300' : 'bg-red-100 border-red-300'}`}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`${isAudioOn ? 'hover:bg-red-50 hover:border-red-300' : 'bg-red-100 border-red-300'}`}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative">
            {/* Video Feed Container */}
            <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
              {isVideoOn ? (
                <>
                  {/* Simulated Video Feed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
                  <div className="absolute inset-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>

                  {/* Real-time Overlays */}
                  <AnimatePresence>
                    {/* Enhanced Emotion Tag */}
                    <motion.div
                      key={currentEmotion.emotion}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute top-4 left-4"
                    >
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-pink-600" />
                          <span className={`font-semibold ${currentEmotion.color}`}>
                            {currentEmotion.emotion}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(currentEmotion.confidence)}%
                          </Badge>
                        </div>

                        {/* Emotion Intensity Bar */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Intensity</span>
                            <span className="font-medium">{Math.round(currentEmotion.intensity * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${currentEmotion.intensity * 100}%` }}
                              transition={{ duration: 0.5 }}
                              className={`h-full rounded-full ${
                                currentEmotion.emotion === "Happy" ? "bg-yellow-500" :
                                currentEmotion.emotion === "Confident" ? "bg-green-500" :
                                currentEmotion.emotion === "Focused" ? "bg-blue-500" :
                                currentEmotion.emotion === "Curious" ? "bg-purple-500" :
                                currentEmotion.emotion === "Concerned" ? "bg-red-500" :
                                "bg-indigo-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Facial Expression Breakdown */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Eyebrows</span>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-pink-500 rounded-full transition-all duration-300"
                                  style={{ width: `${currentEmotion.facialExpressions.eyebrows * 100}%` }}
                                />
                              </div>
                              <span className="w-8 text-right">{Math.round(currentEmotion.facialExpressions.eyebrows * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Eyes</span>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${currentEmotion.facialExpressions.eyes * 100}%` }}
                                />
                              </div>
                              <span className="w-8 text-right">{Math.round(currentEmotion.facialExpressions.eyes * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Mouth</span>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                                  style={{ width: `${currentEmotion.facialExpressions.mouth * 100}%` }}
                                />
                              </div>
                              <span className="w-8 text-right">{Math.round(currentEmotion.facialExpressions.mouth * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Facial Expression Markers */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* Eyebrow markers */}
                      <div className="absolute" style={{ left: '40%', top: '25%' }}>
                        <div
                          className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-lg"
                          style={{ opacity: currentEmotion.facialExpressions.eyebrows }}
                        />
                      </div>
                      <div className="absolute" style={{ left: '60%', top: '25%' }}>
                        <div
                          className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-lg"
                          style={{ opacity: currentEmotion.facialExpressions.eyebrows }}
                        />
                      </div>

                      {/* Eye markers */}
                      <div className="absolute" style={{ left: '42%', top: '35%' }}>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg"
                          style={{ opacity: currentEmotion.facialExpressions.eyes }}
                        />
                      </div>
                      <div className="absolute" style={{ left: '58%', top: '35%' }}>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg"
                          style={{ opacity: currentEmotion.facialExpressions.eyes }}
                        />
                      </div>

                      {/* Mouth marker */}
                      <div className="absolute" style={{ left: '50%', top: '55%' }}>
                        <div
                          className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg"
                          style={{ opacity: currentEmotion.facialExpressions.mouth }}
                        />
                      </div>
                    </motion.div>

                    {/* Original Facial Cues */}
                    {facialCues.map((cue) => (
                      <motion.div
                        key={cue.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute"
                        style={{ left: `${cue.x}%`, top: `${cue.y}%` }}
                      >
                        <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse shadow-lg" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Confidence Ring */}
                  <div className="absolute top-4 right-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#confidence-gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${confidence * 1.76} 176`}
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="confidence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">{Math.round(confidence)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Meter */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Sentiment</span>
                        <div className="flex items-center gap-1">
                          {sentiment.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {sentiment.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                          {sentiment.trend === "stable" && <Minus className="h-4 w-4 text-gray-600" />}
                          <span className={`text-sm font-semibold ${getSentimentColor(sentiment.score)}`}>
                            {sentiment.score > 0 ? '+' : ''}{sentiment.score.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              sentiment.score > 0 ? 'bg-green-500' : sentiment.score < 0 ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${((sentiment.score + 1) / 2) * 100}%` }}
                          />
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-400" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <VideoOff className="h-16 w-16 mx-auto mb-4" />
                    <p>Video disabled</p>
                  </div>
                </div>
              )}
            </div>

            {/* Voice Analysis */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-pink-600" />
                      <span className="text-sm font-medium">Voice Pitch</span>
                    </div>
                    <span className="text-sm font-semibold">{Math.round(voiceData.pitch)} Hz</span>
                  </div>
                  <div className="flex items-end gap-0.5 h-16">
                    {voiceData.waveform.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ duration: 0.1 }}
                        className="flex-1 bg-gradient-to-t from-pink-500 to-rose-400 rounded-t"
                        style={{ minHeight: '2px' }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Engagement</span>
                    </div>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Eye Contact</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span>Attention</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="space-y-4 h-full overflow-hidden">
        {/* Emotion Analysis */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                <Brain className="h-4 w-4 text-white" />
              </div>
              Emotion Analysis
              <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1" />
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Current Emotion Overview */}
            <div className="mb-4 p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current State</span>
                <span className={`font-semibold ${currentEmotion.color}`}>
                  {currentEmotion.emotion}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Confidence: {Math.round(currentEmotion.confidence)}%</span>
                <span>Intensity: {Math.round(currentEmotion.intensity * 100)}%</span>
              </div>
            </div>

            {/* Emotion Breakdown */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3">Emotion Distribution</h4>
              <div className="space-y-2">
                {emotionBreakdown.map((emotion, index) => (
                  <div key={emotion.emotion} className="flex items-center gap-3">
                    <div className="w-12 text-xs font-medium">{emotion.emotion}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${emotion.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full ${emotion.color} rounded-full`}
                      />
                    </div>
                    <div className="w-8 text-xs text-muted-foreground text-right">
                      {Math.round(emotion.percentage)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotion History */}
            <div>
              <h4 className="text-sm font-medium mb-3">Recent Emotions</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {emotionHistory.slice(-5).reverse().map((entry, index) => (
                  <motion.div
                    key={`${entry.emotion}-${entry.timestamp.getTime()}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between text-sm p-2 rounded bg-muted/20"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          entry.emotion === "Happy" ? "bg-yellow-400" :
                          entry.emotion === "Confident" ? "bg-green-400" :
                          entry.emotion === "Focused" ? "bg-blue-400" :
                          entry.emotion === "Curious" ? "bg-purple-400" :
                          entry.emotion === "Concerned" ? "bg-red-400" :
                          "bg-indigo-400"
                        }`}
                      />
                      <span className="font-medium">{entry.emotion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{Math.round(entry.confidence)}%</span>
                      <span>{entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Transcript */}
        <Card className="border-0 shadow-xl flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              Live Transcript
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-48">
              <div className="space-y-4">
                {transcript.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{line.speaker}</span>
                        <span className="text-xs text-muted-foreground">{formatTime(line.timestamp)}</span>
                      </div>
                      <Badge className={`text-xs ${getSentimentBg(line.sentiment)} ${getSentimentColor(line.sentiment)}`}>
                        {line.emotion}
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed break-words">{line.text}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Tone: {line.tone}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Intent: {line.intent}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getSentimentColor(line.sentiment)}`}>
                        {line.sentiment > 0 ? '+' : ''}{line.sentiment.toFixed(1)}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Sentiment & Emotion Timeline */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
              Timeline Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Sentiment Timeline */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Sentiment</h4>
              <div className="relative h-16 flex items-end gap-1">
                {sentiment.history.map((score, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${((score + 1) / 2) * 100}%` }}
                    className={`flex-1 rounded-t transition-colors ${
                      score > 0.3 ? 'bg-green-500' : score < -0.3 ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                    style={{ minHeight: '2px' }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>-1.0</span>
                <span>0</span>
                <span>+1.0</span>
              </div>
            </div>

            {/* Emotion Intensity Timeline */}
            <div>
              <h4 className="text-sm font-medium mb-2">Emotion Intensity</h4>
              <div className="relative h-16 flex items-end gap-1">
                {emotionHistory.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${entry.intensity * 100}%` }}
                    className={`flex-1 rounded-t transition-colors ${
                      entry.emotion === "Happy" ? 'bg-yellow-500' :
                      entry.emotion === "Confident" ? 'bg-green-500' :
                      entry.emotion === "Focused" ? 'bg-blue-500' :
                      entry.emotion === "Curious" ? 'bg-purple-500' :
                      entry.emotion === "Concerned" ? 'bg-red-500' :
                      'bg-indigo-500'
                    }`}
                    style={{ minHeight: '2px' }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}