import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AnalysisList } from "@/components/dashboard/analysis-list";

export default function DashboardPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Welcome Section */}
      <WelcomeHeader />

      {/* Statistics Overview */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Analytics Overview</h2>
          <p className="text-muted-foreground">Track your conversation analysis performance</p>
        </div>
        <StatsOverview />
      </section>

      {/* Quick Actions */}
      <section>
        <QuickActions />
      </section>

      {/* Recent Analyses */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Recent Analyses</h2>
            <p className="text-muted-foreground">Your latest conversation predictions and insights</p>
          </div>
          <Link href="/live">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              Start New Analysis
            </Button>
          </Link>
        </div>

        <AnalysisList />
      </section>
    </div>
  );
}