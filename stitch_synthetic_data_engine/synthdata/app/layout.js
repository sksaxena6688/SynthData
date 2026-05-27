import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://synth-data.vercel.app"),

  title: {
    default: "SynthData — Privacy First Synthetic Data Generator",
    template: "%s | SynthData",
  },

  description:
    "Generate realistic synthetic datasets instantly with privacy-first CSV and JSON exports directly in your browser. Built for developers, analysts, QA teams, and ML workflows.",

  openGraph: {
    title: "SynthData — Privacy First Synthetic Data Generator",

    description:
      "Generate realistic synthetic datasets instantly with CSV and JSON export support.",

    url: "https://synth-data.vercel.app",

    siteName: "SynthData",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SynthData Open Graph Image",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "SynthData — Privacy First Synthetic Data Generator",

    description:
      "Generate realistic synthetic datasets instantly with CSV and JSON export support.",

    images: ["/og-image.png"],
  },
};
