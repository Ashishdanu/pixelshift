import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PixelShift — Free Browser-Based Image Converter | JPG, PNG, WebP",
  description:
    "Convert images between JPG, PNG, and WebP formats instantly in your browser. 100% free, private, and secure — no uploads required.",
  metadataBase: new URL("https://pixelshift.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PixelShift — Free Browser-Based Image Converter",
    description:
      "Convert images between JPG, PNG, and WebP formats instantly in your browser. 100% free and private.",
    type: "website",
    url: "https://pixelshift.cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelShift — Free Browser-Based Image Converter",
    description:
      "Convert images between JPG, PNG, and WebP formats instantly in your browser.",
  },
};

import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
      {/* Google Analytics */}
      <GoogleAnalytics gaId="G-9W0TBW2NCZ" />
    </html>
  );
}
