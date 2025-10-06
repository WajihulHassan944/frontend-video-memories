import "./globals.css";
import React from "react";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Videomemories | Restore your videos",
  description:
    "Transform your flat 2D videos into immersive 3D experiences for Meta Quest, Apple Vision Pro, and VR headsets. Upload, convert, and enjoy lifelike 3D content with Xclusive 3D.",
  keywords: [
    "2D to 3D video conversion",
    "3D video converter",
    "VR content creation",
    "Meta Quest 3D videos",
    "Apple Vision Pro 3D",
    "AI video conversion",
    "3D SBS video",
    "MV-HEVC",
  ],
  alternates: {
    canonical: "https://xclusive3d.com",
  },
  openGraph: {
    title: "Xclusive 3D | Convert 2D Videos into Immersive 3D",
    description:
      "Easily convert your 2D videos into VR-ready 3D formats. Perfect for Meta Quest, Apple Vision Pro, and immersive video experiences.",
    url: "https://xclusive3d.com",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/og-home.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xclusive 3D | Convert 2D Videos into Immersive 3D",
    description:
      "Convert your videos into immersive 3D for Meta Quest & Apple Vision Pro. Start your 3D experience today.",
    images: ["https://www.xclusive3d.com/assets/og-home.png"],
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

        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xclusive 3D",
              url: "https://xclusive3d.com",
              logo: "https://xclusive3d.com/logoMain.png",
              sameAs: [
                "https://www.facebook.com/xclusive3d",
                "https://twitter.com/xclusive3d",
                "https://www.linkedin.com/company/xclusive3d",
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
              name: "Xclusive 3D",
              url: "https://xclusive3d.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://xclusive3d.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
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
