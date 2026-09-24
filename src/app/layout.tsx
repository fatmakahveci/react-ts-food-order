import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lokma-lezzet.fatmakhv.chatgpt.site"),
  title: "Lokma — Her lokmada mutluluk",
  description: "Taze hazırlanan burgerler, pizzalar ve rengârenk kaseler. Lokma menüsünü keşfet, favorilerini seç.",
  openGraph: { title: "Lokma — Her lokmada mutluluk", description: "İyi yemek. İyi hissettirir.", locale: "tr_TR", type: "website", images: ["/og.png"] },
  twitter: { images: ["/og.png"], card: "summary_large_image", title: "Lokma — Her lokmada mutluluk", description: "İyi yemek. İyi hissettirir." },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="tr"><body><div id="overlays" />{children}</body></html>;
}
