"use client";

import { useState, useRef } from "react";
import Heading from "@/components/atoms/typography/heading";
import Description from "@/components/atoms/typography/description";

const faqs = [
  {
    question: "Is my image data safe?",
    answer:
      "Absolutely. PixelShift processes all images entirely in your browser using the Canvas API. Your files never leave your device — there are no uploads, no servers involved, and no data stored anywhere.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "You can convert between JPG (JPEG), PNG, and WebP formats. These are the most commonly used image formats on the web.",
  },
  {
    question: "What is the maximum file size?",
    answer:
      "The maximum file size is 10MB. This limit ensures smooth performance within your browser. For very large images, consider resizing them first.",
  },
  {
    question: "How does the quality slider work?",
    answer:
      "The quality slider controls the compression level for JPG and WebP formats. Higher quality means larger file sizes but better visual fidelity. PNG format always uses lossless compression, so the quality slider is disabled for PNG output.",
  },
  {
    question: "Does this work offline?",
    answer:
      "Once the page is loaded, the conversion works entirely in your browser without needing an internet connection. However, you need to be online to initially load the page.",
  },
  {
    question: "Is this tool really free?",
    answer:
      "Yes, PixelShift is completely free with no hidden charges, no sign-ups, and no subscriptions. It will remain free forever.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-none bg-white dark:bg-gray-900/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-gray-900 dark:text-white pr-4 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-400 group-hover:text-violet-500 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-6 pt-1">
          <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/30 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 mb-4">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          FAQ
        </div>
        <Heading as="h2" size="lg">
          Frequently asked{" "}
          <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            questions
          </span>
        </Heading>
        <Description size="lg" className="mt-4 mx-auto max-w-2xl">
          Everything you need to know about PixelShift and how it works.
        </Description>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
}
