"use client";

import { formatFileSize } from "@/lib/convert-image";
import { cn } from "@/lib/utils";

export default function ConversionStats({
  originalSize,
  convertedSize,
  conversionTime,
  className,
}) {
  if (!convertedSize) return null;

  const reduction =
    originalSize > 0
      ? ((1 - convertedSize / originalSize) * 100).toFixed(1)
      : 0;
  const isSmaller = convertedSize < originalSize;

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Time
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
          {conversionTime < 1000
            ? `${Math.round(conversionTime)}ms`
            : `${(conversionTime / 1000).toFixed(2)}s`}
        </p>
      </div>
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Output Size
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          {formatFileSize(convertedSize)}
        </p>
      </div>
      <div
        className={cn(
          "rounded-xl p-3 text-center",
          isSmaller
            ? "bg-emerald-50 dark:bg-emerald-950/30"
            : "bg-amber-50 dark:bg-amber-950/30",
        )}
      >
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          {isSmaller ? "Reduced" : "Increased"}
        </p>
        <p
          className={cn(
            "text-sm font-bold tabular-nums",
            isSmaller
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-amber-600 dark:text-amber-400",
          )}
        >
          {isSmaller ? `−${reduction}%` : `+${Math.abs(reduction)}%`}
        </p>
      </div>
    </div>
  );
}
