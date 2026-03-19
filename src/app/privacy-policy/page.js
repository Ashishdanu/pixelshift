"use client";

import Heading from "@/components/atoms/typography/heading";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Heading as="h1" size="lg" className="mb-8">
        Privacy Policy
      </Heading>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelShift is committed to protecting your privacy. This privacy
            policy explains how we handle your data — or more accurately, how we{" "}
            <strong>don&apos;t</strong> handle it. Our image converter is
            designed to be 100% privacy-first.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No Image Storage
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            All image processing happens entirely in your browser using the
            HTML5 Canvas API. Your images are <strong>never uploaded</strong> to
            any server. They never leave your device. We have no ability to see,
            store, or access any images you convert.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No Data Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not collect any personal information, use cookies for
            tracking, or employ any analytics tools that monitor your activity.
            The only data stored locally in your browser is your theme
            preference (light/dark mode).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No Third-Party Sharing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Since we don&apos;t collect any data, there is nothing to share with
            third parties. We do not sell, rent, or distribute any user
            information to anyone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Browser-Only Processing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelShift uses the browser&apos;s native Canvas API and
            OffscreenCanvas for all image conversions. This means:
          </p>
          <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              No files are uploaded to any server
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              No API calls are made with your image data
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              All processing occurs in browser memory and is discarded when you
              close the tab
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              Object URLs are properly revoked to free memory
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Changes to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If we make changes to this privacy policy, we will update this page.
            Our commitment to never storing or processing your images on any
            server will remain unchanged.
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-8">
            Last updated: March 2026
          </p>
        </section>
      </div>
    </main>
  );
}
