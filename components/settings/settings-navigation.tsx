"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Brain,
  Bell,
  Palette,
  Key,
  Shield,
  Zap,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface SettingsTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const settingsTabs: SettingsTab[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Personal information and account details"
  },
  {
    id: "analysis",
    label: "Analysis",
    icon: Brain,
    description: "AI model preferences and analysis settings"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Email and browser notification preferences"
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme, language, and display settings"
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Key,
    description: "Connect external services and APIs"
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: Shield,
    description: "Data protection and security settings"
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: Zap,
    description: "Developer settings and advanced features"
  }
];

interface SettingsNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function SettingsNavigation({
  activeTab = "profile",
  onTabChange
}: SettingsNavigationProps) {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="sticky top-8">
        <CardContent className="p-0">
          <nav className="space-y-1 p-2">
            {settingsTabs.map((tab, index) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant={selectedTab === tab.id ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-auto p-3 ${
                    selectedTab === tab.id
                      ? "shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <tab.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      selectedTab === tab.id
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`} />
                    <div className="text-left">
                      <div className={`font-medium text-sm ${
                        selectedTab === tab.id
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}>
                        {tab.label}
                      </div>
                      <div className={`text-xs leading-tight mt-1 ${
                        selectedTab === tab.id
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </nav>
        </CardContent>
      </Card>
    </motion.div>
  );
}