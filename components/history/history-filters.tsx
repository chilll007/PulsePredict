"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export function HistoryFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const outcomes = ["positive", "at-risk", "negative"];
  const sources = ["Zoom Recording", "Teams Recording", "Phone Call", "Chat Transcript"];

  const handleOutcomeToggle = (outcome: string) => {
    setSelectedOutcomes(prev =>
      prev.includes(outcome)
        ? prev.filter(o => o !== outcome)
        : [...prev, outcome]
    );
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedOutcomes([]);
    setSelectedSources([]);
  };

  const activeFiltersCount = selectedOutcomes.length + selectedSources.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Top Row - Search and Main Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-500 dark:text-pink-400" />
                <Input
                  placeholder="Search by title, outcome, or source..."
                  className="pl-10 border-pink-200 dark:border-pink-800 focus:border-pink-400 dark:focus:border-pink-600 focus:ring-pink-400 dark:focus:ring-pink-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Date Range */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-48 border-pink-200 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-700">
                  <Calendar className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="quarter">This quarter</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select defaultValue="newest">
                <SelectTrigger className="w-full lg:w-48 border-pink-200 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-700">
                  <ArrowUpDown className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="confidence-high">High confidence</SelectItem>
                  <SelectItem value="confidence-low">Low confidence</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bottom Row - Filters and View Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Outcome Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300"
                    >
                      <Filter className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
                      Outcomes
                      {selectedOutcomes.length > 0 && (
                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                          {selectedOutcomes.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by Outcome</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {outcomes.map((outcome) => (
                      <DropdownMenuCheckboxItem
                        key={outcome}
                        checked={selectedOutcomes.includes(outcome)}
                        onCheckedChange={() => handleOutcomeToggle(outcome)}
                      >
                        <span className="capitalize">{outcome.replace('-', ' ')}</span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Source Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
                      Sources
                      {selectedSources.length > 0 && (
                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                          {selectedSources.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sources.map((source) => (
                      <DropdownMenuCheckboxItem
                        key={source}
                        checked={selectedSources.includes(source)}
                        onCheckedChange={() => handleSourceToggle(source)}
                      >
                        {source}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="hover:bg-pink-50 hover:text-pink-700 dark:hover:bg-pink-950/30 dark:hover:text-pink-300 transition-all duration-300"
                  >
                    Clear filters ({activeFiltersCount})
                  </Button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-pink-100/50 dark:bg-pink-900/20 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-8 w-8 p-0 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "hover:bg-pink-200/50 dark:hover:bg-pink-800/30"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-8 w-8 p-0 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "hover:bg-pink-200/50 dark:hover:bg-pink-800/30"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedOutcomes.length > 0 || selectedSources.length > 0) && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-pink-200/50 dark:border-pink-800/50">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedOutcomes.map((outcome) => (
                  <Badge key={outcome} variant="secondary" className="capitalize bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                    {outcome.replace('-', ' ')}
                  </Badge>
                ))}
                {selectedSources.map((source) => (
                  <Badge key={source} variant="secondary" className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                    {source}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}