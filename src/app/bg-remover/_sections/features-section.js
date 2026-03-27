export default function FeaturesSection() {
  return (
    <section className="animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            ),
            title: "No Upload, Ever",
            desc: "All processing happens on your device using WebAssembly. Your images never leave your browser.",
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            ),
            title: "Full HD Quality",
            desc: "Output is always lossless PNG at 100% original resolution — quality: 1.0 enforced.",
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            title: "100% Free Forever",
            desc: "No subscription, no watermarks, no sign-up. Powered by open-source AI models.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200 group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 group-hover:scale-105 transition-transform mb-4">
              <svg className="h-6 w-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {card.icon}
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
