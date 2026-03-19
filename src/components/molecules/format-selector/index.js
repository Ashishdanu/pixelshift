"use client";

import Select from "@/components/atoms/select";

const formats = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

export default function FormatSelector({ value, onChange, className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Output Format
      </label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="md"
        aria-label="Select output format"
      >
        {formats.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
