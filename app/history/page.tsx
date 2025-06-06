import { Metadata } from "next";
import { HistoryHeader } from "@/components/history/history-header";
import { HistoryFilters } from "@/components/history/history-filters";
import { HistoryTimeline } from "@/components/history/history-timeline";
import { HistoryStats } from "@/components/history/history-stats";

export const metadata: Metadata = {
  title: "Analysis History - PulsePredict",
  description: "View and manage your complete conversation analysis history",
};

export default function HistoryPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <HistoryHeader />

      {/* Statistics Summary */}
      <HistoryStats />

      {/* Filters and Controls */}
      <HistoryFilters />

      {/* Main Timeline/List View */}
      <HistoryTimeline />
    </div>
  );
}