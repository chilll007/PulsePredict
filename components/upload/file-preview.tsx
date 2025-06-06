"use client";

import { FileText, FileVideo, FileAudio, FileJson, X, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: {
    name: string;
    size: number;
    type: string;
    status: string;
    previewUrl?: string;
    error?: string;
  };
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get appropriate icon based on file type
  const getFileIcon = () => {
    if (file.type.startsWith("audio/")) {
      return <FileAudio className="h-10 w-10 text-blue-500" />;
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className="h-10 w-10 text-purple-500" />;
    } else if (file.type.includes("json")) {
      return <FileJson className="h-10 w-10 text-amber-500" />;
    } else {
      return <FileText className="h-10 w-10 text-pink-600 dark:text-pink-400" />;
    }
  };

  // Get status icon based on file status
  const getStatusIcon = () => {
    if (file.status === "success") {
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    } else if (file.status === "error") {
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
    return null;
  };

  return (
    <Card className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
      file.status === "error"
        ? "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/30"
        : "bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-950/10 dark:to-rose-950/10 hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-950/20 dark:hover:to-rose-950/20"
    }`}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        file.status === "success"
          ? "bg-gradient-to-br from-pink-500/5 to-rose-500/5"
          : ""
      }`} />

      <CardContent className="relative p-5">
        <div className="flex items-center gap-4">
          {/* File icon with background */}
          <div className={`p-3 rounded-xl transition-all duration-300 ${
            file.status === "success"
              ? "bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 group-hover:from-pink-200 group-hover:to-rose-200 dark:group-hover:from-pink-900/50 dark:group-hover:to-rose-900/50"
              : "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30"
          }`}>
            {getFileIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h4 className="font-semibold truncate text-gray-900 dark:text-white group-hover:text-pink-800 dark:group-hover:text-pink-200 transition-colors duration-300">
                {file.name}
              </h4>
              {getStatusIcon()}
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground font-medium">
                {formatFileSize(file.size)}
              </p>
              {file.error && (
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {file.error}
                </p>
              )}
              {file.status === "success" && (
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 rounded-full font-medium">
                  Ready
                </span>
              )}
            </div>
          </div>

          {/* Audio preview */}
          {file.previewUrl && file.type.startsWith("audio/") && (
            <div className="flex-shrink-0">
              <audio
                controls
                className="max-w-[180px] h-10"
                src={file.previewUrl}
              />
            </div>
          )}

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="flex-shrink-0 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 group/btn"
          >
            <X className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}