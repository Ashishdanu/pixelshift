"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Button from "@/components/atoms/button";
import CheckerboardBackground from "../_components/checkerboard";
import { trackEvent } from "@/utils/g-tag";

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export default function ConverterSection() {
  const [originalSrc, setOriginalSrc] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("image");
  const [originalSize, setOriginalSize] = useState(0);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultSrc, setResultSrc] = useState(null);
  const [resultSize, setResultSize] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | processing | done | error
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const processFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    // Capture the original filename without extension for the download naming
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    setOriginalFileName(nameWithoutExt);
    setOriginalSize(file.size);

    // Preview original
    const reader = new FileReader();
    reader.onload = (e) => setOriginalSrc(e.target.result);
    reader.readAsDataURL(file);

    setResultBlob(null);
    setResultSrc(null);
    setProgress(0);
    setProgressLabel("Analyzing image…");
    setStatus("processing");
    setErrorMsg("");
    trackEvent("bg_remover_upload");

    try {
      // Dynamic import — keeps the WASM out of the initial bundle
      const { removeBackground } = await import("@imgly/background-removal");

      const blob = await removeBackground(file, {
        model: "medium",
        // Removed quality: 1.0 as it forces native-resolution inference which catastrophically hangs the browser
        output: {
          format: "image/png",
          quality: 1.0,
        },
        progress: (key, current, total) => {
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          if (key.includes('compute') || key.includes('inference')) {
            setProgress(50 + Math.round(pct * 0.45)); // Caps at 95%
          } else {
            setProgress(Math.round(pct * 0.5)); // 0-50% for fetch
          }
          setProgressLabel("Processing…");
        },
      });

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultSize(blob.size);
      setResultSrc(url);
      setProgress(100);
      setStatus("done");
      trackEvent("bg_remover_success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try a different image.");
      setStatus("error");
      trackEvent("bg_remover_error", { message: err?.message || "unknown" });
    }
  }, []);

  const handleFiles = useCallback(
    (files) => {
      if (files && files[0]) processFile(files[0]);
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  useEffect(() => {
    const handlePaste = (e) => {
      // Only process paste if we are actively idle
      if (status !== "idle") return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          files.push(items[i].getAsFile());
        }
      }

      if (files.length > 0) {
        handleFiles(files);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [status, handleFiles]);

  const handleReset = () => {
    setOriginalSrc(null);
    setResultBlob(null);
    setResultSrc(null);
    setOriginalSize(0);
    setResultSize(0);
    setStatus("idle");
    setProgress(0);
    setProgressLabel("");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    trackEvent("bg_remover_reset");
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${originalFileName}-pixelshift.png`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("bg_remover_download");
  };

  return (
    <div className="space-y-6">
      {/* ── Upload Zone (idle) ────────────────────────────────────────── */}
      {status === "idle" && (
        <section className="animate-slide-up">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16
              flex flex-col items-center justify-center gap-5 text-center
              transition-all duration-200 group
              ${isDragging
                ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20 scale-[1.01]"
                : "border-gray-300 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-gray-50 dark:hover:bg-gray-900/50"
              }
            `}
          >
            {/* Upload icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 group-hover:scale-105 transition-transform">
              <svg className="h-8 w-8 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {isDragging ? "Drop your image here" : "Drag, drop, or paste your image"}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                or <span className="text-violet-600 dark:text-violet-400 font-medium underline underline-offset-2">click to browse</span> (Ctrl+V supported)
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                JPG, PNG, WebP — any resolution
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </section>
      )}

      {/* ── Processing State ──────────────────────────────────────────── */}
      {status === "processing" && (
        <section className="animate-fade-in">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 md:p-12 flex flex-col items-center gap-6 text-center shadow-sm">
            {/* Spinner */}
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-violet-100 dark:border-violet-900" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin" />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {progressLabel || "Processing…"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                No data leaves your browser
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                <span>{progressLabel || "Working…"}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-violet-600 to-indigo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Original preview (small) */}
            {originalSrc && (
              <div className="mt-2 w-32 h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalSrc} alt="Original" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Error State ───────────────────────────────────────────────── */}
      {status === "error" && (
        <section className="animate-fade-in">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-8 flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
              <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-red-700 dark:text-red-400">{errorMsg}</p>
            <Button variant="outline" size="md" onClick={handleReset}>Try Again</Button>
          </div>
        </section>
      )}

      {/* ── Result: Side-by-Side Comparison ──────────────────────────── */}
      {status === "done" && originalSrc && resultSrc && (
        <section className="animate-slide-up space-y-6">
          {/* Comparison panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Original</span>
                <span className="ml-auto text-xs text-gray-500 font-medium">{formatBytes(originalSize)}</span>
              </div>
              <div className="relative p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalSrc}
                  alt="Original image"
                  className="w-full rounded-xl object-contain max-h-[420px]"
                />
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm shadow-violet-100 dark:shadow-violet-950/30">
              <div className="px-4 py-3 border-b border-violet-100 dark:border-violet-900/50 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-violet-500 to-indigo-500" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-400">Background Removed</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">{formatBytes(resultSize)}</span>
                  <span className="text-xs bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full font-medium">PNG</span>
                </div>
              </div>
              <div className="relative p-3">
                <div className="relative rounded-xl overflow-hidden max-h-[420px] flex items-center justify-center">
                  <CheckerboardBackground />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultSrc}
                    alt="Background removed"
                    className="relative z-10 w-full object-contain max-h-[420px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="primary" size="lg" onClick={handleDownload}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download High-Res PNG
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Another Image
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
