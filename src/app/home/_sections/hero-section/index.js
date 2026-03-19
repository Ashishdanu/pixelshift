"use client";

import Heading from "@/components/atoms/typography/heading";
import Description from "@/components/atoms/typography/description";
import Button from "@/components/atoms/button";

import { trackEvent } from "@/utils/g-tag";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="text-center py-16 md:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
          </span>
          100% Free & Private — No uploads, ever
        </div>

        <Heading
          as="h1"
          size="xl"
          className="max-w-4xl mx-auto animate-fade-in"
        >
          Convert images{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            instantly
          </span>{" "}
          in your browser
        </Heading>

        <Description
          size="lg"
          className="mt-6 mx-auto max-w-2xl animate-fade-in"
        >
          Transform images between JPG, PNG, and WebP formats with zero uploads.
          Fast, secure, and completely free — powered by your browser.
        </Description>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              trackEvent("hero_start_converting");
              document
                .getElementById("converter")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Converting
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              trackEvent("hero_learn_more");
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex items-center justify-center gap-8 md:gap-12 animate-fade-in">
          {[
            { value: "3", label: "Formats" },
            { value: "0", label: "Uploads" },
            { value: "100%", label: "Private" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
