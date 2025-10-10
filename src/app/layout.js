import "./globals.css";
import React from "react";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Video Memories | AI-Powered Video Enhancement",
  description:
    "Transform your old videos into stunning, crystal-clear memories with AI-powered enhancement. Restore colors, remove noise, upscale to 8K, and relive your precious moments in professional quality.",
  keywords: [
    "AI video enhancement",
    "video upscaling",
    "denoising",
    "color correction",
    "restore old videos",
    "HDR conversion",
    "face enhancement",
    "AI-powered restoration",
    "video enhancer online",
  ],
  alternates: {
    canonical: "https://videomemories.eu",
  },
  openGraph: {
    title: "Video Memories | Restore and Enhance Your Videos with AI",
    description:
      "Bring your old family videos back to life with AI-powered enhancement. Upscale to 8K, remove noise, and restore vivid colors effortlessly.",
    url: "https://videomemories.eu",
    siteName: "Video Memories",
    images: [
      {
        url: "https://frontend-video-memories.vercel.app/assets/og-home.png",
        width: 1200,
        height: 630,
        alt: "Video Memories - AI Video Enhancement",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Memories | AI-Powered Video Enhancement",
    description:
      "Enhance and restore your old videos with AI. Experience vibrant colors, crystal-clear quality, and 8K upscaling.",
    images: ["https://frontend-video-memories.vercel.app/assets/og-home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Video Memories",
              url: "https://videomemories.eu",
              logo: "https://frontend-video-memories.vercel.app/logo.png",
              sameAs: [
                "https://www.facebook.com/videomemories",
                "https://twitter.com/videomemories",
                "https://www.linkedin.com/company/videomemories",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Video Memories",
              url: "https://videomemories.eu",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://videomemories.eu/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "AI Video Enhancement Service",
              brand: "Video Memories",
              description:
                "AI-powered video enhancement for denoising, upscaling, color correction, and HDR conversion.",
              offers: {
                "@type": "Offer",
                url: "https://videomemories.eu/pricing",
                priceCurrency: "PKR",
                price: "7392",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
