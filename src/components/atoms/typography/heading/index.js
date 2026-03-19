"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-bold tracking-tight text-gray-900 dark:text-white",
  {
    variants: {
      size: {
        sm: "text-lg md:text-xl",
        md: "text-2xl md:text-3xl",
        lg: "text-3xl md:text-4xl lg:text-5xl",
        xl: "text-4xl md:text-5xl lg:text-6xl",
      },
      as: {
        h1: "",
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        h6: "",
      },
    },
    defaultVariants: {
      size: "md",
      as: "h2",
    },
  },
);

export default function Heading({
  as: Tag = "h2",
  size,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(headingVariants({ size, as: Tag }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
