"use client";

import { motion } from "framer-motion";
import { Key, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IntegrationSettings() {
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
            <Key className="h-5 w-5" />
            Integrations
          </CardTitle>
          <CardDescription>
            Connect external services and manage API access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Connected Services</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">Z</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Zoom</p>
                      <p className="text-xs text-muted-foreground">Video conference integration</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Connect
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">T</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Microsoft Teams</p>
                      <p className="text-xs text-muted-foreground">Meeting recordings access</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Connect
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}