"use client";

import { cn } from "@/lib/utils";

export default function Loader({ size = "md", className }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-violet-500 border-t-transparent",
        sizes[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
