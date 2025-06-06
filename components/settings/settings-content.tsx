"use client";

import { motion } from "framer-motion";
import { ProfileSettings } from "./sections/profile-settings";
import { AnalysisSettings } from "./sections/analysis-settings";
import { NotificationSettings } from "./sections/notification-settings";

export function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Profile Settings */}
      <ProfileSettings />

      {/* Analysis Settings */}
      <AnalysisSettings />

      {/* Notification Settings */}
      <NotificationSettings />
    </motion.div>
  );
}