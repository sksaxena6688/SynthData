import "./globals.css";

export const metadata = {
  title: "SynthData — Privacy First Synthetic Data Generator",

  description:
    "description:
  "Generate realistic synthetic datasets instantly with privacy-first CSV and JSON exports directly in your browser. Built for developers, QA teams, analytics workflows, and machine learning pipelines.",

  openGraph: {
    title: "SynthData — Privacy First Synthetic Data Generator",

    description:
      "Generate realistic synthetic datasets instantly with CSV and JSON export support.",

    url: "https://synth-data.vercel.app",

    siteName: "SynthData",

    images: [
      {
        url: "https://synth-data.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SynthData",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "SynthData",

    description:
      "Privacy-first synthetic dataset generation platform.",

    images: ["https://synth-data.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
