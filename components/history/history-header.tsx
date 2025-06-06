"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  History,
  Download,
  Filter,
  Calendar,
  ArrowLeft,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function HistoryHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-pink-700 dark:text-pink-300 font-medium">Analysis History</span>
      </div>

      {/* Enhanced Header Card */}
      <Card className="border-0 shadow-xl overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-pink-300/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-300/10 to-transparent rounded-full blur-xl" />

        <CardContent className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Main Header Content */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                  <History className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-pink-800 to-purple-800 dark:from-white dark:via-pink-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Analysis History
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    Complete archive of your conversation analyses and insights
                  </p>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                  <div className="p-1 rounded-full bg-gradient-to-br from-pink-500 to-rose-500">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    <span className="text-pink-600 dark:text-pink-400">47</span> Total Analyses
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/50">
                  <div className="p-1 rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                    <Calendar className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    <span className="text-emerald-600 dark:text-emerald-400">12</span> This Week
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <Link href="/upload">
                  <Sparkles className="h-4 w-4 mr-2" />
                  New Analysis
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}