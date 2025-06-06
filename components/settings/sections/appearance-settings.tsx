"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AppearanceSettings() {
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
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of PulsePredict
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Appearance settings coming soon...</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}