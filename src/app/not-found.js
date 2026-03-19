"use client";

import Link from "next/link";
import Heading from "@/components/atoms/typography/heading";
import Description from "@/components/atoms/typography/description";
import Button from "@/components/atoms/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 text-sm font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 animate-fade-in">
          Error 404
        </div>

        <Heading as="h1" size="xl" className="tracking-tight lg:text-7xl">
          Page{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Not Found
          </span>
        </Heading>

        <Description size="lg" className="mx-auto max-w-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or never existed to begin with.
        </Description>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-slide-up">
          <Link href="/">
            <Button size="lg" className="rounded-full px-8">
              Back to Home
            </Button>
          </Link>
          <Link href="/#faq">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Check FAQs
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
    </main>
  );
}
