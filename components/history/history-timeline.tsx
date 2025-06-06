"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  MoreHorizontal,
  ArrowRight,
  Calendar,
  Download,
  Share2,
  Eye,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OutcomeBadge } from "@/components/ui/outcome-badge";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockAnalyses } from "@/lib/mock-data";

// Extended mock data with more realistic timeline data
const extendedAnalyses = [
  ...mockAnalyses,
  {
    id: "a6",
    title: "Product Demo - Enterprise Client",
    date: "Oct 3, 2025",
    outcome: "positive" as const,
    confidence: 94,
    source: "Zoom Recording",
  },
  {
    id: "a7",
    title: "Performance Review - Q3 Goals",
    date: "Sep 30, 2025",
    outcome: "at-risk" as const,
    confidence: 67,
    source: "Teams Recording",
  },
  {
    id: "a8",
    title: "Customer Onboarding Session",
    date: "Sep 28, 2025",
    outcome: "positive" as const,
    confidence: 89,
    source: "Zoom Recording",
  }
];

export function HistoryTimeline() {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const getSourceIcon = (source: string) => {
    if (source.includes("Zoom")) return "📹";
    if (source.includes("Teams")) return "💼";
    if (source.includes("Phone")) return "📞";
    if (source.includes("Chat")) return "💬";
    return "📄";
  };

  const getDateGroup = (date: string) => {
    const analysisDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (analysisDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (analysisDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (analysisDate.getMonth() === today.getMonth() && analysisDate.getFullYear() === today.getFullYear()) {
      return "This Month";
    } else {
      return analysisDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Group analyses by date
  const groupedAnalyses = extendedAnalyses.reduce((groups, analysis) => {
    const group = getDateGroup(analysis.date);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(analysis);
    return groups;
  }, {} as Record<string, typeof extendedAnalyses>);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-8"
    >
      {Object.entries(groupedAnalyses).map(([dateGroup, analyses], groupIndex) => (
        <motion.div
          key={dateGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          className="space-y-4"
        >
          {/* Date Group Header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 px-4 py-2 rounded-full border border-pink-200/50 dark:border-pink-800/50">
              <Calendar className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              <span className="font-medium text-sm text-pink-700 dark:text-pink-300">{dateGroup}</span>
            </div>
            <div className="h-px bg-pink-200/50 dark:bg-pink-800/50 flex-1" />
            <Badge variant="secondary" className="text-xs bg-pink-100/50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300">
              {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''}
            </Badge>
          </div>

          {/* Timeline Items */}
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                variants={item}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-pink-200 to-pink-100 dark:from-pink-800 dark:to-pink-900" />

                {/* Timeline Node */}
                <div className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-4 border-background shadow-lg" />

                {/* Analysis Card */}
                <div className="ml-12">
                  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border-0 shadow-md">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Link href={`/results/${analysis.id}`} className="block">
                      <CardHeader className="relative pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <Avatar className="w-10 h-10 border-2 border-pink-200/50 dark:border-pink-800/50">
                              <AvatarFallback className="text-lg">
                                {getSourceIcon(analysis.source)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg leading-tight group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-200">
                                {analysis.title}
                              </CardTitle>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {analysis.date}
                                </div>
                                <Badge variant="secondary" className="text-xs bg-pink-100/50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300">
                                  {analysis.source}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-pink-100/50 dark:hover:bg-pink-900/30"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share Analysis
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <OutcomeBadge outcome={analysis.outcome} />
                            <ConfidenceMeter value={analysis.confidence} size="sm" />
                          </div>

                          {/* Hover indicator */}
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-xs text-pink-600 dark:text-pink-400 font-medium mr-1">View Details</span>
                            <ArrowRight className="h-3 w-3 text-pink-600 dark:text-pink-400 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>

                        {/* Confidence visualization */}
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Confidence Level</span>
                            <span className="font-medium">{analysis.confidence}%</span>
                          </div>
                          <div className="w-full bg-pink-100/50 dark:bg-pink-900/20 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"
                              initial={{ width: 0 }}
                              animate={{ width: `${analysis.confidence}%` }}
                              transition={{ duration: 1, delay: (groupIndex * 0.2) + (index * 0.1) }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center pt-8"
      >
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-300"
        >
          Load More Analyses
        </Button>
      </motion.div>
    </motion.div>
  );
}