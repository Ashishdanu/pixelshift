import BgRemoverPage from "./index";

export const metadata = {
  title: "Free Background Remover — HD Quality, No Upload | PixelShift",
  description:
    "Remove image backgrounds instantly in your browser. 100% free, AI-powered, no signup required, no uploads ever. Supports PNG, JPG, WebP. Full HD resolution preserved with zero quality loss.",
  metadataBase: new URL("https://pixelshift.cloud"),
  keywords: [
    "background remover",
    "remove background from image",
    "free background remover",
    "background eraser",
    "transparent background maker",
    "remove bg free",
    "AI background removal",
    "no upload background remover",
    "browser background remover",
    "HD background remover",
    "PNG transparent background",
    "image background eraser online free",
    "remove background without upload",
    "background removal tool",
    "cut out image background",
    "photo background remover",
    "erase background online",
    "background remover no watermark",
    "free PNG maker",
    "PixelShift background remover",
  ],
  alternates: {
    canonical: "/bg-remover",
  },
  openGraph: {
    title: "Free Background Remover — HD Quality, No Upload | PixelShift",
    description:
      "Remove image backgrounds instantly in your browser. AI-powered, 100% free, full resolution preserved. No uploads, no signup, no watermarks.",
    type: "website",
    url: "https://pixelshift.cloud/bg-remover",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Background Remover — HD Quality | PixelShift",
    description:
      "Remove backgrounds from images in your browser. Free, private, AI-powered. No uploads ever.",
  },
};

export default function Page() {
  return <BgRemoverPage />;
}
