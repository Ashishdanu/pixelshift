"use client";

import ConverterPageSection from "./_sections/converter-section";
import FeaturesPageSection from "./_sections/features-section";
import FAQPageSection from "./_sections/faq-section";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      <div className="space-y-20 md:space-y-28 pb-16">
        <ConverterPageSection />
        <FeaturesPageSection />
        <FAQPageSection />
      </div>
    </main>
  );
}
