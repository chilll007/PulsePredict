"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Upload,
  BarChart3,
  History,
  Download,
  Share2,
  Settings,
  BookOpen,
  ArrowRight,
  Video
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const primaryActions = [
    {
      title: "New Analysis",
      description: "Upload and analyze a new conversation",
      icon: Upload,
      href: "/upload",
      color: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 via-rose-50 to-pink-100 dark:from-pink-950/20 dark:via-rose-950/30 dark:to-pink-950/20"
    },
    {
      title: "Video Analysis",
      description: "Real-time video call analysis",
      icon: Video,
      href: "/video-analysis",
      color: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-950/20 dark:via-indigo-950/30 dark:to-blue-950/20"
    },
    {
      title: "View Results",
      description: "Browse your analysis insights",
      icon: History,
      href: "/results",
      color: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950/20 dark:via-pink-950/30 dark:to-rose-950/20"
    }
  ];

  const secondaryActions = [
    {
      title: "Analysis History",
      icon: History,
      href: "/history"
    },
    {
      title: "Download Report",
      icon: Download,
      href: "/export"
    },
    {
      title: "Share Results",
      icon: Share2,
      href: "/share"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings"
    },
    {
      title: "Documentation",
      icon: BookOpen,
      href: "/docs"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Actions */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Quick Actions</h2>
          <p className="text-muted-foreground">Get started with your conversation analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${action.bgGradient}`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-300">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {action.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="flex items-center text-sm font-medium text-pink-600 dark:text-pink-400">
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Secondary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
          <CardHeader>
            <CardTitle className="text-lg">Additional Tools</CardTitle>
            <CardDescription>
              More options to manage your conversation analysis workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {secondaryActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  <Link href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-pink-50 hover:border-pink-300 dark:hover:bg-pink-950/30 dark:hover:border-pink-700 transition-all duration-300 group"
                    >
                      <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300" />
                      <span className="text-xs font-medium group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-300">
                        {action.title}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}