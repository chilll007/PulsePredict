"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-pink-950/20 dark:via-rose-950/30 dark:to-purple-950/20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-purple-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-300/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-300/20 to-transparent rounded-full blur-2xl" />

        <CardContent className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-6 flex-1">
              {/* Welcome Message */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-pink-700 dark:text-pink-300 tracking-wide uppercase">
                    Welcome back
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 dark:from-white dark:via-pink-200 dark:to-purple-200 bg-clip-text text-transparent"
                >
                  Welcome to PulsePredict
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
                >
                  Transform your conversations into actionable insights with AI-powered analysis.
                  Predict outcomes, understand emotions, and make data-driven decisions.
                </motion.p>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    <span className="text-emerald-600 dark:text-emerald-400">94.2%</span> Success Rate
                  </span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-pink-500 to-rose-500">
                    <Brain className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    <span className="text-pink-600 dark:text-pink-400">2,847</span> Analyses Complete
                  </span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/upload">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      Start New Analysis
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right side illustration/graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="w-64 h-64 relative">
                {/* Animated circles */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 animate-pulse" />
                  <div className="absolute top-12 right-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-40 animate-pulse delay-100" />
                  <div className="absolute bottom-8 left-12 w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-80 animate-pulse delay-200" />
                </div>

                {/* Central logo-like element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-8 shadow-2xl">
                    <Brain className="w-full h-full text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}