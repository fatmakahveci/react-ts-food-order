import type { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { siteUrl, siteDescription } from "@/lib/site";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  weight: "400 800",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "400 800",
  display: "swap",
});

const socialImage = {
  url: new URL("og.png", siteUrl).href,
  width: 1200,
  height: 630,
  alt: "Lokma — Happiness in every bite, with a freshly prepared burger",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lokma — Happiness in every bite",
  description: siteDescription,
  alternates: { canonical: siteUrl },
  applicationName: "Lokma",
  openGraph: {
    title: "Lokma — Happiness in every bite",
    description: siteDescription,
    locale: "en_GB",
    url: siteUrl,
    siteName: "Lokma",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    images: [socialImage],
    card: "summary_large_image",
    title: "Lokma — Happiness in every bite",
    description: siteDescription,
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
