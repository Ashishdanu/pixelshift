"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const descriptionVariants = cva("leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    variant: {
      default: "text-gray-600 dark:text-gray-400",
      muted: "text-gray-500 dark:text-gray-500",
      light: "text-gray-400 dark:text-gray-500",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export default function Description({
  size,
  variant,
  className,
  children,
  ...props
}) {
  return (
    <p
      className={cn(descriptionVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
