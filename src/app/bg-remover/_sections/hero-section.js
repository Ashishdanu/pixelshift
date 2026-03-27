import Heading from "@/components/atoms/typography/heading";
import Description from "@/components/atoms/typography/description";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-center py-14 md:py-20 animate-fade-in">
      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-violet-200/40 dark:bg-violet-900/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600" />
        </span>
        AI-Powered · No Upload · 100% Free
      </div>

      <Heading as="h1" size="xl" className="max-w-4xl mx-auto">
        Remove backgrounds{" "}
        <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          instantly
        </span>
        {" "}in your browser
      </Heading>

      <Description size="lg" className="mt-5 mx-auto max-w-2xl">
        AI-powered background removal that runs entirely on your device. No
        uploads, no accounts, no watermarks — full HD resolution preserved.
      </Description>

      {/* Stats */}
      <div className="mt-10 flex items-center justify-center gap-8 md:gap-14">
        {[
          { value: "0", label: "Uploads" },
          { value: "100%", label: "Private" },
          { value: "Free", label: "Forever" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
