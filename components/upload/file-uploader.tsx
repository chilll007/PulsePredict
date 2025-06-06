"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileType, FileText, FileUp, Upload, X, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FilePreview } from "@/components/upload/file-preview";
import { motion } from "framer-motion";

type FileStatus = "idle" | "uploading" | "success" | "error" | "validating";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  status: FileStatus;
  previewUrl?: string;
  error?: string;
}

export function FileUploader() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(file => {
      // Create preview URL for audio/video files
      let previewUrl;
      if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        previewUrl = URL.createObjectURL(file);
      }

      // Validate file type
      const validTypes = [
        "text/plain", "application/json",
        "audio/mpeg", "audio/mp3", "audio/wav",
        "video/mp4", "video/mpeg", "video/webm"
      ];

      const isValidType = validTypes.includes(file.type);

      return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        status: (isValidType ? "success" : "error") as FileStatus,
        previewUrl,
        error: isValidType ? undefined : "Invalid file type"
      };
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Revoke object URL if exists to prevent memory leaks
      if (newFiles[index].previewUrl) {
        URL.revokeObjectURL(newFiles[index].previewUrl!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const startAnalysis = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Navigate to processing page after upload completes
        setTimeout(() => {
          router.push("/processing");
        }, 500);
      }
    }, 100);
  };

  const hasValidFiles = files.some(file => file.status === "success");
  const hasError = files.some(file => file.status === "error");

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className={`relative overflow-hidden border-0 shadow-lg transition-all duration-300 ${
            isDragging
              ? "shadow-2xl scale-105 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30"
              : "hover:shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50"
          }`}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isDragging
              ? "bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-purple-500/10 opacity-100"
              : "opacity-0"
          }`} />

          <div
            className={`relative border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
              isDragging
                ? "border-pink-400 bg-pink-500/5 dark:border-pink-600"
                : "border-gray-300 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <motion.div
                className={`p-6 rounded-full transition-all duration-300 ${
                  isDragging
                    ? "bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg scale-110"
                    : "bg-gradient-to-br from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20"
                }`}
                animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
              >
                <Upload className={`h-12 w-12 transition-colors duration-300 ${
                  isDragging ? "text-white" : "text-pink-600 dark:text-pink-400"
                }`} />
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upload Conversation Data
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Drag and drop your files here, or click to browse. We support audio recordings, video files, transcripts, and chat logs.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {[".txt", ".json", ".mp3", ".mp4", ".wav", ".webm"].map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-md font-medium"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <label className="cursor-pointer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                >
                  <FileUp className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Choose Files
                </Button>
                <input
                  type="file"
                  className="sr-only"
                  accept=".txt,.json,.mp3,.mp4,.wav,.webm"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Selected Files */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Selected Files</h3>
            <span className="text-sm text-muted-foreground">({files.length} file{files.length !== 1 ? 's' : ''})</span>
          </div>

          <div className="grid gap-4">
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FilePreview
                  file={file}
                  onRemove={() => removeFile(index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                    Uploading and processing...
                  </span>
                  <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="relative overflow-hidden bg-pink-100 dark:bg-pink-900/30 rounded-full h-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Error Message */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300 font-medium">
            Please remove invalid files before continuing
          </span>
        </motion.div>
      )}

      {/* Analyze Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 group disabled:from-gray-400 disabled:to-gray-500"
          disabled={!hasValidFiles || hasError || uploadProgress > 0}
          onClick={startAnalysis}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            {uploadProgress > 0 ? "Processing..." : "Analyze Conversation"}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              →
            </div>
          </div>
        </Button>
      </motion.div>
    </div>
  );
}