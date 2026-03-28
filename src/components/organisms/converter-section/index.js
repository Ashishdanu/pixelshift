"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import FileUploadBox from "@/components/molecules/file-upload-box";
import FormatSelector from "@/components/molecules/format-selector";
import QualitySlider from "@/components/molecules/quality-slider";
import ImagePreviewCard from "@/components/molecules/image-preview-card";
import ConversionStats from "@/components/molecules/conversion-stats";
import Button from "@/components/atoms/button";
import Loader from "@/components/atoms/loader";
import { convertImage, validateFile, getExtension } from "@/lib/convert-image";
import { useToast } from "@/context/toast-context";
import { trackEvent } from "@/utils/g-tag";

export default function ConverterSection() {
  const { addToast } = useToast();

  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [outputFormat, setOutputFormat] = useState("image/webp");
  const [quality, setQuality] = useState(0.85);
  const [isConverting, setIsConverting] = useState(false);

  // Conversion result
  const [result, setResult] = useState(null);
  const originalUrlRef = useRef(null);
  const convertedUrlRef = useRef(null);

  const cleanup = useCallback(() => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    if (convertedUrlRef.current) {
      URL.revokeObjectURL(convertedUrlRef.current);
      convertedUrlRef.current = null;
    }
  }, []);

  const handleFileSelect = useCallback(
    (selectedFile) => {
      const { valid, error } = validateFile(selectedFile);
      if (!valid) {
        addToast(error, "error");
        return;
      }

      // Clean up previous URLs
      cleanup();
      setResult(null);

      // Create preview
      const previewUrl = URL.createObjectURL(selectedFile);
      originalUrlRef.current = previewUrl;
      setOriginalPreview(previewUrl);
      setFile(selectedFile);
      addToast("Image loaded successfully!", "success");

      // GA: Track upload
      trackEvent("image_upload", {
        file_type: selectedFile.type,
        file_size_kb: Math.round(selectedFile.size / 1024),
        file_name: selectedFile.name,
      });
    },
    [addToast, cleanup],
  );

  const handleConvert = useCallback(async () => {
    if (!file) {
      addToast("Please upload an image first.", "warning");
      return;
    }

    setIsConverting(true);
    setResult(null);

    // Revoke previous converted URL
    if (convertedUrlRef.current) {
      URL.revokeObjectURL(convertedUrlRef.current);
      convertedUrlRef.current = null;
    }

    try {
      const { blob, url, time } = await convertImage(
        file,
        outputFormat,
        quality,
      );
      convertedUrlRef.current = url;
      setResult({ blob, url, time, size: blob.size });
      addToast("Conversion complete!", "success");

      // GA: Track conversion
      trackEvent("image_convert", {
        input_format: file.type,
        output_format: outputFormat,
        quality: quality,
        original_size_kb: Math.round(file.size / 1024),
        converted_size_kb: Math.round(blob.size / 1024),
        conversion_time_ms: time,
      });
    } catch (err) {
      console.error("Conversion failed:", err);
      addToast("Conversion failed. Please try a different image.", "error");
    } finally {
      setIsConverting(false);
    }
  }, [file, outputFormat, quality, addToast]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const baseName = file?.name?.replace(/\.[^.]+$/, "") || "converted";
    a.download = `${baseName}.${getExtension(outputFormat)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // GA: Track download
    trackEvent("image_download", {
      output_format: outputFormat,
      file_size_kb: Math.round(result.size / 1024),
      file_name: a.download,
    });
  }, [result, file, outputFormat]);

  const handleReset = useCallback(() => {
    cleanup();
    setFile(null);
    setOriginalPreview(null);
    setResult(null);
    setOutputFormat("image/webp");
    setQuality(0.85);

    // GA: Track reset
    trackEvent("image_reset");
  }, [cleanup]);

  useEffect(() => {
    const handlePaste = (e) => {
      // Don't interrupt if we are actively converting out of precaution
      if (isConverting) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          files.push(items[i].getAsFile());
        }
      }

      if (files.length > 0) {
        // The converter's handleFileSelect expects a single file instead of an array
        handleFileSelect(files[0]);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [isConverting, handleFileSelect]);

  const showQuality = outputFormat !== "image/png";

  return (
    <section id="converter" className="scroll-mt-20">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-rbr from-violet-600 to-indigo-600">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Image Converter
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Convert between JPG, PNG, and WebP formats
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload area */}
          <FileUploadBox onFileSelect={handleFileSelect} currentFile={file} />

          {/* Controls */}
          {file && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
              <FormatSelector value={outputFormat} onChange={setOutputFormat} />
              <QualitySlider
                value={quality}
                onChange={setQuality}
                disabled={!showQuality}
              />
            </div>
          )}

          {/* Action Buttons */}
          {file && (
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <Button
                variant="primary"
                size="lg"
                onClick={handleConvert}
                disabled={isConverting}
                className="flex-1"
              >
                {isConverting ? (
                  <>
                    <Loader
                      size="sm"
                      className="border-white border-t-transparent"
                    />
                    Converting...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Convert Image
                  </>
                )}
              </Button>
              {result && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </Button>
              )}
              <Button variant="ghost" size="lg" onClick={handleReset}>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Reset
              </Button>
            </div>
          )}

          {/* Conversion Stats */}
          {result && (
            <div className="animate-fade-in">
              <ConversionStats
                originalSize={file?.size}
                convertedSize={result.size}
                conversionTime={result.time}
              />
            </div>
          )}

          {/* Previews */}
          {(originalPreview || result) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <ImagePreviewCard
                label="Original"
                src={originalPreview}
                fileName={file?.name}
                fileSize={file?.size}
              />
              {result && (
                <ImagePreviewCard
                  label="Converted"
                  src={result.url}
                  fileName={`${file?.name?.replace(/\.[^.]+$/, "")}.${getExtension(outputFormat)}`}
                  fileSize={result.size}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
