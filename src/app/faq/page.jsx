import FaqClient from "./FaqClient";
const faqs = [
  {
    q: 'What is VideoMemories.eu?',
    a: `VideoMemories.eu is an online service that restores and enhances old or damaged videos using advanced AI technology. Think of noise reduction, color correction, face enhancement, resolution upscaling, and converting SDR to HDR.`,
  },
  {
    q: 'Which enhancements can I apply to my videos?',
    a: `You can choose from several AI-powered options, such as: 
• Video Denoising (removes noise and grain) 
• Face Enhancement (sharpens faces and details) 
• Color Enhancement (corrects and enriches colors) 
• SDR → HDR (adds richer contrast and color depth) 
• Video Upscaling (increases resolution up to 8K)`,
  },
  {
    q: 'Can I select multiple enhancements at the same time?',
    a: `Yes, you can combine different options. For example: remove noise first, then upscale resolution and enhance colors.`,
  },
  {
    q: 'Does VideoMemories.eu work on any video?',
    a: `Almost all common video formats are supported. The better the source quality, the more impressive the final result. Even very old or low-resolution videos can be significantly improved.`,
  },
  {
    q: 'What is the difference between VideoMemories.eu and Xclusive3D.com?',
    a: `VideoMemories.eu focuses on restoring and enhancing 2D videos, while Xclusive3D.com specializes in converting 2D videos into 3D.`,
  },
  {
    q: 'How does cloud conversion work?',
    a: `You upload your video, choose the desired enhancements, and our servers automatically process the improvements. Once finished, you'll receive a download link.`,
  },
  {
    q: 'How long does the enhancement process take?',
    a: `That depends on the video length, resolution, and selected options. Short clips are often ready within minutes, while longer projects may take more time.`,
  },
  {
    q: 'What is the maximum resolution I can upload?',
    a: `You can upload videos up to 4K resolution. After processing, you can even upscale your video to 8K using AI.`,
  },
  {
    q: 'Can I share my enhanced video directly on YouTube or social media?',
    a: `Yes, all output files are compatible with major platforms such as YouTube, Facebook, and Instagram.`,
  },
  {
    q: 'How much does it cost?',
    a: `The price is calculated in credits per selected enhancement. You'll always see the required credits for your project before you start.`,
  },
  {
    q: 'What happens with the credits I have left?',
    a: `Unused credits remain in your account and are valid for 1 year. During that time, you can use them for any future projects.`,
  },
  {
    q: 'How long will my files be stored?',
    a: `Your files remain available for 7 days for download. After that, they are automatically deleted from our servers to protect your privacy and security.`,
  },
];

// ✅ generate schema server-side
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata = {
  title: "FAQs | Xclusive 3D Video Conversion Service",
  description:
    "Find answers to frequently asked questions about Xclusive 3D. Learn how to convert 2D videos into immersive 3D formats for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/faq",
  },
  openGraph: {
    title: "FAQs | Xclusive 3D",
    description:
      "Got questions about 3D video conversion? Explore our FAQs to learn about formats, supported devices, pricing, and more.",
    url: "https://xclusive3d.com/faq",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/faqs.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Xclusive 3D Video Conversion Service",
    description:
      "Find answers to FAQs about Xclusive 3D’s AI-powered 2D to 3D video conversion service for Meta Quest, Apple Vision Pro, and YouTube 3D.",
    images: ["https://www.xclusive3d.com/assets/faqs.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ schema injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient faqs={faqs} />
    </>
  );
}
