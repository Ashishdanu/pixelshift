"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full rounded-xl border bg-white text-gray-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-offset-gray-900 appearance-none",
  {
    variants: {
      variant: {
        primary:
          "border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-gray-700",
        secondary:
          "border-gray-300 focus:border-gray-500 focus:ring-gray-500/20 dark:border-gray-600",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export default function Select({
  variant,
  size,
  className,
  children,
  ...props
}) {
  return (
    <div className="relative">
      <select
        className={cn(selectVariants({ variant, size }), "pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export { selectVariants };
