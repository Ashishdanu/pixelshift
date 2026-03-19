"use client";

import HeroSection from "./_sections/hero-section";
import ConverterPageSection from "./_sections/converter-section";
import FeaturesPageSection from "./_sections/features-section";
import HowItWorksSection from "./_sections/how-it-works-section";
import FAQPageSection from "./_sections/faq-section";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-20 md:space-y-28 pb-8">
        <HeroSection />
        <FeaturesPageSection />
        <HowItWorksSection />
        <ConverterPageSection />
        <FAQPageSection />
      </div>
    </main>
  );
}
