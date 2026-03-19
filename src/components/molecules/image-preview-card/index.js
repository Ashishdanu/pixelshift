"use client";

import { formatFileSize } from "@/lib/convert-image";
import { cn } from "@/lib/utils";

export default function ImagePreviewCard({
  label,
  src,
  fileName,
  fileSize,
  className,
}) {
  if (!src) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden",
        className,
      )}
    >
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </p>
      </div>
      <div className="p-4">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${label} preview`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {(fileName || fileSize) && (
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            {fileName && (
              <span className="truncate max-w-[180px]">{fileName}</span>
            )}
            {fileSize != null && (
              <span className="font-medium">{formatFileSize(fileSize)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
