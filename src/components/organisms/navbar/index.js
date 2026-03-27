"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/theme-context";
import { trackEvent } from "@/utils/g-tag";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="PixelShift home"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105 overflow-hidden">
            <Image
              src="/logo.png"
              alt="PixelShift Logo"
              fill
              className="object-cover p-1.5"
              priority
            />
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            PixelShift
          </span>
        </Link>

        {/* Centre nav links */}
        <div className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            onClick={() => trackEvent("nav_image_converter")}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:text-violet-700 hover:bg-violet-50 dark:text-gray-400 dark:hover:text-violet-300 dark:hover:bg-violet-950/30 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image Converter
          </Link>
          <Link
            href="/bg-remover"
            onClick={() => trackEvent("nav_bg_remover")}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:text-violet-700 hover:bg-violet-50 dark:text-gray-400 dark:hover:text-violet-300 dark:hover:bg-violet-950/30 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            Remove BG
          </Link>
        </div>

        {/* Right side */}

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
