import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.SITE_URL || "https://lokma-lezzet.fatmakhv.chatgpt.site";
const socialImage = new URL(`${siteUrl.replace(/\/$/, "")}/og.png`).href;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lokma — Happiness in every bite",
  description:
    "Freshly prepared burgers, pizzas and colourful bowls. Explore the Lokma menu and find your favourites.",
  openGraph: {
    title: "Lokma — Happiness in every bite",
    description: "Good food. Good mood.",
    locale: "en_GB",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    images: [socialImage],
    card: "summary_large_image",
    title: "Lokma — Happiness in every bite",
    description: "Good food. Good mood.",
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
