"use client";

import HeroSection from "./_sections/hero-section";
import ConverterSection from "./_sections/converter-section";
import FeaturesSection from "./_sections/features-section";

export default function BgRemoverPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-12">
      <div className="space-y-12 md:space-y-16">
        <ConverterSection />
        <HeroSection />
        <FeaturesSection />
      </div>
    </main>
  );
}
