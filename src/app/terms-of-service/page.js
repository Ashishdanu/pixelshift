"use client";

import Heading from "@/components/atoms/typography/heading";

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Heading as="h1" size="lg" className="mb-8">
        Terms of Service
      </Heading>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Acceptance of Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            By using PixelShift, you agree to these terms of service. PixelShift
            is a free, browser-based image conversion tool provided as-is.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Service Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelShift provides a free image conversion service that operates
            entirely within your web browser. The service allows you to convert
            images between JPG, PNG, and WebP formats without any data being
            sent to external servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Privacy-First Processing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            All image processing is performed locally in your browser using the
            Canvas API. We emphasize that:
          </p>
          <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              No images are stored on any server
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              No user data is collected or tracked
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              All processing data is discarded when you close the page
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            User Responsibilities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You are responsible for ensuring you have the right to convert and
            use any images you process through PixelShift. You must not use this
            service for any illegal purposes or to process content that violates
            applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            PixelShift is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages arising from the use of this
            service. While we strive to provide accurate conversions, we cannot
            guarantee the output quality or format compatibility across all
            browsers and devices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            File Limitations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The service accepts image files up to 10MB in JPG, PNG, or WebP
            format. Files exceeding this limit or in unsupported formats will be
            rejected. Performance may vary based on your device&apos;s
            processing capabilities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Changes to Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We reserve the right to update these terms at any time. Continued
            use of the service after changes constitutes acceptance of the new
            terms.
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
