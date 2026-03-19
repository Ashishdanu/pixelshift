"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/convert-image";

export default function FileUploadBox({
  onFileSelect,
  accept = ".jpg,.jpeg,.png,.webp",
  maxSizeMB = 10,
  currentFile,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Upload image file"
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 md:p-12 cursor-pointer transition-all duration-300",
        isDragging
          ? "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20 scale-[1.02]"
          : "border-gray-200 bg-gray-50/50 hover:border-violet-400 hover:bg-violet-50/30 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-violet-500 dark:hover:bg-violet-950/10",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
      />

      <div
        className={cn(
          "rounded-2xl p-4 transition-all duration-300",
          isDragging
            ? "bg-violet-100 dark:bg-violet-900/30"
            : "bg-gray-100 group-hover:bg-violet-100 dark:bg-gray-700 dark:group-hover:bg-violet-900/30",
        )}
      >
        <svg
          className={cn(
            "h-8 w-8 transition-colors duration-300",
            isDragging
              ? "text-violet-600 dark:text-violet-400"
              : "text-gray-400 group-hover:text-violet-500",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {currentFile ? (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[250px]">
            {currentFile.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatFileSize(currentFile.size)} • Click or drop to replace
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-violet-600 dark:text-violet-400">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            JPG, PNG, or WebP • Max {maxSizeMB}MB
          </p>
        </div>
      )}
    </div>
  );
}
