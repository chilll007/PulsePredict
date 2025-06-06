"use client";

import { motion } from "framer-motion";
import { FileUploader } from "@/components/upload/file-uploader";

export default function UploadPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* File Uploader */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <FileUploader />
      </motion.div>
    </div>
  );
}