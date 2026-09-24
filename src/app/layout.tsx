import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lokma-lezzet.fatmakhv.chatgpt.site"),
  title: "Lokma — Happiness in every bite",
  description: "Freshly prepared burgers, pizzas and colourful bowls. Explore the Lokma menu and find your favourites.",
  openGraph: { title: "Lokma — Happiness in every bite", description: "Good food. Good mood.", locale: "en_GB", type: "website", images: ["/og.png"] },
  twitter: { images: ["/og.png"], card: "summary_large_image", title: "Lokma — Happiness in every bite", description: "Good food. Good mood." },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><div id="overlays" />{children}</body></html>;
}
