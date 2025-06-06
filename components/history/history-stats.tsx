"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HistoryStats() {
  const timeStats = [
    {
      title: "This Week",
      value: "12",
      subtitle: "analyses",
      change: "+25%",
      icon: Calendar,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30"
    },
    {
      title: "This Month",
      value: "47",
      subtitle: "analyses",
      change: "+18%",
      icon: BarChart3,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30"
    },
    {
      title: "Average/Week",
      value: "8.2",
      subtitle: "analyses",
      change: "+12%",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
    },
    {
      title: "Best Streak",
      value: "15",
      subtitle: "days",
      change: "Current",
      icon: Zap,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30"
    }
  ];

  const performanceStats = [
    { label: "Positive Outcomes", value: 68, count: 32, color: "bg-gradient-to-r from-emerald-500 to-green-500" },
    { label: "At Risk", value: 21, count: 10, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
    { label: "Negative", value: 11, count: 5, color: "bg-gradient-to-r from-rose-500 to-red-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Time-based Stats */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {timeStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="text-center space-y-3 group"
                >
                  <div className={`mx-auto w-14 h-14 rounded-xl flex items-center justify-center ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{stat.change}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution */}
      <div className="lg:col-span-1">
        <Card className="h-full border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              Outcome Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color.replace('bg-gradient-to-r', 'bg-gradient-to-br')}`} />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">{stat.value}%</div>
                    <div className="text-xs text-muted-foreground">{stat.count}</div>
                  </div>
                </div>
                <div className="w-full bg-pink-100/50 dark:bg-pink-900/20 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className={`h-full ${stat.color} rounded-full shadow-sm`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}