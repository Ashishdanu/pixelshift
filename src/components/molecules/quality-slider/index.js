"use client";

import { cn } from "@/lib/utils";

export default function QualitySlider({
  value,
  onChange,
  disabled = false,
  className,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Quality
        </label>
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tabular-nums">
          {Math.round(value * 100)}%
        </span>
      </div>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Image quality"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}
