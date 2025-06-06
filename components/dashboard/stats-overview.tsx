"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Users,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsOverview() {
  const stats = [
    {
      title: "Total Analyses",
      value: "2,847",
      change: "+12.5%",
      icon: BarChart3,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: Target,
      color: "from-pink-600 to-purple-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20",
      iconBg: "bg-gradient-to-br from-pink-600 to-purple-600"
    },
    {
      title: "Avg Confidence",
      value: "87.4%",
      change: "+5.2%",
      icon: TrendingUp,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500"
    },
    {
      title: "Processing Time",
      value: "2.4m",
      change: "-8.1%",
      icon: Clock,
      color: "from-pink-500 to-rose-400",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-400"
    }
  ];

  const outcomeDistribution = [
    { label: "Positive", value: 68, count: 195, color: "bg-gradient-to-r from-emerald-500 to-green-500" },
    { label: "At Risk", value: 21, count: 60, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
    { label: "Negative", value: 11, count: 32, color: "bg-gradient-to-r from-rose-500 to-red-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {/* Performance Stats */}
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${stat.bgColor}`}>
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.iconBg} shadow-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-emerald-600 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full shadow-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Outcome Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:col-span-4 xl:col-span-1"
      >
        <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/10 dark:to-rose-950/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
              Outcome Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {outcomeDistribution.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <div className="text-right">
                    <div className="font-bold">{item.value}%</div>
                    <div className="text-xs text-muted-foreground">{item.count}</div>
                  </div>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} rounded-full shadow-sm`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.2, delay: 1 + index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}