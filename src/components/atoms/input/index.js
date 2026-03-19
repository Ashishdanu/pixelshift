"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-offset-gray-900",
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

export default function Input({ variant, size, className, ...props }) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { inputVariants };
