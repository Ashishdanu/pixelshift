/**
 * Convert an image file to the specified format using Canvas API.
 * Runs entirely in the browser — no server calls.
 *
 * @param {File} file - The source image file
 * @param {string} outputFormat - Target format: "image/jpeg", "image/png", "image/webp"
 * @param {number} quality - Quality 0-1 (only applies to jpeg/webp)
 * @returns {Promise<{ blob: Blob, url: string, time: number }>}
 */
export async function convertImage(file, outputFormat, quality = 0.92) {
  const start = performance.now();

  const bitmap = await createImageBitmap(file);

  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await canvas.convertToBlob({
    type: outputFormat,
    quality: outputFormat === "image/png" ? undefined : quality,
  });

  const url = URL.createObjectURL(blob);
  const time = performance.now() - start;

  return { blob, url, time };
}

/**
 * Validate that a file is an accepted image type and within size limits.
 * @param {File} file
 * @param {number} maxSizeMB
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateFile(file, maxSizeMB = 10) {
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a JPG, PNG, or WebP image.",
    };
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${maxSizeMB}MB.`,
    };
  }
  return { valid: true };
}

/**
 * Format bytes to a human-readable string.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get the file extension for a given MIME type.
 * @param {string} mimeType
 * @returns {string}
 */
export function getExtension(mimeType) {
  const map = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return map[mimeType] || "bin";
}
