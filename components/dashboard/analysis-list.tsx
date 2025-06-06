"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MoreHorizontal, Search, Filter, ArrowRight, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OutcomeBadge } from "@/components/ui/outcome-badge";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import { mockAnalyses } from "@/lib/mock-data";

export function AnalysisList() {
  const [analyses, setAnalyses] = useState(mockAnalyses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAnalyses = analyses.filter(analysis =>
    analysis.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSourceIcon = (source: string) => {
    if (source.includes("Zoom")) return "📹";
    if (source.includes("Teams")) return "💼";
    if (source.includes("Phone")) return "📞";
    if (source.includes("Chat")) return "💬";
    return "📄";
  };

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
            placeholder="Search analyses by title, outcome, or source..."
            className="pl-10 bg-background/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-background/50 backdrop-blur-sm">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAnalyses.length} of {analyses.length} analyses
        </p>
        <Button variant="ghost" size="sm" className="text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          Sort by date
        </Button>
      </div>

      {/* Analysis Grid */}
        {filteredAnalyses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredAnalyses.map((analysis, index) => (
            <motion.div key={analysis.id} variants={item}>
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-2 hover:border-primary/20">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Link href={`/results/${analysis.id}`} className="block h-full">
                  <CardHeader className="relative pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getSourceIcon(analysis.source)}</span>
                        <Badge variant="secondary" className="text-xs bg-muted/50">
                          {analysis.source}
                        </Badge>
                      </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-muted/50"
                          >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ArrowRight className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            📄 Download Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            🔗 Share Analysis
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            🗑️ Delete
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                    <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                      {analysis.title}
                    </CardTitle>

                    <CardDescription className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    {analysis.date}
                  </CardDescription>
                </CardHeader>

                  <CardContent className="relative pt-0">
                    <div className="flex justify-between items-center mb-4">
                    <OutcomeBadge outcome={analysis.outcome} />
                    <ConfidenceMeter value={analysis.confidence} size="sm" />
                  </div>

                    {/* Confidence bar visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{analysis.confidence}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.confidence}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-xs text-primary font-medium">View Details</span>
                      <ArrowRight className="h-3 w-3 ml-1 text-primary group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                </CardContent>
              </Link>
            </Card>
            </motion.div>
          ))}
        </motion.div>
        ) : (
        <motion.div
          className="col-span-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="border-dashed border-2">
            <CardContent className="py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
          </div>
              <h3 className="text-lg font-medium mb-2">No analyses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or create a new analysis
              </p>
              <Button asChild>
                <Link href="/upload">Start New Analysis</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}