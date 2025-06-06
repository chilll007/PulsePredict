"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    browserNotifications: false,
    phoneNotifications: true,
    analysisComplete: true,
    highRiskOutcomes: true,
    weeklySummary: false,
    frequency: "immediate"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.browserNotifications}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, browserNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Mobile Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications to mobile app</p>
                </div>
              </div>
              <Switch
                checked={settings.phoneNotifications}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, phoneNotifications: checked }))
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Notification Events</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="analysis-complete"
                  checked={settings.analysisComplete}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, analysisComplete: checked as boolean }))
                  }
                />
                <label htmlFor="analysis-complete" className="text-sm font-medium">
                  Analysis Complete
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="high-risk"
                  checked={settings.highRiskOutcomes}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, highRiskOutcomes: checked as boolean }))
                  }
                />
                <label htmlFor="high-risk" className="text-sm font-medium">
                  High Risk Outcomes
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="weekly-summary"
                  checked={settings.weeklySummary}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({ ...prev, weeklySummary: checked as boolean }))
                  }
                />
                <label htmlFor="weekly-summary" className="text-sm font-medium">
                  Weekly Summary
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select value={settings.frequency} onValueChange={(value) =>
              setSettings(prev => ({ ...prev, frequency: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Save Notification Settings</Button>
      </div>
    </motion.div>
  );
}