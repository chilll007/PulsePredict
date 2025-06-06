"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Play,
  Pause,
  Radio,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { LiveTranscript } from "@/components/live/live-transcript";
import { SentimentPulse } from "@/components/live/sentiment-pulse";
import { PredictionMeter } from "@/components/live/prediction-meter";
import { EmotionWheel } from "@/components/live/emotion-wheel";
import { ActionSection } from "@/components/live/action-section";

export default function LivePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showIntegrationScreen, setShowIntegrationScreen] = useState(true);

  // Hide integration screen after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntegrationScreen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Session timer
  useEffect(() => {
    if (isAnalyzing && !showIntegrationScreen) {
      const timer = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAnalyzing, showIntegrationScreen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Integration Loading Screen */}
      <AnimatePresence>
        {showIntegrationScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl border border-pink-200/50 dark:border-pink-800/50 max-w-md mx-4"
            >
              {/* Animated Logo */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg relative"
                >
                  <Logo size="lg" className="text-white" />

                  {/* Pulsing rings around logo */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-pink-400"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0.1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute inset-0 rounded-full border-2 border-rose-400"
                  />
                </motion.div>
              </div>

              {/* Integration Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 dark:from-white dark:via-pink-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Connecting PulsePredict
                </h2>

                <div className="flex items-center justify-center gap-2 text-lg font-medium text-muted-foreground">
                  <span>with</span>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                  >
                    Zoom
                  </motion.div>
                </div>

                {/* Loading dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                    />
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-sm text-muted-foreground mt-4"
                >
                  Establishing secure connection...
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={showIntegrationScreen ? "blur-sm" : ""}
      >
        <Card className="border-0 shadow-xl overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-pink-300/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-300/10 to-transparent rounded-full blur-xl" />

          <CardContent className="relative p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link href="/dashboard" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                    Dashboard
                  </Link>
                  <span>/</span>
                  <span className="text-pink-700 dark:text-pink-300 font-medium">Live Insights</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                    <Radio className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 dark:from-white dark:via-pink-200 dark:to-purple-200 bg-clip-text text-transparent">
                      Live Conversation Analysis
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">
                      Real-time insights and predictions for ongoing conversations
                    </p>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                    <div className={`p-1 rounded-full ${isAnalyzing ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-gray-500 to-gray-600'}`}>
                      {isAnalyzing ? <Radio className="h-3 w-3 text-white animate-pulse" /> : <Pause className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium">
                      <span className={isAnalyzing ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                        {isAnalyzing ? "Live" : "Paused"}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                    <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      <span className="text-blue-600 dark:text-blue-400">{formatDuration(sessionDuration)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAnalyzing(!isAnalyzing)}
                  className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300"
                >
                  {isAnalyzing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isAnalyzing ? "Pause" : "Resume"} Analysis
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <Link href="/results/demo">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Go to Full Report
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Split Layout */}
      <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 ${showIntegrationScreen ? "blur-sm" : ""}`}>
        {/* Left Panel - Live Transcript */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 relative z-10"
        >
          <LiveTranscript isAnalyzing={isAnalyzing && !showIntegrationScreen} />
          <ActionSection />
        </motion.div>

        {/* Right Panel - Analysis Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 relative z-10"
        >
          <PredictionMeter />
          <SentimentPulse isAnalyzing={isAnalyzing && !showIntegrationScreen} />
          <EmotionWheel />
        </motion.div>
      </div>
    </div>
  );
}